import { RankCalculatorSchema } from '@/app/rank-calculator/[player]/submit-rank-calculator-validation';
import { useWatch } from 'react-hook-form';
import { calculatePointsForLogSlots } from '../../../utils/calculators/calculate-points-for-log-slots';
import { useCalculatorScaling } from '../use-calculator-scaling';

export function useMaxCollectionLogPoints() {
  const totalCollectionLogSlots = useWatch<
    RankCalculatorSchema,
    'collectionLogTotal'
  >({
    name: 'collectionLogTotal',
  });
  const scaling = useCalculatorScaling();

  if (totalCollectionLogSlots === 0) {
    return 0;
  }

  return calculatePointsForLogSlots(totalCollectionLogSlots, scaling);
}
