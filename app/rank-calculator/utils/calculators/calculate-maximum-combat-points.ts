import { pointsConfig } from '../../config/points';
import { calculateMaximumCombatAchievementPoints } from './calculate-maximum-combat-achievement-points';

export function calculateMaximumCombatPoints(scaling: number) {
  const { infernalCapePoints, bloodTorvaPoints, dizanasQuiverPoints } =
    pointsConfig;
  const maximumCombatAchievementPoints =
    calculateMaximumCombatAchievementPoints(scaling);
  const maximumTzhaarCapePoints = infernalCapePoints;

  return Math.floor(
    (maximumCombatAchievementPoints +
      maximumTzhaarCapePoints +
      bloodTorvaPoints +
      dizanasQuiverPoints) *
      scaling,
  );
}
