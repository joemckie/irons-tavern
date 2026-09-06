import { calculateMaximumNotableItemsPoints } from '@/app/rank-calculator/utils/calculators/calculate-maximum-notable-items-points';
import { useCalculatorScaling } from '../use-calculator-scaling';
import { useItemList } from '@/app/rank-calculator/contexts/item-list-context';

export function useMaxNotableItemsPoints() {
  const scaling = useCalculatorScaling();
  const notableItems = useItemList();

  return calculateMaximumNotableItemsPoints(notableItems, scaling);
}
