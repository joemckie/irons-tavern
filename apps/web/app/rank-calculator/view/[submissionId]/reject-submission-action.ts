'use server';

import { authActionClient } from '@/app/safe-action';
import { discordBotClient } from '@/discord';
import { Routes } from 'discord-api-types/v10';
import { serverConstants } from '@/config/constants.server';
import { initORM } from '@/database/db';
import { RankSubmission } from '@/database/entities/rank-submission.entity';
import dedent from 'dedent';
import { ActionError } from '@/app/action-error';
import { userCanModerateSubmission } from './utils/user-can-moderate-submission';
import { sendDiscordMessage } from '../../utils/send-discord-message';
import { RejectSubmissionSchema } from './moderate-submission-schema';

export const rejectSubmissionAction = authActionClient
  .metadata({ actionName: 'reject-submission' })
  .inputSchema(RejectSubmissionSchema)
  .action(
    async ({ parsedInput: { submissionId }, ctx: { permissions, userId } }) => {
      if (!userCanModerateSubmission(permissions)) {
        throw new ActionError(
          'You do not have permission to reject this submission',
        );
      }

      const { em } = await initORM();
      const submission = await em.findOne(RankSubmission, { id: submissionId });

      if (!submission) {
        throw new ActionError('Unable to find submission metadata');
      }

      const {
        status: submissionStatus,
        discordMessageId: messageId,
        submittedBy: submitterId,
      } = submission.metadata;

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

      em.assign(submission.metadata, { status: 'Rejected' });

      await em.flush();

      return { success: true };
    },
  );
