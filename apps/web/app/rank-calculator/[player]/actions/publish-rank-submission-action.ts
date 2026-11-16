'use server';

import { z } from 'zod';
import { initORM } from '@/database/db';
import { DraftRankSubmission } from '@/database/entities/draft-rank-submission.entity';
import { authActionClient } from '@/app/safe-action';

import { Rank } from '@/config/enums';
import { PlayerName } from '@/app/schemas/player';
import { ActionError } from '@/app/action-error';

import { fetchPlayerDetails } from '../../data-sources/fetch-player-details/fetch-player-details';

import { submitRankApplication } from '@/app/_utilities/submit-rank-application';

export const publishRankSubmissionAction = authActionClient
  .metadata({ actionName: 'publish-rank-submission' })
  .bindArgsSchemas<
    [currentRank: z.ZodOptional<typeof Rank>, playerName: typeof PlayerName]
  >([Rank.optional(), PlayerName])
  .inputSchema(z.object({ rank: Rank, totalPoints: z.number().nonnegative() }))
  .action(
    async ({
      ctx: { userId },
      bindArgsParsedInputs: [currentRank, playerName],
      parsedInput: { totalPoints, rank },
    }) => {
      if (rank === currentRank) {
        throw new ActionError('You already have this rank!');
      }

      const { em } = await initORM();
      const draft = await em.findOne(DraftRankSubmission, {
        osrsAccount: { user: userId, name: playerName },
      });

      if (!draft) {
        throw new ActionError('No saved data!');
      }

      const { data: savedData, osrsAccount } = draft;

      const playerDetails = await fetchPlayerDetails(playerName, userId, false);

      if (!playerDetails.success) {
        throw new Error(
          'Failed to retrieve player details. Please try again later.',
        );
      }

      const {
        data: { collectionLogTotal },
      } = playerDetails;

      if (savedData.collectionLogTotal < collectionLogTotal) {
        throw new ActionError(
          'The in-game collection log has been updated since your last save. Please refresh the page and try again.',
        );
      }

      await submitRankApplication(
        em,
        osrsAccount,
        { userId, playerName, rank, totalPoints, savedData },
        playerDetails.data,
        false
      );

      return { success: true };
    },
  );
