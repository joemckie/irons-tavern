'use server';

import { ApiResponse } from '@/types/api';
import { FormData } from '@/types/rank-calculator';
import { errors } from '@upstash/redis';
import { DiscordAPIError } from '@discordjs/rest';
import { formatNumber } from '@/app/rank-calculator/utils/format-number';
import { rankSubmissionKey, userRankSubmissionsKey } from '@/config/redis';
import { auth, redis } from '@/auth';
import { randomUUID } from 'crypto';
import { sendDiscordMessage } from '@/app/rank-calculator/utils/send-discord-message';
import * as Sentry from '@sentry/nextjs';
import { constants } from '@/config/constants';

function formatErrorMessage(error: unknown) {
  if (error instanceof errors.UpstashError) {
    return 'Failed to save to database';
  }

  if (error instanceof DiscordAPIError) {
    return 'Failed to send message to Discord';
  }

  return 'Something went wrong';
}

export async function submitRankCalculator({
  playerName,
  points,
  rank,
  ...data
}: FormData): Promise<ApiResponse<void>> {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error('No session found');
  }

  if (!process.env.DISCORD_CHANNEL_ID) {
    throw new Error('No discord channel ID provided');
  }

  try {
    const submissionId = randomUUID();
    const submissionTransaction = redis.multi();

    submissionTransaction.json.set(rankSubmissionKey(submissionId), '$', data, {
      nx: true,
    });

    submissionTransaction.lpush(
      userRankSubmissionsKey(session.user.id, playerName),
      rankSubmissionKey(submissionId),
    );

    const submissionResult = await submissionTransaction.exec();

    if (!submissionResult) {
      return {
        success: false,
        error: 'Failed to save submission',
      };
    }

    await sendDiscordMessage(
      `<@${session.user.id}> has applied for the ${rank} rank on ${playerName} with ${formatNumber(points)} points!\n\n` +
        `View their submission here: ${constants.publicUrl}/rank-calculator/view/${submissionId}`,
      process.env.DISCORD_CHANNEL_ID,
    );

    return {
      success: true,
      error: null,
      data: null,
    };
  } catch (error) {
    Sentry.captureException(error);

    return {
      success: false,
      error: formatErrorMessage(error),
    };
  }
}
