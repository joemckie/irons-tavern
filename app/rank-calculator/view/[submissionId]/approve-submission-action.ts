'use server';

import { authActionClient } from '@/app/safe-action';
import { discordBotClient } from '@/discord';
import { Routes } from 'discord-api-types/v10';
import { serverConstants } from '@/config/constants.server';
import { redis, redisRaw } from '@/redis';
import {
  RankStructure,
  RankSubmissionStatus,
} from '@/app/schemas/rank-calculator';
import {
  rankSubmissionKey,
  rankSubmissionMetadataKey,
  userOSRSAccountsKey,
} from '@/config/redis';
import { Player } from '@/app/schemas/player';
import dedent from 'dedent';
import { userCanModerateSubmission } from './utils/user-can-moderate-submission';
import { ApproveSubmissionSchema } from './moderate-submission-schema';
import { sendDiscordMessage } from '../../utils/send-discord-message';
import { getRankName } from '../../utils/get-rank-name';
import { assignRankDiscordRole } from './utils/assign-rank-discord-role';

export const approveSubmissionAction = authActionClient
  .metadata({
    actionName: 'approve-submission',
  })
  .schema(ApproveSubmissionSchema)
  .action(
    async ({
      parsedInput: { submissionId, rank },
      ctx: { permissions, userId: approverId },
    }) => {
      if (!userCanModerateSubmission(permissions)) {
        throw new Error(
          'You do not have permission to approve this submission',
        );
      }

      const metadata = (await redisRaw.hmget(
        rankSubmissionMetadataKey(submissionId),
        'status',
        'discordMessageId',
        'submittedBy',
      )) as unknown as [RankSubmissionStatus, string, string];

      if (!metadata) {
        throw new Error('Unable to find submission metadata');
      }

      const [submissionStatus, messageId, submitterId] = metadata;

      console.log(messageId, typeof messageId);

      if (submissionStatus !== 'Pending') {
        throw new Error('Submission does not need to be moderated!');
      }

      const submissionData = await redis.json.get<{
        '$.playerName': [string];
        '$.rankStructure': [RankStructure];
      }>(rankSubmissionKey(submissionId), '$.rankStructure', '$.playerName');

      if (!submissionData) {
        throw new Error('Unable to find submission data for application');
      }

      const {
        '$.playerName': [playerName],
        '$.rankStructure': [rankStructure],
      } = submissionData;

      await discordBotClient.put(
        Routes.channelMessageOwnReaction(
          serverConstants.discord.channelId,
          messageId,
          encodeURIComponent('☑️'),
        ),
      );

      if (rankStructure === 'Standard') {
        await assignRankDiscordRole(rank, submitterId);
        await sendDiscordMessage(
          {
            content: dedent`
              <@${submitterId}>

              Your application has been approved by <@${approverId}> and you have been assigned the ${getRankName(rank)} rank on Discord.

              Please reach out to a mod to update your in-game rank!
            `,
          },
          messageId,
        );
      } else {
        await sendDiscordMessage(
          {
            content: dedent`
              <@${submitterId}>

              Your application has been approved by <@${approverId}>.

              Please reach out to a mod to update your ranks!
            `,
          },
          messageId,
        );
      }

      const playerRecord = (await redis.hget(
        userOSRSAccountsKey(submitterId),
        playerName.toLowerCase(),
      )) as Player;

      if (!playerRecord) {
        throw new Error('Unable to find player record!');
      }

      const transaction = redis.multi();

      transaction.hset<RankSubmissionStatus | string>(
        rankSubmissionMetadataKey(submissionId),
        {
          status: 'Approved',
          actionedBy: approverId,
        },
      );

      transaction.hset<Player>(userOSRSAccountsKey(submitterId), {
        [playerName.toLowerCase()]: {
          ...playerRecord,
          rank,
        },
      });

      const result = await transaction.exec();

      if (!result) {
        throw new Error('Unable to persist approval to database');
      }

      return {
        success: true,
      };
    },
  );
