import { NextResponse } from 'next/server';
import { constants } from '@/config/constants';

export const dynamic = 'force-dynamic';

export async function POST() {
  const response = await fetch(
    `${constants.temple.baseUrl}/api/groupmembers.php?id=${constants.temple.groupId}`,
  );
  const players: string[] = await response.json();

  const requests = players.slice(0, 10).map((player, i) => ({
    // Temple's API is rate limited to 10 requests per minute for datapoint endpoints,
    // so we need to wait for six seconds before checking the next player
    url: `${constants.temple.baseUrl}/php/add_datapoint.php?player=${encodeURI(player)}&_delay=${i * 6}`,
    method: 'GET',
  }));

  const queueResponse = await fetch(
    `${constants.zeplo.url}/bulk?_token=${constants.zeplo.apiKey}`,
    {
      method: 'POST',
      body: JSON.stringify(requests),
    },
  );

  return NextResponse.json({ success: queueResponse.ok });
}
