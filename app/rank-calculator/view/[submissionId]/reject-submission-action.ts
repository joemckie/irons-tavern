'use server';

import { authActionClient } from '@/app/safe-action';
import { discordBotClient } from '@/discord';
import { Routes } from 'discord-api-types/v10';
import { serverConstants } from '@/config/constants.server';
import { redis } from '@/redis';
import {
  RankSubmissionMetadata,
  RankSubmissionStatus,
} from '@/app/schemas/rank-calculator';
import { rankSubmissionMetadataKey } from '@/config/redis';
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
      if (!userCanModerateSubmission(permissions)) {
        throw new Error('You do not have permission to reject this submission');
      }

      const metadata = await redis.hmget<
        Pick<
          RankSubmissionMetadata,
          'discordMessageId' | 'submittedBy' | 'status'
        >
      >(
        rankSubmissionMetadataKey(submissionId),
        'status',
        'discordMessageId',
        'submittedBy',
      );

      if (!metadata) {
        throw new Error('Unable to find submission metadata');
      }

      const {
        discordMessageId: messageId,
        submittedBy: submitterId,
        status: submissionStatus,
      } = metadata;

      if (submissionStatus !== 'Pending') {
        throw new Error('Submission does not need to be moderated!');
      }

      await discordBotClient.put(
        Routes.channelMessageOwnReaction(
          serverConstants.discord.channelId,
          messageId,
          encodeURIComponent('❌'),
        ),
      );

      await sendDiscordMessage(
        {
          content: `<@${submitterId}>\n\nYour application has been rejected by <@${userId}>.\n\nPlease reach out if you have any questions.`,
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
