import { NextResponse } from 'next/server';
import { constants } from '@/config/constants';
import { GroupMemberInfoResponse } from '@/types/temple-api';
import { differenceInDays } from 'date-fns';

export const dynamic = 'force-dynamic';

export async function POST() {
  const response = await fetch(
    `${constants.temple.baseUrl}/api/group_member_info.php?id=${constants.temple.groupId}`,
  );
  const players: GroupMemberInfoResponse = await response.json();

  // Filter players that have been checked within the last day.
  // This reduces the amount of requests significantly, due to
  // players using the XP Updater plugin on RuneLite
  const filteredPlayers = Object.values(players.data.memberlist).filter(
    (player) => differenceInDays(Date.now(), player.last_checked) > 1,
  );

  const requests = filteredPlayers.map((player, i) => ({
    // Temple's API is rate limited to 10 requests per minute for datapoint endpoints,
    // so we need to wait for six seconds before checking the next player
    url: `${constants.temple.baseUrl}/php/add_datapoint.php?player=${encodeURI(player.player)}&_delay=${i * 6}`,
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
