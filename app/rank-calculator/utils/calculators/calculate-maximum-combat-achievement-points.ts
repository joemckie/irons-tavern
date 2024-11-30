export function calculateMaximumCombatAchievementPoints(scaling: number) {
  const maxAvailablePoints = 50000;

  return Math.floor(maxAvailablePoints * scaling);
}
