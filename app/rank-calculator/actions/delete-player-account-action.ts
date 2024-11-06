'use server';

import { userOSRSAccountsKey } from '@/config/redis';
import { revalidatePath } from 'next/cache';
import { redis } from '@/redis';
import { authActionClient } from '@/app/safe-action';
import { z } from 'zod';

export const deletePlayerAccountAction = authActionClient
  .metadata({
    actionName: 'delete-player-account',
  })
  .schema(z.string())
  .action(async ({ parsedInput: playerName, ctx: { userId } }) => {
    const result = await redis.hdel(
      userOSRSAccountsKey(userId),
      playerName.toLowerCase(),
    );

    if (result) {
      revalidatePath('/rank-calculator');
    }
  });
