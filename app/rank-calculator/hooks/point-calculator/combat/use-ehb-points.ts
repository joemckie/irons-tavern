import { useWatch } from 'react-hook-form';
import { Decimal } from 'decimal.js-light';
import { RankCalculatorSchema } from '@/app/rank-calculator/[player]/submit-rank-calculator-validation';
import { useCalculatorScaling } from '../use-calculator-scaling';

export function useEhbPoints() {
  const ehb = useWatch<RankCalculatorSchema, 'ehb'>({ name: 'ehb' });
  const scaling = useCalculatorScaling();
  const pointsPerEhb = 10;
  const scaledPoints = new Decimal(ehb)
    .times(pointsPerEhb)
    .times(scaling)
    .toDecimalPlaces(0, Decimal.ROUND_FLOOR)
    .toNumber();

  return scaledPoints;
}
