export function calculateAchievementDiaryCapePoints(
  hasAchievementDiaryCape: boolean,
  scaling: number,
) {
  return hasAchievementDiaryCape ? 1000 * scaling : 0;
}
