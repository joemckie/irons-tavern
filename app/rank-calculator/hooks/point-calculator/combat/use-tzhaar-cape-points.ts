import { useWatch } from 'react-hook-form';
import { RankCalculatorSchema } from '@/app/rank-calculator/[player]/submit-rank-calculator-validation';
import { calculateTzhaarCapePoints } from '@/app/rank-calculator/utils/calculators/calculate-tzhaar-cape-points';
import { useCalculatorScaling } from '../use-calculator-scaling';

export function useTzhaarCapePoints() {
  const cape = useWatch<RankCalculatorSchema, 'tzhaarCape'>({
    name: 'tzhaarCape',
  });
  const scaling = useCalculatorScaling();

  return calculateTzhaarCapePoints(cape, scaling);
}
