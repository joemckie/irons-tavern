'use server';

import { initORM } from '@/database/db';
import { OSRSAccount } from '@/database/entities/osrs-account';
import * as Sentry from '@sentry/nextjs';

export async function assertUniquePlayerRecord(
  userId: string,
  playerName: string,
) {
  if (!userId) {
    return false;
  }

  try {
    const { em } = await initORM();
    const count = await em.count(OSRSAccount, {
      user: userId,
      name: playerName,
    });

    return count === 0;
  } catch (error) {
    Sentry.captureException(error);

    return false;
  }
}
