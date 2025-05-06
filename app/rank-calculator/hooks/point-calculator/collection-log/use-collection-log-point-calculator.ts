import {
  BonusPointCalculatorData,
  CommonPointCalculatorData,
} from '@/app/schemas/rank-calculator';
import { calculateCollectionLogPoints } from '@/app/rank-calculator/utils/calculators/calculate-collection-log-points';
import { useWatch } from 'react-hook-form';
import { RankCalculatorSchema } from '@/app/rank-calculator/[player]/submit-rank-calculator-validation';
import { useCollectionLogSlotPoints } from './use-collection-log-slot-points';
import { useCalculatorScaling } from '../use-calculator-scaling';

export interface CollectionLogPointCalculatorData
  extends CommonPointCalculatorData,
    BonusPointCalculatorData {
  collectionLogSlotPoints: number;
}

export function useCollectionLogPointCalculator() {
  const totalCollectionLogSlots = useWatch<
    RankCalculatorSchema,
    'collectionLogTotal'
  >({
    name: 'collectionLogTotal',
  });
  const bonusMultiplier = useWatch<
    RankCalculatorSchema,
    'collectionLogBonusMultiplier'
  >({
    name: 'collectionLogBonusMultiplier',
  });

  const scaling = useCalculatorScaling();
  const collectionLogSlotPoints = useCollectionLogSlotPoints();
  const {
    pointsAwarded,
    pointsAwardedPercentage,
    pointsRemaining,
    bonusPointsAwarded,
  } = calculateCollectionLogPoints(
    collectionLogSlotPoints,
    totalCollectionLogSlots,
    bonusMultiplier,
    scaling,
  );

  return {
    pointsAwarded,
    pointsAwardedPercentage,
    pointsRemaining,
    collectionLogSlotPoints,
    bonusMultiplier,
    bonusPointsAwarded,
  } satisfies CollectionLogPointCalculatorData;
}
