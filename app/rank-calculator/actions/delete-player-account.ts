'use server';

import { auth } from '@/auth';
import { userOSRSAccountsKey } from '@/config/redis';
import { revalidatePath } from 'next/cache';
import * as Sentry from '@sentry/nextjs';
import { redis } from '@/redis';

export async function deletePlayerAccount(playerName: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  try {
    const result = await redis.hdel(
      userOSRSAccountsKey(session.user.id),
      playerName.toLowerCase(),
    );

    if (result) {
      revalidatePath('/rank-calculator');
    }

    return result;
  } catch (error) {
    Sentry.captureException(error);

    return null;
  }
}
