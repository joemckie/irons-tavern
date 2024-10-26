import { ApiResponse } from '@/types/api';
import { FormData } from '@/types/rank-calculator';
import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from 'next/server';

const redis = Redis.fromEnv();

export async function POST(
  request: NextRequest,
): Promise<NextResponse<ApiResponse>> {
  const { playerName, ...data }: FormData = await request.json();

  try {
    const result = await redis.set(
      `submission:${playerName.toLowerCase()}`,
      data,
    );

    return NextResponse.json({ success: !!result });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ success: false }, { status: 500 });
  }
}
