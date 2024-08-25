import { NextRequest, NextResponse } from 'next/server';
import { constants } from '@/config/constants';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

function sleep(duration: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, duration);
  });
}

export async function POST(request: NextRequest) {
  const { players }: { players: string[] } = await request.json();
  const player = players.shift();

  console.log(`Checking ${player}`);

  try {
    await fetch(
      `${constants.temple.baseUrl}/php/add_datapoint.php?player=${player}`,
    );

    if (players.length) {
      await sleep(6000);

      fetch(`${constants.publicUrl}/api/check-player`, {
        method: 'POST',
        body: JSON.stringify({
          players,
        }),
      });
    }

    // Purge the cache to display the latest member data
    revalidatePath('/');

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);

    return NextResponse.json({ success: false });
  }
}
