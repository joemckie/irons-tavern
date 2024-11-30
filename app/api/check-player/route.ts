import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { clientConstants } from '@/config/constants.client';
import { PlayerInfoResponse } from '@/app/schemas/temple-api';
import * as Sentry from '@sentry/nextjs';
import { redis } from '@/redis';
import { playerGameModesKey } from '@/config/redis';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const player = request.nextUrl.searchParams.get('player');

  if (!player) {
    throw new Error('No player provided');
  }

  const playerInfoRequest = await fetch(
    `${clientConstants.temple.baseUrl}/api/player_info.php?player=${player}`,
  );
  const playerInfo: PlayerInfoResponse = await playerInfoRequest.json();
  const shouldCheckPlayer = playerInfo.data['Datapoint Cooldown'] === '-';

  try {
    // If the player has a datapoint cool-down (i.e. a number),
    // this means they have been checked very recently,
    // hence we skip these players entirely to avoid triggering rate limits.
    if (shouldCheckPlayer) {
      // eslint-disable-next-line no-console
      console.log(`Checking ${player}`);

      const gameMode = await redis.hget(playerGameModesKey, player);

      await fetch(
        playerInfo.data['Game mode'] === gameMode
          ? `${clientConstants.temple.baseUrl}/php/add_datapoint.php?player=${player}`
          : `${clientConstants.temple.baseUrl}/player-tools/getgamemode.php?username=${player}`,
      );

      await redis.hset(playerGameModesKey, {
        [player]: playerInfo.data['Game mode'],
      });
    }

    // Purge the cache to display the latest member data
    revalidatePath('/');

    return NextResponse.json({ success: true });
  } catch (error) {
    Sentry.captureException(error);

    return NextResponse.json({ success: false });
  }
}
