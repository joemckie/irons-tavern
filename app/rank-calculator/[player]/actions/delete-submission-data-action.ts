'use server';

import { z } from 'zod';
import { userDraftRankSubmissionKey } from '@/config/redis';
import { redis } from '@/redis';
import { authActionClient } from '@/app/safe-action';
import { PlayerName } from '@/app/schemas/player';
import { revalidatePath } from 'next/cache';

export const deleteSubmissionDataAction = authActionClient
  .metadata({
    actionName: 'delete-submission-data',
  })
  .schema(
    z.object({
      playerName: PlayerName,
    }),
  )
  .action(
    async ({ parsedInput: { playerName }, ctx: { userId } }) => {
      const result = await redis.del(
        userDraftRankSubmissionKey(userId, playerName),
      );

      if (result) {
        revalidatePath(`/rank-calculator/${playerName}`);

        return {
          success: true,
        };
      }

      return {
        success: false,
      };
    },
    {
      throwServerError: true,
    },
  );
