import { CategoryPointCalculatorData } from '@/types/rank-calculator';

export function useRankCalculator() {
  return {
    pointsAwarded: 0,
    pointsAwardedPercentage: 0,
    availablePoints: 0,
    rank: 'Warlock',
    nextRank: 'Dragonstone',
  } satisfies CategoryPointCalculatorData;
}
