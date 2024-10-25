import { CategoryPointCalculatorData } from '@/types/rank-calculator';

export function useCombatPointCalculator() {
  return {
    pointsAwarded: 0,
    pointsAwardedPercentage: 0,
    pointsRemaining: 0,
    caTierPoints: 0,
    ehbPoints: 0,
  } satisfies CategoryPointCalculatorData;
}
