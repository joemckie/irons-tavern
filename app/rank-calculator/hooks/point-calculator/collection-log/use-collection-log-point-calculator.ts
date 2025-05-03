import { CommonPointCalculatorData } from '@/app/schemas/rank-calculator';
import { calculateCollectionLogPoints } from '@/app/rank-calculator/utils/calculators/calculate-collection-log-points';
import { useWatch } from 'react-hook-form';
import { RankCalculatorSchema } from '@/app/rank-calculator/[player]/submit-rank-calculator-validation';
import { useCollectionLogSlotPoints } from './use-collection-log-slot-points';
import { useCalculatorScaling } from '../use-calculator-scaling';

export interface CollectionLogPointCalculatorData
  extends CommonPointCalculatorData {
  collectionLogSlotPoints: number;
}

export function useCollectionLogPointCalculator() {
  const totalCollectionLogSlots = useWatch<
    RankCalculatorSchema,
    'collectionLogTotal'
  >({
    name: 'collectionLogTotal',
  });
  const collectionLogBonusMultiplier = useWatch<
    RankCalculatorSchema,
    'collectionLogBonusMultiplier'
  >({
    name: 'collectionLogBonusMultiplier',
  });

  const scaling = useCalculatorScaling();
  const collectionLogSlotPoints = useCollectionLogSlotPoints();
  const { pointsAwarded, pointsAwardedPercentage, pointsRemaining } =
    calculateCollectionLogPoints(
      collectionLogSlotPoints,
      totalCollectionLogSlots,
      collectionLogBonusMultiplier,
      scaling,
    );

  return {
    pointsAwarded,
    pointsAwardedPercentage,
    pointsRemaining,
    collectionLogSlotPoints,
  } satisfies CollectionLogPointCalculatorData;
}
