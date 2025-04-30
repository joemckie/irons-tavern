import { calculateMaximumSkillingPoints } from './calculate-maximum-skilling-points';

export function calculateSkillingPoints(
  achievementDiaryPoints: number,
  ehpPoints: number,
  totalLevelPoints: number,
  achievementDiaryCapePoints: number,
  maxCapePoints: number,
  scaling: number,
) {
  const totalPointsAvailable = calculateMaximumSkillingPoints(scaling);

  const pointsAwarded = Math.min(
    achievementDiaryPoints +
      totalLevelPoints +
      achievementDiaryCapePoints +
      maxCapePoints,
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
