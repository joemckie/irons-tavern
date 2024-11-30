import { CommonPointCalculatorData } from '@/app/schemas/rank-calculator';
import { calculateCombatPoints } from '@/app/rank-calculator/utils/calculators/calculate-combat-points';
import { useEhbPoints } from './use-ehb-points';
import { useCombatAchievementTierPoints } from './use-combat-achievement-points';
import { useCalculatorScaling } from '../use-calculator-scaling';

export interface CombatPointCalculatorData extends CommonPointCalculatorData {
  combatAchievementTierPoints: number;
  ehbPoints: number;
}

export function useCombatPointCalculator() {
  const scaling = useCalculatorScaling();
  const ehbPoints = useEhbPoints();
  const combatAchievementTierPoints = useCombatAchievementTierPoints();

  const { pointsAwarded, pointsAwardedPercentage, pointsRemaining } =
    calculateCombatPoints(ehbPoints, combatAchievementTierPoints, scaling);

  return {
    pointsAwarded,
    pointsAwardedPercentage,
    pointsRemaining,
    combatAchievementTierPoints,
    ehbPoints,
  } satisfies CombatPointCalculatorData;
}
