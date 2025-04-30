import { calculateMaximumCombatPoints } from './calculate-maximum-combat-points';

export function calculateCombatPoints(
  ehbPoints: number,
  combatAchievementTierPoints: number,
  tzhaarCapePoints: number,
  bloodTorvaPoints: number,
  dizanasQuiverPoints: number,
  scaling: number,
) {
  const totalPointsAvailable = calculateMaximumCombatPoints(scaling);
  const pointsAwarded =
    combatAchievementTierPoints +
    ehbPoints +
    tzhaarCapePoints +
    bloodTorvaPoints +
    dizanasQuiverPoints;
  const pointsRemaining = totalPointsAvailable - (pointsAwarded - ehbPoints);
  const pointsAwardedPercentage =
    (pointsAwarded - ehbPoints) / totalPointsAvailable;

  return {
    pointsAwarded,
    pointsAwardedPercentage,
    pointsRemaining,
  };
}
