import { standardRankIndices, type StandardRank } from '@/config/ranks';

/** EHB and EHP calculations are the same for now, so we use a generic EHX calculation */
export function calculateExpectedEHX(rank: StandardRank) {
  const maxEHX = 2000;
  const [startRank, endRank] = [
    standardRankIndices.Adamant,
    standardRankIndices.Beast,
  ] as const;
  const rankIndex = standardRankIndices[rank];

  if (rankIndex < startRank) {
    return 0;
  }

  const input = rankIndex - startRank + 1;
  const range = endRank - startRank + 1;

  return (maxEHX / range ** 2) * input ** 2;
}
