import { pointsConfig } from '../../config/points';

export function calculateAchievementDiaryCapePoints(
  hasAchievementDiaryCape: boolean,
  scaling: number,
) {
  return hasAchievementDiaryCape
    ? pointsConfig.achievementDiaryCapePoints * scaling
    : 0;
}
