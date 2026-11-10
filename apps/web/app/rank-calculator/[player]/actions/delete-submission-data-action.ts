'use server';

import { z } from 'zod';
import { authActionClient } from '@/app/safe-action';
import { PlayerName } from '@/app/schemas/player';
import { revalidatePath } from 'next/cache';
import { ActionError } from '@/app/action-error';
import { initORM } from '@/database/db';
import { DraftRankSubmission } from '@/database/entities/draft-rank-submission.entity';
import { fetchPlayerDetails } from '../../data-sources/fetch-player-details/fetch-player-details';

export const deleteSubmissionDataAction = authActionClient
  .metadata({ actionName: 'delete-submission-data' })
  .inputSchema(z.object({ playerName: PlayerName }))
  .action(async ({ parsedInput: { playerName }, ctx: { userId } }) => {
    const { em } = await initORM();
    const draft = await em.findOne(DraftRankSubmission, {
      osrsAccount: { user: userId, name: playerName },
    });

    if (!draft) {
      throw new ActionError('No data found!');
    }

    await em.remove(draft).flush();

    revalidatePath(`/rank-calculator/${playerName.toLowerCase()}`);

    // Return fresh player details with which to reset the form
    return fetchPlayerDetails(playerName, userId);
  });
