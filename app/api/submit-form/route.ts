import { ApiResponse } from '@/types/api';
import { FormData } from '@/types/rank-calculator';
import { Redis, errors } from '@upstash/redis';
import { DiscordAPIError, ResponseLike, REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';
import { NextRequest, NextResponse } from 'next/server';

export interface SubmitFormData {
  formData: FormData;
  points: number;
  rank: string;
}

function formatErrorMessage(error: unknown) {
  if (error instanceof errors.UpstashError) {
    return 'Failed to save to database';
  }

  if (error instanceof DiscordAPIError) {
    return 'Failed to send message to Discord';
  }

  return 'Something went wrong';
}

const redis = Redis.fromEnv({
  keepAlive: false,
});

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
    async makeRequest(url, init) {
      const response = await fetch(url, init as RequestInit);
      return response as ResponseLike;
    },
  }).setToken(process.env.DISCORD_TOKEN);

  try {
    const {
      formData: { playerName, ...data },
      rank,
      points,
    }: SubmitFormData = await request.json();
    const result = await redis.json.set(
      `submission:${playerName.toLowerCase()}`,
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
        content: `${playerName} has applied for the ${rank} rank with ${points} points!`,
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
