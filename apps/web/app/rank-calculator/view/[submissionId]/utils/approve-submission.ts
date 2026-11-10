import 'server-only';

import { ActionError } from '@/app/action-error';
import { serverConstants } from '@/config/constants.server';
import type { achievementDiscordRoles } from '@/config/discord-roles';
import { discordBotClient } from '@/discord';
import { initORM } from '@/database/db';
import { RankSubmission } from '@/database/entities/rank-submission.entity';
import { Routes } from 'discord-api-types/v10';
import { assignRankDiscordRole } from './assign-rank-discord-role';
import { assignAchievementDiscordRoles } from './assign-achievement-discord-roles';
import { sendDiscordMessage } from '@/app/rank-calculator/utils/send-discord-message';
import dedent from 'dedent';
import { getRankName } from '@/app/rank-calculator/utils/get-rank-name';
import type { Rank } from '@/config/enums';
import * as Sentry from '@sentry/node';
import type { UUID } from 'node:crypto';

type ApproveSubmissionInput = {
  submissionId: UUID;
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
  const { em } = await initORM();
  const submission = await em.findOne(
    RankSubmission,
    { id: submissionId },
    {
      populate: ['osrsAccount'],
    },
  );

  if (!submission) {
    throw new ActionError('Unable to find submission');
  }

  const {
    status: submissionStatus,
    discordMessageId: messageId,
    submittedBy: submitterId,
    hasWikiSyncData,
  } = submission.metadata;

  if (submissionStatus !== 'Pending') {
    throw new ActionError('Submission does not need to be moderated!');
  }

  const {
    data: {
      rankStructure,
      combatAchievementTier,
      hasBloodTorva: isBloodTorvaChecked,
    },
    diff: {
      combatAchievementTier: combatAchievementTierDiscrepancy,
      hasBloodTorva: hasBloodTorvaDiscrepancy,
    },
  } = submission;

  // If the player has WikiSync data available and has the Grandmaster CA tier,
  // they can be assigned the Grandmaster role.
  const isVerifiedGrandmaster =
    hasWikiSyncData &&
    combatAchievementTier === 'Grandmaster' &&
    !combatAchievementTierDiscrepancy;

  // If the player has WikiSync data available and has the Ancient blood ornament kit,
  // they can be assigned the Blood Torva role.
  // This item is based on multiple combat achievements that are available via WikiSync.
  const hasVerifiedAncientBloodOrnamentKit =
    hasWikiSyncData && isBloodTorvaChecked && !hasBloodTorvaDiscrepancy;

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

  const playerRecord = submission.osrsAccount;

  if (!playerRecord) {
    throw new ActionError('Unable to find player record!');
  }

  const actionedBy = isAutomatic ? 'System' : approverId;

  if (!actionedBy) {
    Sentry.captureException('Unable to determine actionedBy for approval');

    throw new ActionError('Something went wrong while approving submission');
  }

  em.assign(submission.metadata, {
    status: 'Approved',
    actionedBy,
    automaticApproval: isAutomatic,
  });

  em.assign(playerRecord, { rank });

  try {
    await em.flush();
  } catch (error) {
    Sentry.captureException(error);

    throw new ActionError('Unable to persist approval to database');
  }

  return { success: true };
}
