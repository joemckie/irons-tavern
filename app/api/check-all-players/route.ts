import { NextResponse } from 'next/server';
import { throttleAll } from 'promise-throttle-all';
import { constants } from '@/config/constants';

export const dynamic = 'force-dynamic';

function sleep(duration: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, duration);
  });
}

export async function POST() {
  const response = await fetch(
    `${constants.temple.baseUrl}/api/groupmembers.php?id=${constants.temple.groupId}`,
  );
  const members: string[] = await response.json();

  // Temple rate limits at 10 requests per minute for datapoint endpoints
  // So we send a request then wait 6 seconds before making another
  // The last sleep is ignored as there will be no subsequent requests
  await throttleAll<unknown>(
    1,
    [members[0]]
      .flatMap((member) => [
        async () => {
          await fetch(`${constants.publicUrl}/api/check-player`, {
            method: 'POST',
            body: JSON.stringify({
              player: member,
            }),
          });

          return response.ok;
        },
        () => sleep(6000),
      ])
      .slice(0, -1),
  );

  return NextResponse.json({ success: true });
}
