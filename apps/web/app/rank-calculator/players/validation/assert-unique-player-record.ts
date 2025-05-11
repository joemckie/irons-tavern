'use server';

import { userOSRSAccountsKey } from '@/config/redis';
import { redis } from '@/redis';
import * as Sentry from '@sentry/nextjs';

export async function assertUniquePlayerRecord(
  userId: string,
  playerName: string,
) {
  if (!userId) {
    return false;
  }

  try {
    const count = await redis.hexists(
      userOSRSAccountsKey(userId),
      playerName.toLowerCase(),
    );

    return count === 0;
  } catch (error) {
    Sentry.captureException(error);

    return false;
  }
}
