import { CommonPointCalculatorData } from '@/types/rank-calculator';

export interface CollectionLogPointCalculatorData
  extends CommonPointCalculatorData {
  collectionLogSlotPoints: number;
}

export function useCollectionLogPointCalculator() {
  return {
    pointsAwarded: 0,
    pointsAwardedPercentage: 0,
    pointsRemaining: 0,
    collectionLogSlotPoints: 0,
  } satisfies CollectionLogPointCalculatorData;
}
