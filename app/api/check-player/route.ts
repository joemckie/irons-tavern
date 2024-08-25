import { NextRequest, NextResponse } from 'next/server';
import { constants } from '@/config/constants';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

interface PlayerInfo {
  data: {
    'Datapoint Cooldown': string | number;
  };
}

export async function POST(request: NextRequest) {
  const { player }: { player: string } = await request.json();
  const playerInfoRequest = await fetch(
    `${constants.temple.baseUrl}/api/player_info.php?player=${player}`,
  );
  const playerInfo: PlayerInfo = await playerInfoRequest.json();
  const shouldCheckPlayer = playerInfo.data['Datapoint Cooldown'] === '-';

  try {
    // If the player has a datapoint cooldown (i.e. a number),
    // this means they have been checked very recently,
    // hence we skip these players entirely to avoid triggering rate limits.
    if (shouldCheckPlayer) {
      console.log(`Checking ${player}`);

      await fetch(
        `${constants.temple.baseUrl}/php/add_datapoint.php?player=${player}`,
      );
    }

    // Purge the cache to display the latest member data
    revalidatePath('/');

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);

    return NextResponse.json({ success: false });
  }
}
