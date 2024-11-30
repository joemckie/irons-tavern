import { NextResponse } from 'next/server';
import { differenceInDays } from 'date-fns';
import { clientConstants } from '@/config/constants.client';
import { serverConstants } from '@/config/constants.server';
import { GroupMemberInfoResponse } from '@/app/schemas/temple-api';

export const dynamic = 'force-dynamic';

export async function GET() {
  const response = await fetch(
    `${clientConstants.temple.baseUrl}/api/group_member_info.php?id=${serverConstants.temple.groupId}`,
  );
  const players: GroupMemberInfoResponse = await response.json();

  // Filter players that have been checked within the last day.
  // This reduces the amount of requests significantly, due to
  // players using the XP Updater plugin on RuneLite.
  // Also filter players not on hiscores as these cannot be checked.
  const filteredPlayers = Object.values(players.data.memberlist).filter(
    (player) =>
      player.on_hiscores &&
      differenceInDays(Date.now(), player.last_checked) > 1,
  );

  const requests = filteredPlayers.map((player, i) => ({
    // Temple's API is rate limited to 10 requests per minute for datapoint endpoints,
    // so we need to wait for six seconds before checking the next player
    url: `${clientConstants.publicUrl}/api/check-player?player=${encodeURI(player.player)}&_delay=${i * 6}`,
    method: 'GET',
  }));

  console.log('Sending requests to Zeplo');

  const queueResponse = await fetch(
    `${serverConstants.zeplo.url}/bulk?_token=${serverConstants.zeplo.apiKey}`,
    {
      method: 'POST',
      body: JSON.stringify(requests),
    },
  );

  return NextResponse.json({ success: queueResponse.ok });
}
