'use server';

import { z } from 'zod';
import { formatNumber } from '@/app/rank-calculator/utils/format-number';
import {
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
import { authActionClient, ActionError } from '@/app/safe-action';
import {
  RankStructure,
  RankSubmissionMetadata,
} from '@/app/schemas/rank-calculator';
import { discordBotClient } from '@/discord';
import { ChannelType, Routes } from 'discord-api-types/v10';
import { Rank } from '@/config/enums';
import { PlayerName } from '@/app/schemas/player';
import { calculateScaling } from '../../utils/calculate-scaling';
import { formatPercentage } from '../../utils/format-percentage';
import { getRankName } from '../../utils/get-rank-name';
import { getRankImageUrl } from '../../utils/get-rank-image-url';

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

      const savedData = await redis.json.get<{
        '$.rankStructure': [RankStructure];
        '$.joinDate': [Date];
      }>(
        userDraftRankSubmissionKey(userId, playerName),
        '$.rankStructure',
        '$.joinDate',
      );

      if (!savedData) {
        throw new ActionError('No saved data!');
      }

      const {
        '$.joinDate': [joinDate],
        '$.rankStructure': [rankStructure],
      } = savedData;

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
      } satisfies RankSubmissionMetadata);

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
