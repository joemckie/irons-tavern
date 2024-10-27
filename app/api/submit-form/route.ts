import { ApiResponse } from '@/types/api';
import { FormData } from '@/types/rank-calculator';
import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from 'next/server';

const redis = Redis.fromEnv({
  keepAlive: false,
});

export async function POST(
  request: NextRequest,
): Promise<NextResponse<ApiResponse<void>>> {
  const { playerName, ...data }: FormData = await request.json();

  try {
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

    return NextResponse.json({
      success: true,
      error: null,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error,
      },
      { status: 500 },
    );
  }
}
