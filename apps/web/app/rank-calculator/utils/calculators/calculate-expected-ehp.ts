import { standardRankIndices, type StandardRank } from '@/config/ranks';

export function calculateExpectedEHP(rank: StandardRank) {
  const maxEHP = 2000;
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

  return (maxEHP / range ** 2) * input ** 2;
}
