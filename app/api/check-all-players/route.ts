import { NextResponse } from 'next/server';
import { throttleAll } from 'promise-throttle-all';
import constants from '@/config/constants.json';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

function sleep(duration: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, duration);
  });
}

export async function GET() {
  const response = await fetch(
    `${constants.templeBaseUrl}/api/groupmembers.php?id=${constants.groupId}`,
  );
  const members: string[] = await response.json();

  // Temple rate limits at 10 requests per minute for datapoint endpoints
  // So we send a request then wait 6 seconds before making another
  await throttleAll<any>(
    1,
    [members[0]]
      .flatMap((member) => [
        async () => {
          console.log(`Checking ${member}`);

          await fetch(
            `${process.env.NEXT_PUBLIC_URL}/api/check-player?player=${member}`,
            {
              method: 'POST',
            },
          );

          return response.ok;
        },
        () => sleep(6000),
      ])
      .slice(0, -1),
  );

  revalidatePath('/');

  return NextResponse.json({ success: true });
}
