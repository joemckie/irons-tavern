import { calculateMaximumNotableItemsPoints } from '@/app/rank-calculator/utils/calculators/calculate-maximum-notable-items-points';
import { useSearchParams } from 'next/navigation';
import { clientConstants } from '@/config/constants.client';
import { useCalculatorScaling } from '../use-calculator-scaling';
import { useGetItems } from '../../use-get-items';

export function useMaxNotableItemsPoints() {
  const scaling = useCalculatorScaling();
  const search = useSearchParams();
  const { data: notableItems } = useGetItems(
    Number(search.get('h')) ||
      clientConstants.calculator.notableItemsPointsPerHour,
  );

  return calculateMaximumNotableItemsPoints(notableItems, scaling);
}
