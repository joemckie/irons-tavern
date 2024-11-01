import { ApiResponse } from '@/types/api';
import { FormData } from '@/types/rank-calculator';
import { errors } from '@upstash/redis';
import { DiscordAPIError, REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';
import { NextRequest, NextResponse } from 'next/server';
import { formatNumber } from '@/app/rank-calculator/utils/format-number';
import { RedisKeyNamespace } from '@/config/redis';
import { makeDiscordRequest } from '@/app/rank-calculator/utils/discord';
import { redis } from '@/auth';

function formatErrorMessage(error: unknown) {
  if (error instanceof errors.UpstashError) {
    return 'Failed to save to database';
  }

  if (error instanceof DiscordAPIError) {
    return 'Failed to send message to Discord';
  }

  return 'Something went wrong';
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<ApiResponse<void>>> {
  if (!process.env.DISCORD_CHANNEL_ID) {
    throw new Error('No discord channel ID provided');
  }

  if (!process.env.DISCORD_TOKEN) {
    throw new Error('No discord token provided');
  }

  const discord = new REST({
    makeRequest: makeDiscordRequest,
  }).setToken(process.env.DISCORD_TOKEN);

  try {
    const { playerName, points, rank, ...data }: FormData =
      await request.json();
    const result = await redis.json.set(
      `${RedisKeyNamespace.Submission}:${playerName.toLowerCase()}`,
      '$',
      data,
    );

    if (!result) {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to save submission',
        },
        { status: 500 },
      );
    }

    await discord.post(Routes.channelMessages(process.env.DISCORD_CHANNEL_ID), {
      body: {
        content: `${playerName} has applied for the ${rank} rank with ${formatNumber(points)} points!`,
      },
    });

    return NextResponse.json({
      success: true,
      error: null,
      data: null,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: formatErrorMessage(error),
      },
      { status: 500 },
    );
  }
}
