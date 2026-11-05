import { standardRankIndices, type StandardRank } from '@/config/ranks';

export const createPointsMultiplierCalculator =
  (
    factor: number,
    startRankName: StandardRank,
    endRankName: StandardRank = 'Beast',
  ) =>
  (rank: StandardRank) => {
    const [startRank, endRank] = [
      standardRankIndices[startRankName],
      standardRankIndices[endRankName],
    ] as const;
    const rankIndex = standardRankIndices[rank];

    if (rankIndex < startRank) {
      return 1;
    }

    const input = rankIndex - startRank + 1;
    const range = endRank - startRank + 1;
    const coefficient = factor / range ** 2;

    return 1 + (coefficient * input ** 2) / 100;
  };
