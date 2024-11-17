'use server';

import { authActionClient } from '@/app/safe-action';
import { discordBotClient } from '@/discord';
import { APIGuildMember, Routes } from 'discord-api-types/v10';
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
import { discordRoles } from '@/config/discord-roles';
import { Player } from '@/app/schemas/player';
import { userCanModerateSubmission } from './utils/user-can-moderate-submission';
import { ApproveSubmissionSchema } from './moderate-submission-schema';
import { sendDiscordMessage } from '../../utils/send-discord-message';
import { getRankName } from '../../utils/get-rank-name';

export const approveSubmissionAction = authActionClient
  .metadata({
    actionName: 'approve-submission',
  })
  .schema(ApproveSubmissionSchema)
  .action(
    async ({
      parsedInput: { submissionId, rank },
      ctx: { permissions, userId },
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

      if (
        !userCanModerateSubmission(permissions, rankStructure, submissionStatus)
      ) {
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

      // Remove all existing rank roles
      await Promise.all([
        appliedRankRoles.map((roleId) =>
          discordBotClient.delete(
            Routes.guildMemberRole(guildId, submittedBy, roleId),
          ),
        ),
      ]);

      // Apply the approved role
      await discordBotClient.put(
        Routes.guildMemberRole(
          guildId,
          submittedBy,
          discordRoles[rank as keyof typeof discordRoles],
        ),
      );

      await sendDiscordMessage(
        {
          content: `<@${submittedBy}>\n\nYour application has been approved by <@${userId}> and you have been assigned the ${getRankName(rank)} rank on Discord.\n\nPlease reach out to a mod to update your in-game rank!`,
        },
        messageId,
      );

      const playerRecord = (await redis.hget(
        userOSRSAccountsKey(submittedBy),
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
          actionedBy: userId,
        },
      );

      transaction.hset<Player>(userOSRSAccountsKey(userId), {
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
