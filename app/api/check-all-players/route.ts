import { NextResponse } from 'next/server';
import { constants } from '@/config/constants';

export const dynamic = 'force-dynamic';

export async function POST() {
  const response = await fetch(
    `${constants.temple.baseUrl}/api/groupmembers.php?id=${constants.temple.groupId}`,
  );
  const players: string[] = await response.json();

  // Temple's API is rate limited to 10 requests per minute for datapoint endpoints,
  // so we need to wait for six seconds before checking the next player
  let delay = 0;

  players.forEach((player) => {
    fetch(
      `https://zeplo.to/${constants.temple.baseUrl}/php/add_datapoint.php?player=${player}?token=${constants.zeploApiKey}&delay=${delay}`,
    );

    delay += 6;
  });

  return NextResponse.json({ success: true });
}
