import { useWatch } from 'react-hook-form';
import { CommonPointCalculatorData } from '@/types/rank-calculator';
import { useGetItems } from '../use-get-items';

export interface NotableItemsPointCalculatorData
  extends CommonPointCalculatorData {
  percentageCollected: number;
  itemsCollected: number;
  totalItems: number;
}

export function useNotableItemsPointCalculator() {
  const { data } = useGetItems();
  const itemFields = useWatch<Record<string, boolean>>({
    name: 'items',
  });

  const { totalItems, itemPoints, availablePoints } = data.reduce(
    (acc, [, { items }]) => {
      const { categoryItemPointMap, categoryTotalPoints } = items.reduce(
        (categoryAcc, val) => ({
          categoryItemPointMap: {
            ...categoryAcc.categoryItemPointMap,
            [val.name.replaceAll("'", '')]: val.points,
          },
          categoryTotalPoints: categoryAcc.categoryTotalPoints + val.points,
        }),
        {
          categoryItemPointMap: {},
          categoryTotalPoints: 0,
        },
      );

      return {
        availablePoints: acc.availablePoints + categoryTotalPoints,
        totalItems: acc.totalItems + items.length,
        itemPoints: {
          ...acc.itemPoints,
          ...categoryItemPointMap,
        },
      };
    },
    {
      availablePoints: 0,
      totalItems: 0,
      itemPoints: {} as Record<string, number>,
    },
  );

  const filteredItemFields = itemFields
    ? Object.entries(itemFields).filter(([, value]) => !!value)
    : [];
  const itemsCollected = filteredItemFields.length;
  const percentageCollected = (itemsCollected / totalItems) * 100;
  const pointsAwarded = filteredItemFields.reduce(
    (acc, [item]) => acc + itemPoints[item],
    0,
  );
  const pointsAwardedPercentage = (pointsAwarded / availablePoints) * 100;

  return {
    pointsAwarded,
    pointsAwardedPercentage,
    pointsRemaining: availablePoints - pointsAwarded,
    percentageCollected,
    itemsCollected,
    totalItems,
  } satisfies NotableItemsPointCalculatorData;
}
