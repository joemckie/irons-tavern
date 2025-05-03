import { CombatAchievementTier } from '@/app/schemas/osrs';
import { pointsConfig } from '../../config/points';

export function calculateCombatAchievementPoints(
  combatAchievementTier: CombatAchievementTier,
  scaling: number,
) {
  const { maximumCombatAchievementPoints } = pointsConfig;
  const tierPointMap = {
    None: maximumCombatAchievementPoints * 0,
    Easy: maximumCombatAchievementPoints * 0.05,
    Medium: maximumCombatAchievementPoints * 0.1,
    Hard: maximumCombatAchievementPoints * 0.2,
    Elite: maximumCombatAchievementPoints * 0.4,
    Master: maximumCombatAchievementPoints * 0.7,
    Grandmaster: maximumCombatAchievementPoints * 1,
  } satisfies Record<CombatAchievementTier, number>;

  return Math.floor(tierPointMap[combatAchievementTier] * scaling);
}
