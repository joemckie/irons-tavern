'use server';

import { authActionClient } from '@/app/safe-action';
import { ActionError } from '@/app/action-error';
import { initORM } from '@/database/db';
import { OSRSAccount } from '@/database/entities/osrs-account';
import { DraftRankSubmission } from '@/database/entities/draft-rank-submission.entity';
import { RankCalculatorSchema } from '../submit-rank-calculator-validation';

export const saveDraftRankSubmissionAction = authActionClient
  .metadata({ actionName: 'save-draft-rank-submission' })
  .inputSchema(RankCalculatorSchema.omit({ rank: true, points: true }))
  .action(async ({ parsedInput: data, ctx: { userId } }) => {
    const { em } = await initORM();
    const account = await em.findOne(OSRSAccount, {
      user: userId,
      name: data.playerName,
    });

    if (!account) {
      throw new ActionError('Unable to find player record');
    }

    await em.upsert(DraftRankSubmission, { osrsAccount: account, data });

    return { success: true };
  });
