import { Rank } from '@/config/enums';
import { calculateRankThresholds } from '@/app/rank-calculator/utils/calculate-rank-thresholds';
import { RankStructure } from '@/app/schemas/rank-calculator';
import type { ItemCategory } from '@/app/schemas/items';

export interface RankData {
  rank: Rank;
  nextRank: Rank | null;
}

export function calculateRank(
  pointsAwarded: number,
  rankStructure: RankStructure,
  totalCollectionLogSlots: number,
  notableItems: [string, ItemCategory][],
): RankData {
  const rankThresholds = calculateRankThresholds(
    totalCollectionLogSlots,
    notableItems,
  );
  const rankData = Object.entries(rankThresholds[rankStructure]) as [
    Rank,
    number,
  ][];

  const [[initialRank]] = rankData;

  return rankData.reduceRight<RankData>(
    (acc, [rank, threshold], i) => {
      if (acc.rank === initialRank && pointsAwarded >= threshold) {
        const [nextRank] = rankData[i + 1] ?? [];

        return { rank, nextRank: nextRank ?? null };
      }

      return acc;
    },
    { rank: initialRank, nextRank: null },
  );
}
