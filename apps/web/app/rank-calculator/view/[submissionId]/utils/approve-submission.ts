'use server';

import { ActionError } from '@/app/action-error';
import type { CombatAchievementTier } from '@/app/schemas/osrs';
import type {
  RankStructure,
  RankSubmissionDiff,
  RankSubmissionStatus,
} from '@/app/schemas/rank-calculator';
import { serverConstants } from '@/config/constants.server';
import type { achievementDiscordRoles } from '@/config/discord-roles';
import {
  rankSubmissionDiffKey,
  rankSubmissionKey,
  rankSubmissionMetadataKey,
  userOSRSAccountsKey,
} from '@/config/redis';
import { discordBotClient } from '@/discord';
import { redis, redisRaw } from '@/redis';
import { Routes } from 'discord-api-types/v10';
import { assignRankDiscordRole } from './assign-rank-discord-role';
import { assignAchievementDiscordRoles } from './assign-achievement-discord-roles';
import { sendDiscordMessage } from '@/app/rank-calculator/utils/send-discord-message';
import dedent from 'dedent';
import { getRankName } from '@/app/rank-calculator/utils/get-rank-name';
import type { Player } from '@/app/schemas/player';
import type { Rank } from '@/config/enums';
import * as Sentry from '@sentry/node';

type ApproveSubmissionInput = {
  submissionId: string;
  rank: Rank;
} & (
  | {
      approverId: string;
      isAutomatic?: false;
    }
  | {
      approverId?: never;
      isAutomatic: true;
    }
);

export async function approveSubmission({
  submissionId,
  rank,
  approverId,
  isAutomatic = false,
}: ApproveSubmissionInput) {
  const metadata = (await redisRaw.hmget(
    rankSubmissionMetadataKey(submissionId),
    'status',
    'discordMessageId',
    'submittedBy',
    'hasWikiSyncData',
  )) as unknown as [RankSubmissionStatus, string, string, string];

  if (!metadata) {
    throw new ActionError('Unable to find submission metadata');
  }

  const [submissionStatus, messageId, submitterId, hasWikiSyncData] = metadata;

  if (submissionStatus !== 'Pending') {
    throw new ActionError('Submission does not need to be moderated!');
  }

  const submissionData = await redis.json.get<{
    '$.playerName': [string];
    '$.rankStructure': [RankStructure];
    '$.combatAchievementTier': [CombatAchievementTier];
    '$.hasBloodTorva': [boolean];
  }>(
    rankSubmissionKey(submissionId),
    '$.rankStructure',
    '$.playerName',
    '$.combatAchievementTier',
    '$.hasBloodTorva',
  );

  if (!submissionData) {
    throw new ActionError('Unable to find submission data for application');
  }

  const {
    '$.playerName': [playerName],
    '$.rankStructure': [rankStructure],
    '$.combatAchievementTier': [combatAchievementTier],
    '$.hasBloodTorva': [isBloodTorvaChecked],
  } = submissionData;

  const submissionDiff = await redis.hmget<
    Pick<RankSubmissionDiff, 'combatAchievementTier' | 'hasBloodTorva'>
  >(
    rankSubmissionDiffKey(submissionId),
    'combatAchievementTier',
    'hasBloodTorva',
  );

  if (!submissionDiff) {
    throw new ActionError('Unable to find submission diff for application');
  }

  const {
    combatAchievementTier: combatAchievementTierDiscrepancy,
    hasBloodTorva: hasBloodTorvaDiscrepancy,
  } = submissionDiff;

  // If the player has WikiSync data available and has the Grandmaster CA tier,
  // they can be assigned the Grandmaster role.
  const isVerifiedGrandmaster =
    hasWikiSyncData === 'true' &&
    combatAchievementTier === 'Grandmaster' &&
    !combatAchievementTierDiscrepancy;

  // If the player has WikiSync data available and has the Ancient blood ornament kit,
  // they can be assigned the Blood Torva role.
  // This item is based on multiple combat achievements that are available via WikiSync.
  const hasVerifiedAncientBloodOrnamentKit =
    hasWikiSyncData === 'true' &&
    isBloodTorvaChecked &&
    !hasBloodTorvaDiscrepancy;

  const applicableAchievementDiscordRoles = {
    'Blood Torva': hasVerifiedAncientBloodOrnamentKit,
    Grandmaster: isVerifiedGrandmaster,
  } satisfies Record<keyof typeof achievementDiscordRoles, boolean>;

  const requiresAchievementRoles = Object.values(
    applicableAchievementDiscordRoles,
  ).some(Boolean);

  const autoModeratableRankStructures = [
    'Standard',
    'Admin',
  ] as RankStructure[];

  if (autoModeratableRankStructures.includes(rankStructure)) {
    const [, , newAchievementRoles = []] = await Promise.all([
      discordBotClient.put(
        Routes.channelMessageOwnReaction(
          serverConstants.discord.channelId,
          messageId,
          encodeURIComponent('☑️'),
        ),
      ),
      assignRankDiscordRole(rank, submitterId),
      ...(requiresAchievementRoles
        ? [
            assignAchievementDiscordRoles(
              submitterId,
              applicableAchievementDiscordRoles,
            ),
          ]
        : []),
    ]);

    await sendDiscordMessage(
      {
        content: dedent`
          <@${submitterId}>

          Your application has been ${
            isAutomatic
              ? 'automatically approved'
              : `approved by <@${approverId}>`
          } and you have been assigned the following role(s) on Discord:
          
          ${[getRankName(rank), ...newAchievementRoles.filter(Boolean)]
            .map((role) => `- ${role}`)
            .join('\n')}

          Please reach out to any member of staff to update your in-game rank!
        `,
      },
      messageId,
    );
  } else {
    if (requiresAchievementRoles) {
      await assignAchievementDiscordRoles(
        submitterId,
        applicableAchievementDiscordRoles,
      );
    }

    await sendDiscordMessage(
      {
        content: dedent`
          <@${submitterId}>

          Your application has been approved by <@${approverId}>.

          Please reach out to a mod or key to update your ranks!
        `,
      },
      messageId,
    );
  }

  const playerRecord = (await redis.hget(
    userOSRSAccountsKey(submitterId),
    playerName.toLowerCase(),
  ))!;

  if (!playerRecord) {
    throw new ActionError('Unable to find player record!');
  }

  const transaction = redis.multi();

  const actionedBy = isAutomatic ? 'System' : approverId;

  if (!actionedBy) {
    Sentry.captureException('Unable to determine actionedBy for approval');

    throw new ActionError('Something went wrong while approving submission');
  }

  transaction.hset<string>(rankSubmissionMetadataKey(submissionId), {
    status: 'Approved',
    actionedBy,
    automaticApproval: isAutomatic ? 'true' : 'false',
  });

  transaction.hset<Omit<Player, 'joinDate' | 'rsn' | 'isMobileOnly'>>(
    userOSRSAccountsKey(submitterId),
    {
      [playerName.toLowerCase()]: { ...playerRecord, rank },
    },
  );

  const result = await transaction.exec();

  if (!result) {
    throw new ActionError('Unable to persist approval to database');
  }

  return { success: true };
}
