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
) {
  const totalPointsAvailable = calculateMaximumSkillingPoints(scaling);

  const pointsAwardedWithEhp =
    achievementDiaryPoints +
    totalLevelPoints +
    achievementDiaryCapePoints +
    maxCapePoints +
    ehpPoints;

  const bonusPointsAwarded = calculateBonusPoints(
    pointsAwardedWithEhp,
    multiplier,
  );

  const pointsAwardedWithoutEhp = Math.min(
    Math.floor(pointsAwardedWithEhp - ehpPoints),
    totalPointsAvailable,
  );
  const pointsRemaining = totalPointsAvailable - pointsAwardedWithoutEhp;
  const pointsAwardedPercentage =
    pointsAwardedWithoutEhp / totalPointsAvailable;

  return {
    pointsAwarded: Math.floor(pointsAwardedWithEhp + bonusPointsAwarded),
    pointsAwardedPercentage,
    pointsRemaining,
    bonusPointsAwarded: Math.floor(bonusPointsAwarded),
  };
}
