import { CommonPointCalculatorData } from '@/app/schemas/rank-calculator';
import { calculateMaximumSkillingPoints } from './calculate-maximum-skilling-points';
import { calculateBonusPoints } from './calculate-bonus-points';

export function calculateSkillingPoints(
  achievementDiaryPoints: number,
  ehpPoints: number,
  totalLevelPoints: number,
  achievementDiaryCapePoints: number,
  maxCapePoints: number,
  multiplier: number,
  scaling: number,
): CommonPointCalculatorData {
  const totalPointsAvailable = calculateMaximumSkillingPoints(scaling);

  const totalPointsAwarded =
    achievementDiaryPoints +
    totalLevelPoints +
    achievementDiaryCapePoints +
    maxCapePoints +
    ehpPoints;

  const bonusPointsAwarded = calculateBonusPoints(
    totalPointsAwarded,
    multiplier,
  );

  const pointsAwarded = Math.min(
    Math.floor(
      achievementDiaryPoints +
        totalLevelPoints +
        achievementDiaryCapePoints +
        maxCapePoints,
    ),
    totalPointsAvailable,
  );
  const pointsRemaining =
    totalPointsAvailable - (totalPointsAwarded - ehpPoints);
  const pointsAwardedPercentage = pointsAwarded / totalPointsAvailable;

  return {
    pointsAwarded: totalPointsAwarded + bonusPointsAwarded,
    pointsAwardedPercentage,
    pointsRemaining,
  };
}
