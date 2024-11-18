'use server';

import { userDraftRankSubmissionKey } from '@/config/redis';
import { redis } from '@/redis';
import { authActionClient } from '@/app/safe-action';
import { RankCalculatorSchema } from './submit-rank-calculator-validation';

export const saveDraftRankSubmissionAction = authActionClient
  .metadata({
    actionName: 'save-draft-rank-submission',
  })
  .schema(RankCalculatorSchema)
  .action(
    async ({ parsedInput: { rank, points, ...data }, ctx: { userId } }) => {
      const result = await redis.json.set(
        userDraftRankSubmissionKey(userId, data.playerName),
        '$',
        data,
      );

      return {
        success: !!result,
      };
    },
  );
