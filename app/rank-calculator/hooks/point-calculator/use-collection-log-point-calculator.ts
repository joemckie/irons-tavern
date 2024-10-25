import { CategoryPointCalculatorData } from '@/types/rank-calculator';

export function useCollectionLogPointCalculator() {
  return {
    pointsAwarded: 0,
    pointsAwardedPercentage: 0,
    pointsRemaining: 0,
    collectionLogSlotPoints: 0,
  } satisfies CategoryPointCalculatorData;
}
