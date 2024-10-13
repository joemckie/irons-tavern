import { NextRequest, NextResponse } from 'next/server';
import { playerDataFixture } from '@/fixtures/player-data-response.fixture';

export async function GET(request: NextRequest) {
  const player = request.nextUrl.searchParams.get('player');

  if (!player) {
    return NextResponse.error();
  }

  return NextResponse.json(playerDataFixture);
}
