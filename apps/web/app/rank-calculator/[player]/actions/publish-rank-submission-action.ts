'use server';

import { z } from 'zod';
import { userDraftRankSubmissionKey } from '@/config/redis';

import { redis } from '@/redis';
import { authActionClient } from '@/app/safe-action';

import { Rank } from '@/config/enums';
import { PlayerName } from '@/app/schemas/player';
import { ActionError } from '@/app/action-error';

import { fetchPlayerDetails } from '../../data-sources/fetch-player-details/fetch-player-details';
import { RankCalculatorSchema } from '../submit-rank-calculator-validation';
import { submitRankApplication } from './_utilities/submit-rank-application';

export const publishRankSubmissionAction = authActionClient
  .metadata({ actionName: 'publish-rank-submission' })
  .bindArgsSchemas([Rank.optional(), PlayerName])
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

      const savedData = await redis.json.get<RankCalculatorSchema>(
        userDraftRankSubmissionKey(userId, playerName),
      );

      if (!savedData) {
        throw new ActionError('No saved data!');
      }

      const playerDetails = await fetchPlayerDetails(playerName, userId, false);

      if (!playerDetails.success) {
        throw new Error(
          'Failed to retrieve player details. Please try again later.',
        );
      }

      await submitRankApplication(
        userId,
        savedData,
        playerDetails.data,
        playerName,
        rank,
        totalPoints,
      );

      return { success: true };
    },
  );
