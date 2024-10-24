import { CategoryPointCalculatorData } from '@/types/rank-calculator';

export function useCombatPointCalculator() {
  return {
    availablePoints: 0,
    pointsAwarded: 0,
    pointsAwardedPercentage: 0,
    caTierPoints: 0,
    ehbPoints: 0,
  } satisfies CategoryPointCalculatorData;
}
