import { calculateMaximumNotableItemsPoints } from '@/app/rank-calculator/utils/calculators/calculate-maximum-notable-items-points';
import { useCalculatorScaling } from '../use-calculator-scaling';
import { useDropRates } from '../../use-drop-rates';

export function useMaxNotableItemsPoints() {
  const scaling = useCalculatorScaling();
  const { data: dropRates } = useDropRates();

  return calculateMaximumNotableItemsPoints(dropRates, scaling);
}
