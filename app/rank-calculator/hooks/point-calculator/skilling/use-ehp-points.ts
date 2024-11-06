import { useWatch } from 'react-hook-form';
import { RankCalculatorSchema } from '@/app/rank-calculator/[player]/submit-rank-calculator-validation';
import { useCalculatorScaling } from '../use-calculator-scaling';

export function useEhpPoints() {
  const ehp = useWatch<RankCalculatorSchema, 'ehp'>({ name: 'ehp' });
  const scaling = useCalculatorScaling();
  const pointsPerEhp = 10;
  const ehpPoints = Math.floor(
    Number((ehp * pointsPerEhp * scaling).toFixed(3)),
  );

  return ehpPoints;
}
