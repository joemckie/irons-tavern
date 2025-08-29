'use server';

import { z } from 'zod';
import { formatNumber } from '@/app/rank-calculator/utils/format-number';
import {
  rankSubmissionDiffKey,
  rankSubmissionKey,
  rankSubmissionMetadataKey,
  userDraftRankSubmissionKey,
  userRankSubmissionsKey,
} from '@/config/redis';
import { randomUUID } from 'crypto';
import { sendDiscordMessage } from '@/app/rank-calculator/utils/send-discord-message';
import { clientConstants } from '@/config/constants.client';
import { serverConstants } from '@/config/constants.server';
import { format } from 'date-fns';
import { redis } from '@/redis';
import { authActionClient } from '@/app/safe-action';
import {
  AchievementDiaryMap,
  RankSubmissionDiff,
  RankSubmissionMetadata,
} from '@/app/schemas/rank-calculator';
import { discordBotClient } from '@/discord';
import { ChannelType, Routes } from 'discord-api-types/v10';
import { Rank } from '@/config/enums';
import { PlayerName } from '@/app/schemas/player';
import { ActionError } from '@/app/action-error';
import { isEmpty, pickBy } from 'lodash';
import {
  CombatAchievementTier,
  DiaryLocation,
  DiaryTier,
} from '@/app/schemas/osrs';
import { itemList } from '@/data/item-list';
import {
  isCollectionLogItem,
  isCombatAchievementItem,
  isQuestItem,
  Item,
} from '@/app/schemas/items';
import * as Sentry from '@sentry/nextjs';
import { calculateScaling } from '../../utils/calculators/calculate-scaling';
import { formatPercentage } from '../../utils/format-percentage';
import { getRankName } from '../../utils/get-rank-name';
import { getRankImageUrl } from '../../utils/get-rank-image-url';
import { fetchPlayerDetails } from '../../data-sources/fetch-player-details/fetch-player-details';
import { RankCalculatorSchema } from '../submit-rank-calculator-validation';
import { stripEntityName } from '../../utils/strip-entity-name';
import { approveSubmission } from '../../view/[submissionId]/utils/approve-submission';

export const publishRankSubmissionAction = authActionClient
  .metadata({ actionName: 'publish-rank-submission' })
  .bindArgsSchemas<
    [currentRank: Zod.ZodOptional<typeof Rank>, playerName: typeof PlayerName]
  >([Rank.optional(), PlayerName])
  .schema(z.object({ rank: Rank, totalPoints: z.number().nonnegative() }))
  .action(
    async ({
      ctx: { userId },
      bindArgsParsedInputs: [currentRank, playerName],
      parsedInput: { totalPoints, rank },
    }) => {
      if (rank === currentRank) {
        throw new ActionError('You already have this rank!');
      }

      const savedData = await redis.json.get<RankCalculatorSchema>(
        userDraftRankSubmissionKey(userId, playerName),
      );

      if (!savedData) {
        throw new ActionError('No saved data!');
      }

      const playerDetails = await fetchPlayerDetails(playerName, userId, false);

      if (!playerDetails.success) {
        throw new Error(
          'Failed to retrieve player details. Please try again later.',
        );
      }

      const {
        data: {
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
        },
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
                { name: 'Rank structure', value: savedData.rankStructure, inline: true },
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
        await discordBotClient.put(
          Routes.threadMembers(discordMessageId, userId),
        );
      } catch (error) {
        try {
          // If the user can't be added to the thread, send a comment that mentions them instead
          await sendDiscordMessage(
            { content: `<@${userId}>` },
            discordMessageId,
          );
        } catch {
          // Adding the user to the thread is not critical to the process,
          // so if both attempts fail, just capture the exception and continue.
          Sentry.captureException(error);
        }
      }

      const itemMap = Object.values(itemList)
        .flatMap(({ items }) => items)
        .reduce<Record<string, Item>>(
          (acc, item) => ({ ...acc, [stripEntityName(item.name)]: item }),
          {},
        );

      const submissionDiff = {
        achievementDiaries:
          hasWikiSyncData && savedData.achievementDiaries && achievementDiaries
            ? (
                Object.entries(achievementDiaries) as [
                  DiaryLocation,
                  DiaryTier,
                ][]
              ).reduce<AchievementDiaryMap>(
                (acc, [diaryLocation, diaryTier]) => {
                  if (
                    DiaryTier._def.values.indexOf(
                      achievementDiaries[diaryLocation] ?? 'None',
                    ) <
                    DiaryTier._def.values.indexOf(
                      savedData.achievementDiaries[diaryLocation] ?? 'None',
                    )
                  ) {
                    return { ...acc, [diaryLocation]: diaryTier };
                  }

                  return acc;
                },
                {},
              )
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
          CombatAchievementTier._def.values.indexOf(combatAchievementTier) <
            CombatAchievementTier._def.values.indexOf(
              savedData.combatAchievementTier,
            )
            ? combatAchievementTier
            : null,
        collectionLogCount:
          hasTemplePlayerStats &&
          collectionLogCount < savedData.collectionLogCount
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
          hasTempleCollectionLog &&
          hasDizanasQuiver !== savedData.hasDizanasQuiver
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

      return { success: true };
    },
  );
