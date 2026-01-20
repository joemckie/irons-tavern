'use server';

import { userDraftRankSubmissionKey } from '@/config/redis';
import { redis } from '@/redis';
import { authActionClient } from '@/app/safe-action';
import { RankCalculatorSchema } from '../submit-rank-calculator-validation';

export const saveDraftRankSubmissionAction = authActionClient
  .metadata({ actionName: 'save-draft-rank-submission' })
  .inputSchema(RankCalculatorSchema.omit({ rank: true, points: true }))
  .action(async ({ parsedInput: data, ctx: { userId } }) => {
    console.log('Saving draft rank submission for user:', userId);

    const result = await redis.json.set(
      userDraftRankSubmissionKey(userId, data.playerName),
      '$',
      data,
    );

    console.log('Draft rank submission saved:', result);

    return { success: !!result };
  });
