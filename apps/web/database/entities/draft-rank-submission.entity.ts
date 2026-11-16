import { defineEntity, p } from '@mikro-orm/core';
import type { RankSubmissionData } from './rank-submission.entity';
import { OSRSAccount } from './osrs-account';

const DraftRankSubmissionSchema = defineEntity({
  name: 'DraftRankSubmission',
  tableName: 'draft_rank_submission',
  properties: {
    osrsAccount: () =>
      p.oneToOne(OSRSAccount).owner().primary().deleteRule('cascade'),
    data: p.json<RankSubmissionData>(),
    updatedAt: p
      .datetime()
      .onCreate(() => new Date())
      .onUpdate(() => new Date()),
  },
});

export class DraftRankSubmission extends DraftRankSubmissionSchema.class {}

DraftRankSubmissionSchema.setClass(DraftRankSubmission);
