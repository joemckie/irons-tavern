import { calculateMaximumCombatAchievementPoints } from './calculate-maximum-combat-achievement-points';

export function calculateCombatPoints(
  ehbPoints: number,
  combatAchievementTierPoints: number,
  scaling: number,
) {
  const totalPointsAvailable = calculateMaximumCombatAchievementPoints(scaling);
  const pointsAwarded = combatAchievementTierPoints + ehbPoints;
  const pointsRemaining = totalPointsAvailable - (pointsAwarded - ehbPoints);
  const pointsAwardedPercentage =
    (pointsAwarded - ehbPoints) / totalPointsAvailable;

  return {
    pointsAwarded,
    pointsAwardedPercentage,
    pointsRemaining,
  };
}
