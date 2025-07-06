import type { RankStructure } from '@/app/schemas/rank-calculator';
import { rankStructureTiers, StaffRank, staffRankTypes } from '@/config/ranks';

export function userRankOutranksSubmissionRankStructure(
  userRank: StaffRank,
  submittedRankStructure: RankStructure,
) {
  const userRankTier = rankStructureTiers[staffRankTypes[userRank]];
  const submittedRankTier = rankStructureTiers[submittedRankStructure];

  return submittedRankTier < userRankTier;
}
