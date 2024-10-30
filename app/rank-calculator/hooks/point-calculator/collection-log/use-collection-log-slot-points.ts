import { FormData } from '@/types/rank-calculator';
import { useWatch } from 'react-hook-form';
import { calculatePointsForLogSlots } from './calculate-points-for-log-slots';
import { useCalculatorScaling } from '../use-calculator-scaling';

export function useCollectionLogSlotPoints() {
  const collectionLogSlotsAchieved = useWatch<FormData, 'collectionLogCount'>({
    name: 'collectionLogCount',
  });
  const scaling = useCalculatorScaling();

  if (collectionLogSlotsAchieved === 0) {
    return 0;
  }

  return calculatePointsForLogSlots(collectionLogSlotsAchieved, scaling);
}
