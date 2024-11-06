import { RankCalculatorSchema } from '@/app/rank-calculator/[player]/submit-rank-calculator-validation';
import { useWatch } from 'react-hook-form';
import { calculatePointsForLogSlots } from './calculate-points-for-log-slots';
import { useCalculatorScaling } from '../use-calculator-scaling';

export function useCollectionLogSlotPoints() {
  const collectionLogSlotsAchieved = useWatch<
    RankCalculatorSchema,
    'collectionLogCount'
  >({
    name: 'collectionLogCount',
  });
  const scaling = useCalculatorScaling();

  return collectionLogSlotsAchieved
    ? calculatePointsForLogSlots(collectionLogSlotsAchieved, scaling)
    : 0;
}
