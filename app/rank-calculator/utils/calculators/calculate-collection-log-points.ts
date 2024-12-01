import { calculateCollectionLogSlotPoints } from './calculate-collection-log-slot-points';

export function calculateCollectionLogPoints(
  collectionLogSlotPoints: number,
  totalCollectionLogSlots: number,
  scaling: number,
) {
  const totalPointsAvailable = calculateCollectionLogSlotPoints(
    totalCollectionLogSlots,
    scaling,
  );
  const pointsAwarded = Math.min(collectionLogSlotPoints, totalPointsAvailable);
  const pointsRemaining = totalPointsAvailable - pointsAwarded;
  const pointsAwardedPercentage = pointsAwarded / totalPointsAvailable;

  return {
    pointsAwarded,
    pointsRemaining,
    pointsAwardedPercentage,
  };
}
