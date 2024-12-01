import { useWatch } from 'react-hook-form';
import { RankCalculatorSchema } from '@/app/rank-calculator/[player]/submit-rank-calculator-validation';
import { calculateCombatAchievementPoints } from '@/app/rank-calculator/utils/calculators/calculate-combat-achievement-points';
import { useCalculatorScaling } from '../use-calculator-scaling';

export function useCombatAchievementTierPoints() {
  const scaling = useCalculatorScaling();
  const combatAchievementTier = useWatch<
    RankCalculatorSchema,
    'combatAchievementTier'
  >({
    name: 'combatAchievementTier',
  });

  return calculateCombatAchievementPoints(combatAchievementTier, scaling);
}
