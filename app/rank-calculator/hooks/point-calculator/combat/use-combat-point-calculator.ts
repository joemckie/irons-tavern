import { CommonPointCalculatorData } from '@/types/rank-calculator';
import { useEhbPoints } from './use-ehb-points';
import { useMaxCombatPoints } from './use-max-combat-points';

export interface CombatPointCalculatorData extends CommonPointCalculatorData {
  combatAchievementTierPoints: number;
  ehbPoints: number;
}

export function useCombatPointCalculator() {
  const totalCombatPoints = useMaxCombatPoints();
  const ehbPoints = useEhbPoints();
  const pointsAwarded = ehbPoints;
  const pointsAwardedPercentage = (pointsAwarded / totalCombatPoints) * 100;
  const pointsRemaining = totalCombatPoints - pointsAwarded;

  return {
    pointsAwarded,
    pointsAwardedPercentage,
    pointsRemaining,
    combatAchievementTierPoints: 0,
    ehbPoints,
  } satisfies CombatPointCalculatorData;
}
