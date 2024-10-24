import { CategoryPointCalculatorData } from '@/types/rank-calculator';

export function useCollectionLogPointCalculator() {
  return {
    availablePoints: 0,
    pointsAwarded: 0,
    pointsAwardedPercentage: 0,
    collectionLogSlotPoints: 0,
  } satisfies CategoryPointCalculatorData;
}
