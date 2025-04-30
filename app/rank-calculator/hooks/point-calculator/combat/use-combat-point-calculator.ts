import { CommonPointCalculatorData } from '@/app/schemas/rank-calculator';
import { calculateCombatPoints } from '@/app/rank-calculator/utils/calculators/calculate-combat-points';
import { useEhbPoints } from './use-ehb-points';
import { useCombatAchievementTierPoints } from './use-combat-achievement-points';
import { useCalculatorScaling } from '../use-calculator-scaling';
import { useTzhaarCapePoints } from './use-tzhaar-cape-points';

export interface CombatPointCalculatorData extends CommonPointCalculatorData {
  combatAchievementTierPoints: number;
  ehbPoints: number;
  tzhaarCapePoints: number;
}

export function useCombatPointCalculator() {
  const scaling = useCalculatorScaling();
  const ehbPoints = useEhbPoints();
  const combatAchievementTierPoints = useCombatAchievementTierPoints();
  const tzhaarCapePoints = useTzhaarCapePoints();

  const { pointsAwarded, pointsAwardedPercentage, pointsRemaining } =
    calculateCombatPoints(
      ehbPoints,
      combatAchievementTierPoints,
      tzhaarCapePoints,
      scaling,
    );

  return {
    pointsAwarded,
    pointsAwardedPercentage,
    pointsRemaining,
    combatAchievementTierPoints,
    ehbPoints,
    tzhaarCapePoints,
  } satisfies CombatPointCalculatorData;
}
