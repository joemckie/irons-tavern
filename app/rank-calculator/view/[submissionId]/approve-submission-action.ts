'use server';

import { authActionClient } from '@/app/safe-action';
import { discordBotClient } from '@/discord';
import { Routes } from 'discord-api-types/v10';
import { serverConstants } from '@/config/constants.server';
import { redis } from '@/redis';
import { rankSubmissionDiscordMessageIdKey } from '@/config/redis';
import { userCanModerateSubmission } from './utils/user-can-moderate-submission';
import { ModerateSubmissionSchema } from './moderate-submission-schema';

export const approveSubmissionAction = authActionClient
  .metadata({
    actionName: 'approve-submission',
  })
  .schema(ModerateSubmissionSchema)
  .action(
    async ({
      parsedInput: { submissionId, rankStructure },
      ctx: { permissions },
    }) => {
      if (!userCanModerateSubmission(permissions, rankStructure)) {
        throw new Error(
          'You do not have permission to approve this submission',
        );
      }

      const messageId = await redis.get<string>(
        rankSubmissionDiscordMessageIdKey(submissionId),
      );

      if (!messageId) {
        throw new Error('No message found for submission');
      }

      await discordBotClient.put(
        Routes.channelMessageOwnReaction(
          serverConstants.discord.channelId,
          messageId,
          encodeURIComponent('☑️'),
        ),
      );

      return {
        success: true,
      };
    },
  );
