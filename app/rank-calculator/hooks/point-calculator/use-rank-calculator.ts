import { Rank } from '@/config/enums';
import { CategoryPointCalculatorData } from '@/types/rank-calculator';

export function useRankCalculator() {
  return {
    pointsAwarded: 0,
    pointsAwardedPercentage: 0,
    pointsRemaining: 0,
    rank: Rank.Air,
    nextRank: Rank.Pine,
  } satisfies CategoryPointCalculatorData;
}
