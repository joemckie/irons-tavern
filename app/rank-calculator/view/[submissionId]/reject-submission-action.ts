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
import { rankSubmissionKey, rankSubmissionMetadataKey } from '@/config/redis';
import { userCanModerateSubmission } from './utils/user-can-moderate-submission';
import { sendDiscordMessage } from '../../utils/send-discord-message';
import { RejectSubmissionSchema } from './moderate-submission-schema';

export const rejectSubmissionAction = authActionClient
  .metadata({
    actionName: 'reject-submission',
  })
  .schema(RejectSubmissionSchema)
  .action(
    async ({ parsedInput: { submissionId }, ctx: { permissions, userId } }) => {
      const submissionStatus = (await redis.hget(
        rankSubmissionMetadataKey(submissionId),
        'status',
      )) as RankSubmissionStatus;

      if (submissionStatus !== 'Pending') {
        throw new Error('Submission does not need to be moderated!');
      }

      const submissionData = await redis.json.get<[RankStructure]>(
        rankSubmissionKey(submissionId),
        '$.rankStructure',
      );

      if (!submissionData) {
        throw new Error('Unable to find rank structure for application');
      }

      if (!userCanModerateSubmission(permissions, submissionStatus)) {
        throw new Error('You do not have permission to reject this submission');
      }

      const messageId = await redis.hget<string>(
        rankSubmissionMetadataKey(submissionId),
        'discordMessageId',
      );

      const submittedBy = await redis.hget<string>(
        rankSubmissionMetadataKey(submissionId),
        'submittedBy',
      );

      if (!messageId) {
        throw new Error('No message found for submission');
      }

      if (!submittedBy) {
        throw new Error('Unable to find submitter ID');
      }

      const { channelId } = serverConstants.discord;

      await discordBotClient.put(
        Routes.channelMessageOwnReaction(
          channelId,
          messageId,
          encodeURIComponent('❌'),
        ),
      );

      await sendDiscordMessage(
        {
          content: `<@${submittedBy}>\n\nYour application has been rejected by <@${userId}>.\n\nPlease reach out if you have any questions.`,
        },
        messageId,
      );

      await redis.hset<RankSubmissionStatus>(
        rankSubmissionMetadataKey(submissionId),
        { status: 'Rejected' },
      );

      return {
        success: true,
      };
    },
  );
