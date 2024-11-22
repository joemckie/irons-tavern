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
import { pickBy } from 'lodash';
import {
  CombatAchievementTier,
  DiaryLocation,
  DiaryTier,
} from '@/app/schemas/osrs';
import { calculateScaling } from '../../utils/calculate-scaling';
import { formatPercentage } from '../../utils/format-percentage';
import { getRankName } from '../../utils/get-rank-name';
import { getRankImageUrl } from '../../utils/get-rank-image-url';
import { fetchPlayerDetails } from '../../data-sources/fetch-player-details/fetch-player-details';
import { RankCalculatorSchema } from '../submit-rank-calculator-validation';

export const publishRankSubmissionAction = authActionClient
  .metadata({
    actionName: 'publish-rank-submission',
  })
  .bindArgsSchemas<
    [currentRank: Zod.ZodOptional<typeof Rank>, playerName: typeof PlayerName]
  >([Rank.optional(), PlayerName])
  .schema(
    z.object({
      rank: Rank,
      totalPoints: z.number().nonnegative(),
    }),
  )
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

      const playerDetails = await fetchPlayerDetails(playerName, false);

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
          ehb,
          ehp,
          totalLevel,
          rankStructure,
          joinDate,
          hasCollectionLogData,
          hasTempleData,
          hasWikiSyncData,
        },
      } = playerDetails;

      const { channelId } = serverConstants.discord;
      const submissionId = randomUUID();
      const { id: discordMessageId } = await sendDiscordMessage(
        {
          embeds: [
            {
              title: `${playerName} rank application`,
              thumbnail: {
                url: getRankImageUrl(rank, true),
              },
              fields: [
                {
                  name: 'Rank',
                  value: getRankName(rank),
                  inline: true,
                },
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
                {
                  name: 'User',
                  value: `<@${userId}>`,
                  inline: true,
                },
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

      await discordBotClient.put(
        Routes.threadMembers(discordMessageId, userId),
      );

      const submissionDiff = {
        achievementDiaries:
          hasWikiSyncData && savedData.achievementDiaries && achievementDiaries
            ? (
                Object.entries(achievementDiaries) as [
                  DiaryLocation,
                  DiaryTier,
                ][]
              ).reduce((acc, [diaryLocation, diaryTier]) => {
                if (
                  // eslint-disable-next-line no-underscore-dangle
                  DiaryTier._def.values.indexOf(
                    achievementDiaries[diaryLocation] ?? 'None',
                  ) <
                  // eslint-disable-next-line no-underscore-dangle
                  DiaryTier._def.values.indexOf(
                    savedData.achievementDiaries[diaryLocation] ?? 'None',
                  )
                ) {
                  return {
                    ...acc,
                    [diaryLocation]: diaryTier,
                  };
                }

                return acc;
              }, {} as AchievementDiaryMap)
            : null,
        acquiredItems:
          hasWikiSyncData || hasCollectionLogData
            ? Object.values(
                pickBy(
                  Object.keys(savedData.acquiredItems),
                  (key) => !acquiredItems[key],
                ),
              )
            : null,
        combatAchievementTier:
          hasWikiSyncData &&
          // eslint-disable-next-line no-underscore-dangle
          CombatAchievementTier._def.values.indexOf(combatAchievementTier) <
            // eslint-disable-next-line no-underscore-dangle
            CombatAchievementTier._def.values.indexOf(
              savedData.combatAchievementTier,
            )
            ? combatAchievementTier
            : null,
        collectionLogCount:
          hasCollectionLogData &&
          collectionLogCount < savedData.collectionLogCount
            ? collectionLogCount
            : null,
        ehb: hasTempleData && ehb < savedData.ehb ? ehb : null,
        ehp: hasTempleData && ehp < savedData.ehp ? ehp : null,
        totalLevel:
          hasTempleData && totalLevel < savedData.totalLevel
            ? totalLevel
            : null,
      } satisfies RankSubmissionDiff;

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
        hasCollectionLogData,
        hasTempleData,
        hasWikiSyncData,
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

        return {
          success: false,
        };
      }

      return {
        success: true,
      };
    },
  );
