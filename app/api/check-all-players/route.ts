import { NextResponse } from 'next/server';
import { throttleAll } from 'promise-throttle-all';
import { templeBaseUrl, groupId } from '@/config/constants.json';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

function sleep(duration: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, duration);
  });
}

export async function GET() {
  const response = await fetch(
    `${templeBaseUrl}/api/groupmembers.php?id=${groupId}`,
  );
  const members: string[] = await response.json();

  await throttleAll<any>(
    1,
    members.flatMap((member) => [
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
    ]),
  );

  revalidatePath('/');

  return NextResponse.json({ success: true });
}
