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
import { format } from 'date-fns';
import { calculateScaling } from '../utils/calculate-scaling';
import { formatPercentage } from '../utils/format-percentage';

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
      {
        embeds: [
          {
            title: `${playerName} rank application`,
            thumbnail: {
              url: 'https://irons-tavern-inactivity-checker.vercel.app/icons/owner.png',
            },
            fields: [
              {
                name: 'Rank',
                value: rank,
                inline: true,
              },
              {
                name: 'Rank structure',
                value: data.rankStructure,
                inline: true,
              },
              {
                name: 'Total points',
                value: formatNumber(points),
                inline: true,
              },
              {
                name: 'Join date',
                value: format(data.joinDate, 'dd MMM yyyy'),
                inline: true,
              },
              {
                name: 'Scaling',
                value: formatPercentage(calculateScaling(data.joinDate)),
                inline: true,
              },
              {
                name: 'User',
                value: `<@${session.user.id}>`,
                inline: true,
              },
              {
                name: 'View link',
                value: `[Click to view submission](${constants.publicUrl}/rank-calculator/view/${submissionId})`,
              },
            ],
          },
        ],
      },
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
