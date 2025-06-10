'use server';

import { authActionClient } from '@/app/safe-action';
import { discordBotClient } from '@/discord';
import { Routes } from 'discord-api-types/v10';
import { serverConstants } from '@/config/constants.server';
import { redis, redisRaw } from '@/redis';
import { RankSubmissionStatus } from '@/app/schemas/rank-calculator';
import { rankSubmissionMetadataKey } from '@/config/redis';
import dedent from 'dedent';
import { ActionError } from '@/app/action-error';
import { userCanModerateSubmission } from './utils/user-can-moderate-submission';
import { sendDiscordMessage } from '../../utils/send-discord-message';
import { RejectSubmissionSchema } from './moderate-submission-schema';

export const rejectSubmissionAction = authActionClient
  .metadata({ actionName: 'reject-submission' })
  .schema(RejectSubmissionSchema)
  .action(
    async ({ parsedInput: { submissionId }, ctx: { permissions, userId } }) => {
      if (!userCanModerateSubmission(permissions)) {
        throw new ActionError(
          'You do not have permission to reject this submission',
        );
      }

      const metadata = (await redisRaw.hmget(
        rankSubmissionMetadataKey(submissionId),
        'status',
        'discordMessageId',
        'submittedBy',
      )) as unknown as [RankSubmissionStatus, string, string];

      if (!metadata) {
        throw new ActionError('Unable to find submission metadata');
      }

      const [submissionStatus, messageId, submitterId] = metadata;

      if (submissionStatus !== 'Pending') {
        throw new ActionError('Submission does not need to be moderated!');
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
          content: dedent`
            <@${submitterId}>

            Your application has been rejected by <@${userId}>.
            
            Please reach out if you have any questions.
          `,
        },
        messageId,
      );

      await redis.hset<RankSubmissionStatus>(
        rankSubmissionMetadataKey(submissionId),
        { status: 'Rejected' },
      );

      return { success: true };
    },
  );
