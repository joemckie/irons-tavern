export function calculateMaximumCombatAchievementPoints(scaling: number) {
  const maximumCombatAchievementPoints = 50000;

  return Math.floor(maximumCombatAchievementPoints * scaling);
}
