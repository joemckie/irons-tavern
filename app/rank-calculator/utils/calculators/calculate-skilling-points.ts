import { calculateMaximumSkillingPoints } from './calculate-maximum-skilling-points';

export function calculateSkillingPoints(
  achievementDiaryPoints: number,
  ehpPoints: number,
  totalLevelPoints: number,
  scaling: number,
) {
  const totalPointsAvailable = calculateMaximumSkillingPoints(scaling);

  const pointsAwarded = Math.min(
    achievementDiaryPoints + totalLevelPoints,
    totalPointsAvailable,
  );
  const pointsRemaining = totalPointsAvailable - pointsAwarded;
  const pointsAwardedPercentage = pointsAwarded / totalPointsAvailable;

  return {
    pointsAwarded: pointsAwarded + ehpPoints,
    pointsAwardedPercentage,
    pointsRemaining,
  };
}
