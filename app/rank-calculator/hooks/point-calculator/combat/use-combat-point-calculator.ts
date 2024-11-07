import { CommonPointCalculatorData } from '@/app/schemas/rank-calculator';
import { useEhbPoints } from './use-ehb-points';
import { useMaxCombatAchievementPoints } from './use-max-combat-points';
import { useCombatAchievementTierPoints } from './use-combat-achievement-points';

export interface CombatPointCalculatorData extends CommonPointCalculatorData {
  combatAchievementTierPoints: number;
  ehbPoints: number;
}

export function useCombatPointCalculator() {
  const totalPointsAvailable = useMaxCombatAchievementPoints();
  const ehbPoints = useEhbPoints();
  const combatAchievementTierPoints = useCombatAchievementTierPoints();
  const pointsAwarded = combatAchievementTierPoints + ehbPoints;
  const pointsRemaining = totalPointsAvailable - (pointsAwarded - ehbPoints);
  const pointsAwardedPercentage =
    (pointsAwarded - ehbPoints) / totalPointsAvailable;

  return {
    pointsAwarded,
    pointsAwardedPercentage,
    pointsRemaining,
    combatAchievementTierPoints,
    ehbPoints,
  } satisfies CombatPointCalculatorData;
}
