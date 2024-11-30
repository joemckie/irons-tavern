import { useWatch } from 'react-hook-form';
import { RankCalculatorSchema } from '@/app/rank-calculator/[player]/submit-rank-calculator-validation';
import { calculateEhpPoints } from '@/app/rank-calculator/utils/calculators/calculate-ehp-points';
import { useCalculatorScaling } from '../use-calculator-scaling';

export function useEhpPoints() {
  const ehp = useWatch<RankCalculatorSchema, 'ehp'>({ name: 'ehp' });
  const scaling = useCalculatorScaling();

  return calculateEhpPoints(ehp, scaling);
}
