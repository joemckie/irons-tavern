import { CombatAchievementTier } from '@/app/schemas/osrs';
import { useWatch } from 'react-hook-form';
import { RankCalculatorSchema } from '@/app/rank-calculator/[player]/submit-rank-calculator-validation';
import { useMaxCombatAchievementPoints } from './use-max-combat-points';

export function useCombatAchievementTierPoints() {
  const maxCombatAchievementPoints = useMaxCombatAchievementPoints();
  const combatAchievementTier = useWatch<
    RankCalculatorSchema,
    'combatAchievementTier'
  >({
    name: 'combatAchievementTier',
  });
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
