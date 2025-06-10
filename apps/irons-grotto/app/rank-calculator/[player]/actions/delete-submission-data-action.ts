'use server';

import { z } from 'zod';
import { userDraftRankSubmissionKey } from '@/config/redis';
import { redis } from '@/redis';
import { authActionClient } from '@/app/safe-action';
import { PlayerName } from '@/app/schemas/player';
import { revalidatePath } from 'next/cache';
import { ActionError } from '@/app/action-error';
import { fetchPlayerDetails } from '../../data-sources/fetch-player-details/fetch-player-details';

export const deleteSubmissionDataAction = authActionClient
  .metadata({ actionName: 'delete-submission-data' })
  .schema(z.object({ playerName: PlayerName }))
  .action(async ({ parsedInput: { playerName }, ctx: { userId } }) => {
    const result = await redis.del(
      userDraftRankSubmissionKey(userId, playerName),
    );

    if (!result) {
      throw new ActionError('No data found!');
    }

    revalidatePath(`/rank-calculator/${playerName.toLowerCase()}`);

    // Return fresh player details with which to reset the form
    return fetchPlayerDetails(playerName, userId);
  });
