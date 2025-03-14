'use server';

import { authActionClient } from '@/app/safe-action';
import { discordBotClient } from '@/discord';
import { Routes } from 'discord-api-types/v10';
import { serverConstants } from '@/config/constants.server';
import { redis, redisRaw } from '@/redis';
import { ActionError } from '@/app/action-error';
import {
  RankStructure,
  RankSubmissionStatus,
} from '@/app/schemas/rank-calculator';
import {
  rankSubmissionDiffKey,
  rankSubmissionKey,
  rankSubmissionMetadataKey,
  userOSRSAccountsKey,
} from '@/config/redis';
import { Player } from '@/app/schemas/player';
import { CombatAchievementTier } from '@/app/schemas/osrs';
import { achievementDiscordRoles } from '@/config/discord-roles';
import dedent from 'dedent';
import { userCanModerateSubmission } from './utils/user-can-moderate-submission';
import { ApproveSubmissionSchema } from './moderate-submission-schema';
import { sendDiscordMessage } from '../../utils/send-discord-message';
import { getRankName } from '../../utils/get-rank-name';
import { assignRankDiscordRole } from './utils/assign-rank-discord-role';
import { assignAchievementDiscordRoles } from './utils/assign-achievement-discord-roles';

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
        throw new ActionError(
          'You do not have permission to approve this submission',
        );
      }

      const metadata = (await redisRaw.hmget(
        rankSubmissionMetadataKey(submissionId),
        'status',
        'discordMessageId',
        'submittedBy',
        'hasWikiSyncData',
      )) as unknown as [RankSubmissionStatus, string, string, boolean];

      if (!metadata) {
        throw new ActionError('Unable to find submission metadata');
      }

      const [submissionStatus, messageId, submitterId, hasWikiSyncData] =
        metadata;

      if (submissionStatus !== 'Pending') {
        throw new ActionError('Submission does not need to be moderated!');
      }

      const submissionData = await redis.json.get<{
        '$.playerName': [string];
        '$.rankStructure': [RankStructure];
        '$.combatAchievementTier': [CombatAchievementTier];
        '$.acquiredItems["Ancient blood ornament kit"]': [boolean];
      }>(
        rankSubmissionKey(submissionId),
        '$.rankStructure',
        '$.playerName',
        '$.combatAchievementTier',
        '$.acquiredItems["Ancient blood ornament kit"]',
      );

      if (!submissionData) {
        throw new ActionError('Unable to find submission data for application');
      }

      const {
        '$.playerName': [playerName],
        '$.rankStructure': [rankStructure],
        '$.combatAchievementTier': [combatAchievementTier],
        '$.acquiredItems["Ancient blood ornament kit"]': [
          isAncientBloodOrnamentKitChecked,
        ],
      } = submissionData;

      const submissionDiff = await redis.json.get<{
        '$.acquiredItems': [string[]];
        '$.combatAchievementTier': [CombatAchievementTier];
      }>(
        rankSubmissionDiffKey(submissionId),
        '$.acquiredItems',
        '$.combatAchievementTier',
      );

      if (!submissionDiff) {
        throw new ActionError('Unable to find submission diff for application');
      }

      const {
        '$.combatAchievementTier': [combatAchievementTierDiscrepancy],
        '$.acquiredItems': [acquiredItemsDiscrepancies],
      } = submissionDiff;

      // If the player has WikiSync data available and has the Grandmaster CA tier,
      // they can be assigned the Grandmaster role.
      const isVerifiedGrandmaster =
        hasWikiSyncData &&
        combatAchievementTier === 'Grandmaster' &&
        combatAchievementTierDiscrepancy === null;

      // If the player has WikiSync data available and has the Ancient blood ornament kit,
      // they can be assigned the Blood Torva role.
      // This item is based on multiple combat achievements that are available via WikiSync.
      const hasVerifiedAncientBloodOrnamentKit =
        hasWikiSyncData &&
        isAncientBloodOrnamentKitChecked &&
        !acquiredItemsDiscrepancies.includes('Ancient blood ornament kit');

      const applicableAchievementDiscordRoles = {
        'Blood Torva': hasVerifiedAncientBloodOrnamentKit,
        Grandmaster: isVerifiedGrandmaster,
      } satisfies Record<keyof typeof achievementDiscordRoles, boolean>;

      const requiresAchievementRoles = Object.values(
        applicableAchievementDiscordRoles,
      ).some(Boolean);

      if (rankStructure === 'Standard') {
        await discordBotClient.put(
          Routes.channelMessageOwnReaction(
            serverConstants.discord.channelId,
            messageId,
            encodeURIComponent('☑️'),
          ),
        );
        await assignRankDiscordRole(rank, submitterId);

        const newAchievementRoles = requiresAchievementRoles
          ? await assignAchievementDiscordRoles(
              submitterId,
              applicableAchievementDiscordRoles,
            )
          : [];

        await sendDiscordMessage(
          {
            content: dedent`
              <@${submitterId}>

              Your application has been approved by <@${approverId}> and you have been assigned the following role(s) on Discord:
              
              - ${getRankName(rank)}
              ${newAchievementRoles.map((role) => `- ${role}`).join('\n')}

              Please reach out to a mod to update your in-game rank!
            `,
          },
          messageId,
        );
      } else {
        const newAchievementRoles = requiresAchievementRoles
          ? await assignAchievementDiscordRoles(
              submitterId,
              applicableAchievementDiscordRoles,
            )
          : [];

        await sendDiscordMessage(
          {
            content: dedent`
              <@${submitterId}>

              Your application has been approved by <@${approverId}>.

              ${
                requiresAchievementRoles &&
                `
                You have been assigned the following role(s) on Discord:

                ${newAchievementRoles.map((role) => `- ${role}`).join('\n')}
              `
              }

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
        throw new ActionError('Unable to find player record!');
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
        throw new ActionError('Unable to persist approval to database');
      }

      return {
        success: true,
      };
    },
  );
