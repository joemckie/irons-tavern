import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { constants } from '@/config/constants';
import { PlayerInfoResponse } from '@/types/temple-api';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const player = request.nextUrl.searchParams.get('player');

  if (!player) {
    throw new Error('No player provided');
  }

  const playerInfoRequest = await fetch(
    `${constants.temple.baseUrl}/api/player_info.php?player=${player}`,
  );
  const playerInfo: PlayerInfoResponse = await playerInfoRequest.json();
  const shouldCheckPlayer = playerInfo.data['Datapoint Cooldown'] === '-';

  try {
    // If the player has a datapoint cooldown (i.e. a number),
    // this means they have been checked very recently,
    // hence we skip these players entirely to avoid triggering rate limits.
    if (shouldCheckPlayer) {
      // eslint-disable-next-line no-console
      console.log(`Checking ${player}`);

      await fetch(
        `${constants.temple.baseUrl}/php/add_datapoint.php?player=${player}`,
      );
    }

    // Purge the cache to display the latest member data
    revalidatePath('/');

    return NextResponse.json({ success: true });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);

    return NextResponse.json({ success: false });
  }
}
