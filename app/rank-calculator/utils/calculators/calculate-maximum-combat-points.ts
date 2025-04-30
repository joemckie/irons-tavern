import { calculateMaximumCombatAchievementPoints } from './calculate-maximum-combat-achievement-points';

export function calculateMaximumCombatPoints(scaling: number) {
  const maximumCombatAchievementPoints =
    calculateMaximumCombatAchievementPoints(scaling);
  const maximumTzhaarCapePoints = 7000;

  return Math.floor(
    (maximumCombatAchievementPoints + maximumTzhaarCapePoints) * scaling,
  );
}
