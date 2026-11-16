import * as Sentry from '@sentry/nextjs';
import { serverConstants } from '@/config/constants.server';
import { randomUUID } from 'node:crypto';
import { sendDiscordMessage } from '../rank-calculator/utils/send-discord-message';
import { getRankImageUrl } from '../rank-calculator/utils/get-rank-image-url';
import { clientConstants } from '@/config/constants.client';
import { formatPercentage } from '../rank-calculator/utils/format-percentage';
import { calculateScaling } from '../rank-calculator/utils/calculators/calculate-scaling';
import { formatNumber } from '../rank-calculator/utils/format-number';
import { getRankName } from '../rank-calculator/utils/get-rank-name';
import { ChannelType, Routes } from 'discord-api-types/v10';
import { discordBotClient } from '@/discord';
import { normaliseEntityName } from '../rank-calculator/utils/normalise-entity-name';
import { approveSubmission } from '../rank-calculator/view/[submissionId]/utils/approve-submission';
import type {
  AchievementDiaryMap,
  RankSubmissionDiff,
  RankSubmissionMetadata,
} from '../schemas/rank-calculator';
import {
  CombatAchievementTier,
  DiaryTier,
  type DiaryLocation,
} from '../schemas/osrs';
import isEmpty from 'lodash/isEmpty';
import pickBy from 'lodash/pickBy';
import {
  isCollectionLogItem,
  isCombatAchievementItem,
  isQuestItem,
  type Item,
} from '../schemas/items';
import { format } from 'date-fns';
import { z } from 'zod';
import type { EntityManager } from '@mikro-orm/core';
import { itemList } from '@/data/item-list';
import type { Rank } from '@/config/enums';
import {
  RankSubmission,
  type RankSubmissionData,
} from '@/database/entities/rank-submission.entity';
import type { PlayerDetailsResponse } from '../rank-calculator/data-sources/fetch-player-details/fetch-player-details';
import type { OSRSAccount } from '@/database/entities/osrs-account';
import { isRankUp } from '../rank-calculator/utils/is-rank-up';

export async function submitRankApplication(
  em: EntityManager,
  osrsAccount: OSRSAccount,
  {
    userId,
    rank,
    totalPoints,
    savedData,
  }: {
    userId: string;
    rank: Rank;
    totalPoints: number;
    savedData?: RankSubmissionData;
  },
  rankSubmission: PlayerDetailsResponse,
  applicationType: 'automatic' | 'manual',
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
    currentRank,
    rankStructure,
  } = rankSubmission;

  if (!isRankUp(currentRank, rank)) {
    return;
  }

  const { channelId } = serverConstants.discord;
  const submissionId = randomUUID();
  const { id: discordMessageId } = await sendDiscordMessage(
    {
      embeds: [
        {
          title: `${osrsAccount.name} rank application`,
          thumbnail: { url: getRankImageUrl(rank, true) },
          fields: [
            {
              name: 'Application type',
              value: applicationType === 'automatic' ? '⚙️ Automatic' : 'Manual',
              inline: false,
            },
            { name: 'Rank', value: getRankName(rank), inline: true },
            {
              name: 'Rank structure',
              value: rankStructure,
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
      name: `${osrsAccount.name} - ${getRankName(rank)}`,
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
      hasWikiSyncData && savedData?.achievementDiaries && achievementDiaries
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
        ...(hasWikiSyncData && savedData?.acquiredItems
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
        ...(hasTempleCollectionLog && savedData?.acquiredItems
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
      savedData?.combatAchievementTier &&
      CombatAchievementTier.options.indexOf(combatAchievementTier) <
        CombatAchievementTier.options.indexOf(savedData.combatAchievementTier)
        ? combatAchievementTier
        : null,
    collectionLogCount:
      hasTemplePlayerStats &&
      savedData?.collectionLogCount &&
      collectionLogCount < savedData.collectionLogCount
        ? collectionLogCount
        : null,
    totalLevel:
      hasTemplePlayerStats &&
      savedData?.totalLevel &&
      totalLevel < savedData.totalLevel
        ? totalLevel
        : null,
    tzhaarCape:
      hasTempleCollectionLog &&
      savedData?.tzhaarCape !== undefined &&
      tzhaarCape !== savedData.tzhaarCape
        ? tzhaarCape
        : null,
    hasBloodTorva:
      hasWikiSyncData &&
      savedData?.hasBloodTorva !== undefined &&
      hasBloodTorva !== savedData.hasBloodTorva
        ? !!hasBloodTorva
        : null,
    hasDizanasQuiver:
      hasTempleCollectionLog &&
      savedData?.hasDizanasQuiver !== undefined &&
      hasDizanasQuiver !== savedData.hasDizanasQuiver
        ? !!hasDizanasQuiver
        : null,
    hasAchievementDiaryCape:
      hasWikiSyncData &&
      savedData?.hasAchievementDiaryCape !== undefined &&
      hasAchievementDiaryCape !== savedData.hasAchievementDiaryCape
        ? !!hasAchievementDiaryCape
        : null,
    hasMaxCape:
      hasTemplePlayerStats &&
      savedData?.hasMaxCape !== undefined &&
      hasMaxCape !== savedData.hasMaxCape
        ? !!hasMaxCape
        : null,
  } satisfies RankSubmissionDiff;

  const isAutoApprovalAvailable =
    rankStructure === 'Standard' &&
    hasTempleCollectionLog &&
    hasWikiSyncData &&
    hasTemplePlayerStats &&
    isEmpty(pickBy(submissionDiff, (val) => !isEmpty(val)));

  em.create(RankSubmission, {
    id: submissionId,
    osrsAccount,
    data: rankSubmission,
    metadata: {
      discordMessageId,
      status: 'Pending',
      submittedBy: userId,
      submittedAt: new Date(),
      actionedBy: null,
      hasTemplePlayerStats,
      hasTempleCollectionLog,
      hasWikiSyncData,
      isTempleCollectionLogOutdated,
      automaticApproval: null,
    } satisfies RankSubmissionMetadata,
    diff: submissionDiff,
  });

  try {
    await em.flush();
  } catch (error) {
    Sentry.captureException(error);

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
