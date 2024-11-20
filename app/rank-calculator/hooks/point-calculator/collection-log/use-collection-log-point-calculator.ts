import { CommonPointCalculatorData } from '@/app/schemas/rank-calculator';
import { useMaxCollectionLogPoints } from './use-max-collection-log-points';
import { useCollectionLogSlotPoints } from './use-collection-log-slot-points';

export interface CollectionLogPointCalculatorData
  extends CommonPointCalculatorData {
  collectionLogSlotPoints: number;
}

export function useCollectionLogPointCalculator() {
  const collectionLogSlotPoints = useCollectionLogSlotPoints();
  const totalPointsAvailable = useMaxCollectionLogPoints();
  const pointsAwarded = Math.min(collectionLogSlotPoints, totalPointsAvailable);
  const pointsRemaining = totalPointsAvailable - pointsAwarded;
  const pointsAwardedPercentage = pointsAwarded / totalPointsAvailable;

  return {
    pointsAwarded,
    pointsAwardedPercentage,
    pointsRemaining,
    collectionLogSlotPoints,
  } satisfies CollectionLogPointCalculatorData;
}
