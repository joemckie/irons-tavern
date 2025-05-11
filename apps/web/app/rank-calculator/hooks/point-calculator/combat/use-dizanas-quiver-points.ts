import { useWatch } from 'react-hook-form';
import { RankCalculatorSchema } from '@/app/rank-calculator/[player]/submit-rank-calculator-validation';
import { calculateDizanasQuiverPoints } from '@/app/rank-calculator/utils/calculators/calculate-dizanas-quiver-points';
import { useCalculatorScaling } from '../use-calculator-scaling';

export function useDizanasQuiverPoints() {
  const hasDizanasQuiver = useWatch<RankCalculatorSchema, 'hasDizanasQuiver'>({
    name: 'hasDizanasQuiver',
  });
  const scaling = useCalculatorScaling();

  return calculateDizanasQuiverPoints(hasDizanasQuiver, scaling);
}
