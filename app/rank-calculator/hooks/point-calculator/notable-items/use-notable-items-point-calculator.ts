import { useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { CommonPointCalculatorData } from '@/app/schemas/rank-calculator';
import { RankCalculatorSchema } from '@/app/rank-calculator/[player]/submit-rank-calculator-validation';
import { calculateNotableItemsPoints } from '@/app/rank-calculator/utils/calculators/calculate-notable-items-points';
import { useCalculatorScaling } from '../use-calculator-scaling';

export interface NotableItemsPointCalculatorData
  extends CommonPointCalculatorData {
  percentageCollected: number;
  itemsCollected: number;
  totalItems: number;
}

export function useNotableItemsPointCalculator() {
  const itemFields = useWatch<RankCalculatorSchema, 'acquiredItems'>({
    name: 'acquiredItems',
  });
  const scaling = useCalculatorScaling();
  const [notableItemsData, setNotableItemsData] =
    useState<NotableItemsPointCalculatorData>({
      pointsAwarded: 0,
      itemsCollected: 0,
      percentageCollected: 0,
      pointsAwardedPercentage: 0,
      pointsRemaining: 0,
      totalItems: 0,
    });

  useEffect(() => {
    async function calculateNotableItemsData() {
      const data = await calculateNotableItemsPoints(itemFields, scaling);

      setNotableItemsData(data);
    }

    calculateNotableItemsData();
  }, [itemFields, scaling]);

  return notableItemsData;
}
