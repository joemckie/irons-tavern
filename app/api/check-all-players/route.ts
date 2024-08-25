import { NextResponse } from 'next/server';
import { constants } from '@/config/constants';

export const dynamic = 'force-dynamic';

export async function POST() {
  const response = await fetch(
    `${constants.temple.baseUrl}/api/groupmembers.php?id=${constants.temple.groupId}`,
  );
  const players: string[] = await response.json();

  // Temple rate limits at 10 requests per minute for datapoint endpoints
  // So we send a request then wait 6 seconds before making another
  // The last sleep is ignored as there will be no subsequent requests
  fetch(`${constants.publicUrl}/api/check-player`, {
    method: 'POST',
    body: JSON.stringify({
      players,
    }),
  });

  return NextResponse.json({ success: true });
}
