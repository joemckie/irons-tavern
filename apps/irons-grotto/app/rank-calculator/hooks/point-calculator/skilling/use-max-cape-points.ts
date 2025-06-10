import { useWatch } from 'react-hook-form';
import { RankCalculatorSchema } from '@/app/rank-calculator/[player]/submit-rank-calculator-validation';
import { calculateMaxCapePoints } from '@/app/rank-calculator/utils/calculators/calculate-max-cape-points';
import { useCalculatorScaling } from '../use-calculator-scaling';

export function useMaxCapePoints() {
  const hasMaxCape = useWatch<RankCalculatorSchema, 'hasMaxCape'>({
    name: 'hasMaxCape',
  });
  const scaling = useCalculatorScaling();

  return calculateMaxCapePoints(hasMaxCape, scaling);
}
