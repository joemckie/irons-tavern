import { FormData } from '@/types/rank-calculator';
import { useWatch } from 'react-hook-form';
import { Decimal } from 'decimal.js-light';
import { useCalculatorScaling } from '../use-calculator-scaling';

export function useEhbPoints() {
  const ehb = useWatch<FormData, 'ehb'>({ name: 'ehb' });
  const scaling = useCalculatorScaling();
  const pointsPerEhb = 10;
  const scaledPoints = new Decimal(ehb)
    .times(pointsPerEhb)
    .times(scaling)
    .toDecimalPlaces(0, Decimal.ROUND_FLOOR)
    .toNumber();

  return scaledPoints;
}
