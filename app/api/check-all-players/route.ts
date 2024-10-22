import { NextResponse } from 'next/server';
import { differenceInDays } from 'date-fns';
import { constants } from '@/config/constants';
import { GroupMemberInfoResponse } from '@/types/temple-api';

export const dynamic = 'force-dynamic';

export async function POST() {
  const response = await fetch(
    `${constants.temple.baseUrl}/api/group_member_info.php?id=${constants.temple.groupId}`,
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
    url: `${constants.temple.baseUrl}/php/add_datapoint.php?player=${encodeURI(player.player)}&_delay=${i * 6}`,
    method: 'GET',
  }));

  // After all checks have been completed, clear the cache to ensure the new data is displayed
  requests.push({
    url: `${constants.publicUrl}/api/revalidate-path?path=/&_delay=${requests.length * 6}`,
    method: 'GET',
  });

  console.log(requests);

  const queueResponse = await fetch(
    `${constants.zeplo.url}/bulk?_token=${constants.zeplo.apiKey}`,
    {
      method: 'POST',
      body: JSON.stringify(requests),
    },
  );

  return NextResponse.json({ success: queueResponse.ok });
}
