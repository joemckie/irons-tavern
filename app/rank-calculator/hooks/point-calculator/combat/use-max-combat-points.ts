import { useCalculatorScaling } from '../use-calculator-scaling';

export function useMaxCombatAchievementPoints() {
  const scaling = useCalculatorScaling();
  const maxAvailablePoints = 50000;

  return Math.floor(maxAvailablePoints * scaling);
}
