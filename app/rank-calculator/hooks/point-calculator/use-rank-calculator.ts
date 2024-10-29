import { Rank } from '@/config/enums';
import { CommonPointCalculatorData } from '@/types/rank-calculator';
import { useCollectionLogPointCalculator } from './use-collection-log-point-calculator';
import { useNotableItemsPointCalculator } from './use-notable-items-point-calculator';

export interface RankCalculatorData extends CommonPointCalculatorData {
  rank: Rank;
  nextRank: Rank;
}

export function useRankCalculator() {
  const { pointsAwarded: totalCollectionLogPoints } =
    useCollectionLogPointCalculator();
  const { pointsAwarded: totalNotableItemsPoints } =
    useNotableItemsPointCalculator();
  const pointsAwarded = totalCollectionLogPoints + totalNotableItemsPoints;

  return {
    pointsAwarded,
    pointsAwardedPercentage: 0,
    pointsRemaining: 0,
    rank: Rank.Air,
    nextRank: Rank.Pine,
  } satisfies RankCalculatorData;
}
