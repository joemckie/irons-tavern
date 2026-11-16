'use server';

import { revalidatePath } from 'next/cache';
import { authActionClient } from '@/app/safe-action';
import { initORM } from '@/database/db';
import { OSRSAccount } from '@/database/entities/osrs-account';
import { z } from 'zod';

export const deletePlayerAccountAction = authActionClient
  .metadata({ actionName: 'delete-player-account' })
  .inputSchema(z.string())
  .action(async ({ parsedInput: playerName, ctx: { userId } }) => {
    const { em } = await initORM();

    // The draft submission is deleted by cascade,
    // and published submissions are kept but unlinked from the account
    await em.nativeDelete(OSRSAccount, { user: userId, name: playerName });

    revalidatePath('/rank-calculator');
  });
