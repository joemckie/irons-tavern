import { calculateMaximumSkillingPoints } from './calculate-maximum-skilling-points';

export function calculateSkillingPoints(
  achievementDiaryPoints: number,
  ehpPoints: number,
  totalLevelPoints: number,
  achievementDiaryCapePoints: number,
  maxCapePoints: number,
  multiplier: number,
  scaling: number,
) {
  const totalPointsAvailable = calculateMaximumSkillingPoints(scaling);

  const pointsAwarded = Math.min(
    Math.floor(
      (achievementDiaryPoints +
        totalLevelPoints +
        achievementDiaryCapePoints +
        maxCapePoints) *
        multiplier,
    ),
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
