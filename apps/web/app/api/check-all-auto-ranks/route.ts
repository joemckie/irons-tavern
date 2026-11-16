import * as Sentry from '@sentry/nextjs';
import { clientConstants } from '@/config/constants.client';
import { serverConstants } from '@/config/constants.server';
import { initORM, withRequestContext } from '@/database/db';
import { OSRSAccount } from '@/database/entities/osrs-account';
import { connection, NextResponse } from 'next/server';
import { getGroupMemberInfo } from '@/app/_utilities/get-group-member-info';

export async function GET() {
  await connection();

  try {
    const accounts = await withRequestContext(async () => {
      const { em } = await initORM();

      return em.findAll(OSRSAccount, {
        fields: ['name', 'user'],
        orderBy: { user: 'asc', name: 'asc' },
      });
    });

    const groupMemberInfo = await getGroupMemberInfo();
    const membersWithTempleClogSynced = Object.entries(groupMemberInfo.data.memberlist)
      .filter(([_, memberInfo]) => memberInfo.on_hiscores && memberInfo.clog_synced)
      .map(([memberName]) => memberName.toLowerCase());

    const accountsToCheck: (typeof accounts)[number][] = accounts.filter(({ name }) =>
      membersWithTempleClogSynced.includes(name.toLowerCase()),
    );

    let delay = 0;

    const requests = accountsToCheck.map(({ name: player, user: { discordId } }) => {
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

      return { url, method: 'GET' };
    });

    const queueResponse = await fetch(
      `${serverConstants.zeplo.url}/bulk?_token=${serverConstants.zeplo.apiKey}`,
      { method: 'POST', body: JSON.stringify(requests) },
    );

    return NextResponse.json({ success: queueResponse.ok });
  } catch (error) {
    Sentry.captureException(error);

    return NextResponse.json({ success: false });
  }
}
