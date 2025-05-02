import { calculateMaximumNotableItemsPoints } from '@/app/rank-calculator/utils/calculators/calculate-maximum-notable-items-points';
import { useCalculatorScaling } from '../use-calculator-scaling';
import { useGetItems } from '../../use-get-items';

export function useMaxNotableItemsPoints() {
  const scaling = useCalculatorScaling();
  const { data: notableItems } = useGetItems();

  return calculateMaximumNotableItemsPoints(notableItems, scaling);
}
