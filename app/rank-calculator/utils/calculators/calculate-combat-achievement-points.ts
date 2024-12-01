import { CombatAchievementTier } from '@/app/schemas/osrs';
import { calculateMaximumCombatAchievementPoints } from './calculate-maximum-combat-achievement-points';

export function calculateCombatAchievementPoints(
  combatAchievementTier: CombatAchievementTier,
  scaling: number,
) {
  const maxCombatAchievementPoints =
    calculateMaximumCombatAchievementPoints(scaling);
  const tierPointMap = {
    None: maxCombatAchievementPoints * 0,
    Easy: maxCombatAchievementPoints * 0.05,
    Medium: maxCombatAchievementPoints * 0.1,
    Hard: maxCombatAchievementPoints * 0.2,
    Elite: maxCombatAchievementPoints * 0.4,
    Master: maxCombatAchievementPoints * 0.7,
    Grandmaster: maxCombatAchievementPoints * 1,
  } satisfies Record<CombatAchievementTier, number>;

  return Math.floor(tierPointMap[combatAchievementTier]);
}
