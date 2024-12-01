import { calculateMaximumNotableItemsPoints } from '@/app/rank-calculator/utils/calculators/calculate-maximum-notable-items-points';
import { useCalculatorScaling } from '../use-calculator-scaling';

export function useMaxNotableItemsPoints() {
  const scaling = useCalculatorScaling();

  return calculateMaximumNotableItemsPoints(scaling);
}
