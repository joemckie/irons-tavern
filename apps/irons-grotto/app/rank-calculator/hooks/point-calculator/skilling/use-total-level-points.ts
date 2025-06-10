import { useWatch } from 'react-hook-form';
import { RankCalculatorSchema } from '@/app/rank-calculator/[player]/submit-rank-calculator-validation';
import { calculateTotalLevelPoints } from '@/app/rank-calculator/utils/calculators/calculate-total-level-points';
import { useCalculatorScaling } from '../use-calculator-scaling';

// View the function graph below
// https://www.desmos.com/calculator/pvb3brafeg
export function useTotalLevelPoints() {
  const totalLevel = useWatch<RankCalculatorSchema, 'totalLevel'>({
    name: 'totalLevel',
  });

  const scaling = useCalculatorScaling();

  return calculateTotalLevelPoints(totalLevel, scaling);
}
