'use server';

import { userOSRSAccountsKey, userRankSubmissionsKey } from '@/config/redis';
import { revalidatePath } from 'next/cache';
import { redis } from '@/redis';
import { authActionClient } from '@/app/safe-action';
import { z } from 'zod';

export const deletePlayerAccountAction = authActionClient
  .metadata({ actionName: 'delete-player-account' })
  .schema(z.string())
  .action(async ({ parsedInput: playerName, ctx: { userId } }) => {
    await Promise.all([
      redis.del(userRankSubmissionsKey(userId, playerName)),
      redis.hdel(userOSRSAccountsKey(userId), playerName.toLowerCase()),
    ]);

    revalidatePath('/rank-calculator');
  });
