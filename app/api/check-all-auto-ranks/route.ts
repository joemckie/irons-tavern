import { clientConstants } from '@/config/constants.client';
import { serverConstants } from '@/config/constants.server';
import { userOSRSAccountsKey } from '@/config/redis';
import { redis } from '@/redis';
import { NextResponse } from 'next/server';

export async function GET() {
  const [, allAccountKeys] = await redis.scan(0, {
    count: 100000,
    match: userOSRSAccountsKey('*'),
    type: 'hash',
  });

  const playerDetails = await Promise.all(
    allAccountKeys.map(async (key) => {
      const matches = /^user:([0-9]+):osrs-accounts$/.exec(key);

      if (!matches) {
        throw new Error('Invalid key provided. Unable to extract Discord ID!');
      }

      const [, discordId] = matches;
      const players = await redis.hkeys(key);

      return {
        discordId,
        players,
      };
    }),
  );

  let delay = 0;

  const requests = playerDetails.flatMap(({ discordId, players }) =>
    players.map((player) => {
      const url = new URL(`${clientConstants.publicUrl}/api/check-auto-rank`);

      url.searchParams.append('player', player);
      url.searchParams.append('discord_id', discordId);
      url.searchParams.append(
        // Temple's API is rate limited to 10 requests per minute for datapoint endpoints,
        // so we need to wait for six seconds before checking the next player
        '_delay',
        delay.toFixed(0),
      );

      delay += 6;

      return {
        url,
        method: 'GET',
      };
    }),
  );

  const queueResponse = await fetch(
    `${serverConstants.zeplo.url}/bulk?_token=${serverConstants.zeplo.apiKey}`,
    {
      method: 'POST',
      body: JSON.stringify(requests),
    },
  );

  return NextResponse.json({ success: queueResponse.ok });
}
