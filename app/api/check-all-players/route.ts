import { NextResponse } from 'next/server';
import { differenceInDays } from 'date-fns';
import { clientConstants } from '@/config/constants.client';
import { serverConstants } from '@/config/constants.server';
import { redis } from '@/redis';
import { playerGameModesKey } from '@/config/redis';
import { CheckMethod } from '@/app/schemas/inactivity-checker';
import { TempleOSRSGroupMemberInfo } from '@/app/schemas/temple-api';

export const dynamic = 'force-dynamic';

export async function GET() {
  const response = await fetch(
    `${clientConstants.temple.baseUrl}/api/group_member_info.php?id=${serverConstants.temple.groupId}`,
  );
  const players = TempleOSRSGroupMemberInfo.parse(await response.json());
  const playerGameModes = (await redis.hgetall(playerGameModesKey)) ?? {};

  // Filter players that have been checked within the last day.
  // This reduces the amount of requests significantly, due to
  // players using the XP Updater plugin on RuneLite.
  // Also filter players not on hiscores as these cannot be checked.
  const filteredPlayers = Object.values(players.data.memberlist).filter(
    ({ on_hiscores: onHiscores, last_checked: lastChecked }) =>
      onHiscores && differenceInDays(Date.now(), lastChecked) > 1,
  );

  // Temple bugs out when a player switches game mode
  // (e.g. when a HCIM dies, they go from HCIM to IM)
  // We need to split the requests out to check these separately.
  // The check game mode endpoint is much more rate limited
  // And can only be called once per minute.
  const { dataPointMembers, getGameModeMembers } = filteredPlayers.reduce(
    (acc, { game_mode: gameMode, player }) => {
      if (playerGameModes[player.toLowerCase()] !== gameMode) {
        return {
          ...acc,
          getGameModeMembers: acc.getGameModeMembers.concat(player),
        };
      }

      return {
        ...acc,
        dataPointMembers: acc.dataPointMembers.concat(player),
      };
    },
    {
      dataPointMembers: [] as string[],
      getGameModeMembers: [] as string[],
    },
  );

  const dataPointRateLimitSeconds = 6;
  const getGameModeRateLimitSeconds = 60;

  const datapointRequests = dataPointMembers.map((player, i) => {
    const url = new URL(`${clientConstants.publicUrl}/api/check-player`);

    url.searchParams.append('player', player);
    url.searchParams.append('check_method', CheckMethod.enum.datapoint);
    url.searchParams.append(
      // Temple's API is rate limited to 10 requests per minute for datapoint endpoints,
      // so we need to wait for six seconds before checking the next player
      '_delay',
      (i * dataPointRateLimitSeconds).toFixed(0),
    );

    return {
      url,
      method: 'GET',
    };
  });

  const getGameModeRequests = getGameModeMembers.map((player, i) => {
    const url = new URL(`${clientConstants.publicUrl}/api/check-player`);

    url.searchParams.append('player', player);
    url.searchParams.append('check_method', CheckMethod.enum['get-game-mode']);
    url.searchParams.append(
      // Temple's API is rate limited to 1 request per minute for the check game mode endpoint,
      // so we need to wait for sixty seconds before checking the next player
      '_delay',
      (
        datapointRequests.length * dataPointRateLimitSeconds +
        i * getGameModeRateLimitSeconds
      ).toFixed(0),
    );

    return {
      url,
      method: 'GET',
    };
  });

  const queueResponse = await fetch(
    `${serverConstants.zeplo.url}/bulk?_token=${serverConstants.zeplo.apiKey}`,
    {
      method: 'POST',
      body: JSON.stringify([...datapointRequests, ...getGameModeRequests]),
    },
  );

  return NextResponse.json({ success: queueResponse.ok });
}
