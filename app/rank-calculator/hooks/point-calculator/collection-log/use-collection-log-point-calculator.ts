import { CommonPointCalculatorData } from '@/types/rank-calculator';
import { useMaxCollectionLogPoints } from './use-max-collection-log-points';
import { useCollectionLogSlotPoints } from './use-collection-log-slot-points';

export interface CollectionLogPointCalculatorData
  extends CommonPointCalculatorData {
  collectionLogSlotPoints: number;
}

export function useCollectionLogPointCalculator() {
  const collectionLogSlotPoints = useCollectionLogSlotPoints();
  const totalPointsAvailable = useMaxCollectionLogPoints();
  const pointsAwarded = collectionLogSlotPoints;
  const pointsRemaining = totalPointsAvailable - collectionLogSlotPoints;
  const pointsAwardedPercentage =
    (collectionLogSlotPoints / totalPointsAvailable) * 100;

  return {
    pointsAwarded,
    pointsAwardedPercentage,
    pointsRemaining,
    collectionLogSlotPoints,
  } satisfies CollectionLogPointCalculatorData;
}
