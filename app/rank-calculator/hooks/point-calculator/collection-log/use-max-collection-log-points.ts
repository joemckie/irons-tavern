import { FormData } from '@/types/rank-calculator';
import { useWatch } from 'react-hook-form';
import { calculatePointsForLogSlots } from './calculate-points-for-log-slots';
import { useCalculatorScaling } from '../use-calculator-scaling';

export function useMaxCollectionLogPoints() {
  const totalCollectionLogSlots = useWatch<FormData, 'collectionLogTotal'>({
    name: 'collectionLogTotal',
  });
  const scaling = useCalculatorScaling();

  return calculatePointsForLogSlots(totalCollectionLogSlots, scaling);
}