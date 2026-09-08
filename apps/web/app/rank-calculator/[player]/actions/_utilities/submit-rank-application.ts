'use server';

import * as Sentry from '@sentry/node';
import { calculateScaling } from '@/app/rank-calculator/utils/calculators/calculate-scaling';
import { formatNumber } from '@/app/rank-calculator/utils/format-number';
import { formatPercentage } from '@/app/rank-calculator/utils/format-percentage';
import { getRankImageUrl } from '@/app/rank-calculator/utils/get-rank-image-url';
import { getRankName } from '@/app/rank-calculator/utils/get-rank-name';
import { sendDiscordMessage } from '@/app/rank-calculator/utils/send-discord-message';
import { approveSubmission } from '@/app/rank-calculator/view/[submissionId]/utils/approve-submission';
import {
  CombatAchievementTier,
  DiaryLocation,
  DiaryTier,
} from '@/app/schemas/osrs';
import type {
  AchievementDiaryMap,
  RankSubmissionDiff,
  RankSubmissionMetadata,
} from '@/app/schemas/rank-calculator';
import type { PlayerDetailsResponse } from '@/app/schemas/player-details';
import { serverConstants } from '@/config/constants.server';
import {
  rankSubmissionDiffKey,
  rankSubmissionKey,
  rankSubmissionMetadataKey,
  userDraftRankSubmissionKey,
  userRankSubmissionsKey,
} from '@/config/redis';
import { discordBotClient } from '@/discord';
import { format } from 'date-fns';
import { ChannelType } from 'discord-api-types/payloads';
import { Routes } from 'discord-api-types/rest';
import { randomUUID } from 'node:crypto';
import type { RankCalculatorSchema } from '../../submit-rank-calculator-validation';
import { clientConstants } from '@/config/constants.client';
import type { Rank } from '@/config/enums';
import { redis } from '@/redis';
import isEmpty from 'lodash/isEmpty';
import pickBy from 'lodash/pickBy';
import { itemList } from '@/data/item-list';
import {
  isCollectionLogItem,
  isCombatAchievementItem,
  isQuestItem,
  type Item,
} from '@/app/schemas/items';
import { normaliseEntityName } from '@/app/rank-calculator/utils/normalise-entity-name';
import { z } from 'zod';

