import { calculateBonusPoints } from './calculate-bonus-points';
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
  const pointsAwarded =
    combatAchievementTierPoints +
    ehbPoints +
    tzhaarCapePoints +
    bloodTorvaPoints +
    dizanasQuiverPoints;
  const bonusPointsAwarded = calculateBonusPoints(pointsAwarded, multiplier);
  const pointsRemaining = totalPointsAvailable - (pointsAwarded - ehbPoints);
  const pointsAwardedPercentage =
    (pointsAwarded - ehbPoints) / totalPointsAvailable;

  return {
    pointsAwarded: Math.floor(pointsAwarded + bonusPointsAwarded),
    pointsAwardedPercentage,
    pointsRemaining,
    bonusPointsAwarded: Math.floor(bonusPointsAwarded),
  };
}
