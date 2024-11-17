'use server';

import { authActionClient } from '@/app/safe-action';
import { discordBotClient } from '@/discord';
import { Routes } from 'discord-api-types/v10';
import { serverConstants } from '@/config/constants.server';
import { redis } from '@/redis';
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
      const submissionStatus = (await redis.hget(
        rankSubmissionMetadataKey(submissionId),
        'status',
      )) as RankSubmissionStatus;

      if (submissionStatus !== 'Pending') {
        throw new Error('Submission does not need to be moderated!');
      }

      const submissionData = await redis.json.get<{
        '$.playerName': [string];
        '$.rankStructure': [RankStructure];
      }>(rankSubmissionKey(submissionId), '$.rankStructure', '$.playerName');

      if (!submissionData) {
        throw new Error('Unable to find rank structure for application');
      }

      const {
        '$.playerName': [playerName],
        '$.rankStructure': [rankStructure],
      } = submissionData;

      if (!userCanModerateSubmission(permissions, submissionStatus)) {
        throw new Error(
          'You do not have permission to approve this submission',
        );
      }

      const messageId = await redis.hget<string>(
        rankSubmissionMetadataKey(submissionId),
        'discordMessageId',
      );

      const submitterId = await redis.hget<string>(
        rankSubmissionMetadataKey(submissionId),
        'submittedBy',
      );

      if (!messageId) {
        throw new Error('No message found for submission');
      }

      if (!submitterId) {
        throw new Error('Unable to find submitter ID');
      }

      const { channelId } = serverConstants.discord;

      await discordBotClient.put(
        Routes.channelMessageOwnReaction(
          channelId,
          messageId,
          encodeURIComponent('☑️'),
        ),
      );

      if (rankStructure === 'Standard') {
        await assignRankDiscordRole(rank, submitterId);
        await sendDiscordMessage(
          {
            content: `<@${submitterId}>\n\nYour application has been approved by <@${approverId}> and you have been assigned the ${getRankName(rank)} rank on Discord.\n\nPlease reach out to a mod to update your in-game rank!`,
          },
          messageId,
        );
      } else {
        await sendDiscordMessage(
          {
            content: `<@${submitterId}>\n\nYour application has been approved by <@${approverId}>.\n\nPlease reach out to a mod to update your ranks!`,
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
