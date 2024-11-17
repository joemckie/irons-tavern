'use server';

import { authActionClient } from '@/app/safe-action';
import { discordBotClient } from '@/discord';
import { APIGuildMember, Routes } from 'discord-api-types/v10';
import { serverConstants } from '@/config/constants.server';
import { redis } from '@/redis';
import { RankSubmissionStatus } from '@/app/schemas/rank-calculator';
import { rankSubmissionMetadataKey } from '@/config/redis';
import { discordRoles } from '@/config/discord-roles';
import { userCanModerateSubmission } from './utils/user-can-moderate-submission';
import { ModerateSubmissionSchema } from './moderate-submission-schema';

export const approveSubmissionAction = authActionClient
  .metadata({
    actionName: 'approve-submission',
  })
  .schema(ModerateSubmissionSchema)
  .action(
    async ({
      parsedInput: { submissionId, rankStructure, rank },
      ctx: { permissions },
    }) => {
      if (!userCanModerateSubmission(permissions, rankStructure)) {
        throw new Error(
          'You do not have permission to approve this submission',
        );
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

      const { channelId, guildId } = serverConstants.discord;

      await discordBotClient.put(
        Routes.channelMessageOwnReaction(
          channelId,
          messageId,
          encodeURIComponent('☑️'),
        ),
      );

      const { roles } = (await discordBotClient.get(
        Routes.guildMember(guildId, submittedBy),
      )) as APIGuildMember;

      // It's not possible to remove multiple roles in a single call,
      // so we filter the roles to avoid making 10+ requests each time
      const appliedRankRoles = Object.values(discordRoles).filter((roleId) =>
        roles.includes(roleId),
      );

      await Promise.all([
        ...appliedRankRoles.map((roleId) =>
          discordBotClient.delete(
            Routes.guildMemberRole(guildId, submittedBy, roleId),
          ),
        ),
        discordBotClient.put(
          Routes.guildMemberRole(
            guildId,
            submittedBy,
            discordRoles[rank as keyof typeof discordRoles],
          ),
        ),
      ]);

      await redis.hset<RankSubmissionStatus>(
        rankSubmissionMetadataKey(submissionId),
        { status: 'Approved' },
      );

      return {
        success: true,
      };
    },
  );
