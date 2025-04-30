import { calculateMaximumCombatPoints } from './calculate-maximum-combat-points';

export function calculateCombatPoints(
  ehbPoints: number,
  combatAchievementTierPoints: number,
  tzhaarCapePoints: number,
  bloodTorvaPoints: number,
  dizanasQuiverPoints: number,
  multiplier: number,
  scaling: number,
) {
  const totalPointsAvailable = calculateMaximumCombatPoints(scaling);
  const pointsAwarded = Math.floor(
    (combatAchievementTierPoints +
      ehbPoints +
      tzhaarCapePoints +
      bloodTorvaPoints +
      dizanasQuiverPoints) *
      multiplier,
  );
  const pointsRemaining = totalPointsAvailable - (pointsAwarded - ehbPoints);
  const pointsAwardedPercentage =
    (pointsAwarded - ehbPoints) / totalPointsAvailable;

  return {
    pointsAwarded,
    pointsAwardedPercentage,
    pointsRemaining,
  };
}
