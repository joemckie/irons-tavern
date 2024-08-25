import { NextRequest, NextResponse } from 'next/server';
import { constants } from '@/config/constants';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const { player } = await request.json();

  console.log(`Checking ${player}`);

  try {
    await fetch(
      `${constants.temple.baseUrl}/php/add_datapoint.php?player=${player}`,
    );

    // Purge the cache to display the latest member data
    revalidatePath('/');

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);

    return NextResponse.json({ success: false });
  }
}
