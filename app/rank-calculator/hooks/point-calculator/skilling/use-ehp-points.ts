import { useWatch } from 'react-hook-form';
import { FormData } from '@/types/rank-calculator';
import { useCalculatorScaling } from '../use-calculator-scaling';

export function useEhpPoints() {
  const ehp = useWatch<FormData, 'ehp'>({ name: 'ehp' });
  const scaling = useCalculatorScaling();
  const pointsPerEhp = 10;
  const ehpPoints = Math.floor(
    Number((ehp * pointsPerEhp * scaling).toFixed(3)),
  );

  return ehpPoints;
}
