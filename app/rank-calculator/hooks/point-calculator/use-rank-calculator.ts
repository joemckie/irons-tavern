import { Rank } from '@/config/enums';
import { CommonPointCalculatorData } from '@/types/rank-calculator';

export interface RankCalculatorData extends CommonPointCalculatorData {
  rank: Rank;
  nextRank: Rank;
}

export function useRankCalculator() {
  return {
    pointsAwarded: 0,
    pointsAwardedPercentage: 0,
    pointsRemaining: 0,
    rank: Rank.Air,
    nextRank: Rank.Pine,
  } satisfies RankCalculatorData;
}