export async function submitRankApplication(
  userId: string,
  savedData: RankCalculatorSchema,
  playerDetails: PlayerDetailsResponse,
  playerName: string,
  rank: Rank,
  totalPoints: number,
) {
  const {
    acquiredItems,
    achievementDiaries,
    combatAchievementTier,
    collectionLogCount,
    totalLevel,
    joinDate,
    hasTemplePlayerStats,
    hasTempleCollectionLog,
    hasWikiSyncData,
    isTempleCollectionLogOutdated,
    tzhaarCape,
    hasBloodTorva,
    hasDizanasQuiver,
    hasAchievementDiaryCape,
    hasMaxCape,
  } = playerDetails;

  const { channelId } = serverConstants.discord;
  const submissionId = randomUUID();
  const { id: discordMessageId } = await sendDiscordMessage(
    {
      embeds: [
        {
          title: `${playerName} rank application`,
          thumbnail: { url: getRankImageUrl(rank, true) },
          fields: [
            { name: 'Rank', value: getRankName(rank), inline: true },
            {
              name: 'Rank structure',
              value: savedData.rankStructure,
              inline: true,
            },
            {
              name: 'Total points',
              value: formatNumber(totalPoints),
              inline: true,
            },
            {
              name: 'Join date',
              value: format(joinDate, 'dd MMM yyyy'),
              inline: true,
            },
            {
              name: 'Scaling',
              value: formatPercentage(calculateScaling(joinDate)),
              inline: true,
            },
            { name: 'User', value: `<@${userId}>`, inline: true },
            {
              name: 'View link',
              value: `[Click to view submission](${clientConstants.publicUrl}/rank-calculator/view/${submissionId})`,
            },
          ],
        },
      ],
    },
    channelId,
  );

  await discordBotClient.post(Routes.threads(channelId, discordMessageId), {
    body: {
      name: `${playerName} - ${getRankName(rank)}`,
      type: ChannelType.PublicThread,
    },
  });

  try {
    await discordBotClient.put(Routes.threadMembers(discordMessageId, userId));
  } catch (error) {
    try {
      // If the user can't be added to the thread, send a comment that mentions them instead
      await sendDiscordMessage({ content: `<@${userId}>` }, discordMessageId);
    } catch {
      // Adding the user to the thread is not critical to the process,
      // so if both attempts fail, just capture the exception and continue.
      Sentry.captureException(error);
    }
  }

  const itemMap = Object.values(itemList)
    .flatMap(({ items }) => items)
    .reduce<Record<string, Item>>(
      (acc, item) => ({
        ...acc,
        [normaliseEntityName(item.name)]: item,
      }),
      {},
    );

  const submissionDiff = {
    achievementDiaries:
      hasWikiSyncData && savedData.achievementDiaries && achievementDiaries
        ? (
            Object.entries(achievementDiaries) as [DiaryLocation, DiaryTier][]
          ).reduce<AchievementDiaryMap>((acc, [diaryLocation, diaryTier]) => {
            if (
              DiaryTier.options.indexOf(
                achievementDiaries[diaryLocation] ?? 'None',
              ) <
              DiaryTier.options.indexOf(
                savedData.achievementDiaries[diaryLocation] ?? 'None',
              )
            ) {
              return { ...acc, [diaryLocation]: diaryTier };
            }

            return acc;
          }, {} as AchievementDiaryMap)
        : null,
    acquiredItems: [
      ...new Set<string>([
        ...(hasWikiSyncData
          ? z.array(z.string()).parse(
              Object.values(
                pickBy(Object.keys(savedData.acquiredItems), (key) => {
                  if (
                    isQuestItem(itemMap[key]) ||
                    isCombatAchievementItem(itemMap[key])
                  ) {
                    return !acquiredItems[key];
                  }

                  return false;
                }),
              ),
            )
          : []),
        ...(hasTempleCollectionLog
          ? z.array(z.string()).parse(
              Object.values(
                pickBy(Object.keys(savedData.acquiredItems), (key) => {
                  if (isCollectionLogItem(itemMap[key])) {
                    return !acquiredItems[key];
                  }

                  return false;
                }),
              ),
            )
          : []),
      ]),
    ],
    combatAchievementTier:
      hasWikiSyncData &&
      CombatAchievementTier.options.indexOf(combatAchievementTier) <
        CombatAchievementTier.options.indexOf(savedData.combatAchievementTier)
        ? combatAchievementTier
        : null,
    collectionLogCount:
      hasTemplePlayerStats && collectionLogCount < savedData.collectionLogCount
        ? collectionLogCount
        : null,
    totalLevel:
      hasTemplePlayerStats && totalLevel < savedData.totalLevel
        ? totalLevel
        : null,
    tzhaarCape:
      hasTempleCollectionLog && tzhaarCape !== savedData.tzhaarCape
        ? tzhaarCape
        : null,
    hasBloodTorva:
      hasWikiSyncData && hasBloodTorva !== savedData.hasBloodTorva
        ? !!hasBloodTorva
        : null,
    hasDizanasQuiver:
      hasTempleCollectionLog && hasDizanasQuiver !== savedData.hasDizanasQuiver
        ? !!hasDizanasQuiver
        : null,
    hasAchievementDiaryCape:
      hasWikiSyncData &&
      hasAchievementDiaryCape !== savedData.hasAchievementDiaryCape
        ? !!hasAchievementDiaryCape
        : null,
    hasMaxCape:
      hasTemplePlayerStats && hasMaxCape !== savedData.hasMaxCape
        ? !!hasMaxCape
        : null,
  } satisfies RankSubmissionDiff;

  const isAutoApprovalAvailable =
    savedData.rankStructure === 'Standard' &&
    hasTempleCollectionLog &&
    hasWikiSyncData &&
    hasTemplePlayerStats &&
    isEmpty(pickBy(submissionDiff, (val) => !isEmpty(val)));

  const submissionTransaction = redis.multi();

  submissionTransaction.copy(
    userDraftRankSubmissionKey(userId, playerName),
    rankSubmissionKey(submissionId),
  );

  submissionTransaction.lpush(
    userRankSubmissionsKey(userId, playerName),
    rankSubmissionKey(submissionId),
  );

  submissionTransaction.hset(rankSubmissionMetadataKey(submissionId), {
    discordMessageId,
    status: 'Pending',
    submittedBy: userId,
    submittedAt: new Date(),
    actionedBy: null,
    hasTemplePlayerStats,
    hasTempleCollectionLog,
    hasWikiSyncData,
    isTempleCollectionLogOutdated,
  } satisfies RankSubmissionMetadata);

  submissionTransaction.hset(
    rankSubmissionDiffKey(submissionId),
    submissionDiff,
  );

  const submissionResult = await submissionTransaction.exec();

  if (!submissionResult) {
    await discordBotClient.delete(
      Routes.channelMessage(channelId, discordMessageId),
    );

    return { success: false };
  }

  if (isAutoApprovalAvailable) {
    try {
      await approveSubmission({
        rank,
        submissionId,
        isAutomatic: true,
      });
    } catch (error) {
      // If auto-approval fails, it can still be manually approved later,
      // so we just log the error and continue.
      Sentry.captureException(error);
    }
  }
}
