import { CommonPointCalculatorData } from '@/app/schemas/rank-calculator';
import { calculateCombatPoints } from '@/app/rank-calculator/utils/calculators/calculate-combat-points';
import { useWatch } from 'react-hook-form';
import { RankCalculatorSchema } from '@/app/rank-calculator/[player]/submit-rank-calculator-validation';
import { useEhbPoints } from './use-ehb-points';
import { useCombatAchievementTierPoints } from './use-combat-achievement-points';
import { useCalculatorScaling } from '../use-calculator-scaling';
import { useTzhaarCapePoints } from './use-tzhaar-cape-points';
import { useBloodTorvaPoints } from './use-blood-torva-points';
import { useDizanasQuiverPoints } from './use-dizanas-quiver-points';

export interface CombatPointCalculatorData extends CommonPointCalculatorData {
  combatAchievementTierPoints: number;
  ehbPoints: number;
  tzhaarCapePoints: number;
  bloodTorvaPoints: number;
  dizanasQuiverPoints: number;
}

export function useCombatPointCalculator() {
  const rawMultiplier = useWatch<RankCalculatorSchema, 'combatMultiplier'>({
    name: 'combatMultiplier',
  });
  const multiplier = 1 + rawMultiplier / 100;

  const scaling = useCalculatorScaling();
  const ehbPoints = useEhbPoints();
  const combatAchievementTierPoints = useCombatAchievementTierPoints();
  const tzhaarCapePoints = useTzhaarCapePoints();
  const bloodTorvaPoints = useBloodTorvaPoints();
  const dizanasQuiverPoints = useDizanasQuiverPoints();

  const { pointsAwarded, pointsAwardedPercentage, pointsRemaining } =
    calculateCombatPoints(
      ehbPoints,
      combatAchievementTierPoints,
      tzhaarCapePoints,
      bloodTorvaPoints,
      dizanasQuiverPoints,
      multiplier,
      scaling,
    );

  return {
    pointsAwarded,
    pointsAwardedPercentage,
    pointsRemaining,
    combatAchievementTierPoints,
    ehbPoints,
    tzhaarCapePoints,
    bloodTorvaPoints,
    dizanasQuiverPoints,
  } satisfies CombatPointCalculatorData;
}
