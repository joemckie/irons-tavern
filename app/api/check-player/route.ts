import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { clientConstants } from '@/config/constants.client';
import * as Sentry from '@sentry/nextjs';
import { redis } from '@/redis';
import { playerGameModesKey } from '@/config/redis';
import { CheckMethod } from '@/app/schemas/inactivity-checker';
import { TempleOSRSPlayerInfo } from '@/app/schemas/temple-api';

export const dynamic = 'force-dynamic';

async function getPlayerInfo(player: string) {
  const response = await fetch(
    `${clientConstants.temple.baseUrl}/api/player_info.php?player=${player}`,
  );

  return TempleOSRSPlayerInfo.parse(await response.json());
}

export async function GET(request: NextRequest) {
  const player = request.nextUrl.searchParams.get('player');
  const checkMethod = CheckMethod.parse(
    request.nextUrl.searchParams.get('check_method'),
  );

  if (!player) {
    throw new Error('No player provided');
  }

  const playerInfo = await getPlayerInfo(player);
  const shouldCheckPlayer = playerInfo.data['Datapoint Cooldown'] === '-';

  try {
    // If the player has a datapoint cool-down (i.e. a number),
    // this means they have been checked very recently and cannot be checked again
    if (shouldCheckPlayer) {
      // eslint-disable-next-line no-console
      console.log(`Checking ${player} using ${checkMethod} method`);

      const urls = {
        [CheckMethod.enum.datapoint]:
          `${clientConstants.temple.baseUrl}/php/add_datapoint.php?player=${player}`,
        [CheckMethod.enum['get-game-mode']]:
          `${clientConstants.temple.baseUrl}/player-tools/getgamemode.php?username=${player}`,
      };

      await fetch(urls[checkMethod]);

      // If the game mode required an update, attempt to get the latest version and save it
      if (checkMethod === 'get-game-mode') {
        const updatedPlayerInfo = await getPlayerInfo(player);

        await redis.hset(playerGameModesKey, {
          [decodeURIComponent(player).toLowerCase()]:
            updatedPlayerInfo.data['Game mode'],
        });
      }
    }

    // Purge the cache to display the latest member data
    revalidatePath('/');

    return NextResponse.json({ success: true });
  } catch (error) {
    Sentry.captureException(error);

    return NextResponse.json({ success: false });
  }
}
