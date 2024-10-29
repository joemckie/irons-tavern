import { Rank } from '@/config/enums';
import { CommonPointCalculatorData } from '@/types/rank-calculator';
import { useCollectionLogPointCalculator } from './collection-log/use-collection-log-point-calculator';
import { useNotableItemsPointCalculator } from './notable-items/use-notable-items-point-calculator';
import { useSkillingPointCalculator } from './skilling/use-skilling-point-calculator';

export interface RankCalculatorData extends CommonPointCalculatorData {
  rank: Rank;
  nextRank: Rank;
}

export function useRankCalculator() {
  const { pointsAwarded: totalCollectionLogPoints } =
    useCollectionLogPointCalculator();
  const { pointsAwarded: totalNotableItemsPoints } =
    useNotableItemsPointCalculator();
  const { pointsAwarded: totalSkillingPoints } = useSkillingPointCalculator();
  const pointsAwarded =
    totalCollectionLogPoints + totalNotableItemsPoints + totalSkillingPoints;

  return {
    pointsAwarded,
    pointsAwardedPercentage: 0,
    pointsRemaining: 0,
    rank: Rank.Air,
    nextRank: Rank.Pine,
  } satisfies RankCalculatorData;
}
