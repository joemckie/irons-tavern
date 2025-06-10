import { calculateBonusPoints } from './calculate-bonus-points';
import { calculateCollectionLogSlotPoints } from './calculate-collection-log-slot-points';

export function calculateCollectionLogPoints(
  collectionLogSlotPoints: number,
  totalCollectionLogSlots: number,
  multiplier: number,
  scaling: number,
) {
  const totalPointsAvailable = calculateCollectionLogSlotPoints(
    totalCollectionLogSlots,
    scaling,
  );
  const pointsAwarded = Math.min(collectionLogSlotPoints, totalPointsAvailable);
  const bonusPointsAwarded = calculateBonusPoints(pointsAwarded, multiplier);
  const pointsRemaining = totalPointsAvailable - pointsAwarded;
  const pointsAwardedPercentage = pointsAwarded / totalPointsAvailable;

  return {
    pointsAwarded: Math.floor(pointsAwarded + bonusPointsAwarded),
    pointsRemaining,
    pointsAwardedPercentage,
    bonusPointsAwarded: Math.floor(bonusPointsAwarded),
  };
}
