import { pointsConfig } from '../../config/points';

export function calculateMaximumCombatAchievementPoints(scaling: number) {
  const { maximumCombatAchievementPoints } = pointsConfig;

  return Math.floor(maximumCombatAchievementPoints * scaling);
}
