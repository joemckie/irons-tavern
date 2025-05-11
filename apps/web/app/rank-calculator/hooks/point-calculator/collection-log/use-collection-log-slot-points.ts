import { RankCalculatorSchema } from '@/app/rank-calculator/[player]/submit-rank-calculator-validation';
import { calculateCollectionLogSlotPoints } from '@/app/rank-calculator/utils/calculators/calculate-collection-log-slot-points';
import { useWatch } from 'react-hook-form';
import { useCalculatorScaling } from '../use-calculator-scaling';

export function useCollectionLogSlotPoints() {
  const collectionLogSlotsAchieved = useWatch<
    RankCalculatorSchema,
    'collectionLogCount'
  >({
    name: 'collectionLogCount',
  });
  const scaling = useCalculatorScaling();

  return calculateCollectionLogSlotPoints(collectionLogSlotsAchieved, scaling);
}
