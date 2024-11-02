'use server';

import { ApiResponse } from '@/types/api';
import { FormData } from '@/types/rank-calculator';
import { errors } from '@upstash/redis';
import { DiscordAPIError } from '@discordjs/rest';
import { formatNumber } from '@/app/rank-calculator/utils/format-number';
import { RedisKeyNamespace } from '@/config/redis';
import { redis } from '@/auth';
import { randomUUID } from 'crypto';
import { sendDiscordMessage } from '@/app/rank-calculator/utils/send-discord-message';
import { captureException } from '@sentry/nextjs';

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
  if (!process.env.DISCORD_CHANNEL_ID) {
    throw new Error('No discord channel ID provided');
  }

  try {
    const submissionId = randomUUID();
    const result = await redis.json.set(
      `${RedisKeyNamespace.Submission}:${submissionId}`,
      '$',
      data,
    );

    if (!result) {
      return {
        success: false,
        error: 'Failed to save submission',
      };
    }

    await sendDiscordMessage(
      `${playerName} has applied for the ${rank} rank with ${formatNumber(points)} points!`,
      process.env.DISCORD_CHANNEL_ID,
    );

    return {
      success: true,
      error: null,
      data: null,
    };
  } catch (error) {
    captureException(error);

    return {
      success: false,
      error: formatErrorMessage(error),
    };
  }
}
