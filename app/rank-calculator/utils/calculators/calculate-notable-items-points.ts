import { itemList } from '@/data/item-list';
import Decimal from 'decimal.js-light';
import { ItemCategory } from '@/app/schemas/items';
import { stripEntityName } from '../strip-entity-name';
import { calculateMaximumNotableItemsPoints } from './calculate-maximum-notable-items-points';

export function calculateNotableItemsPoints(
  notableItems: [string, ItemCategory][],
  itemFields: Record<string, boolean | undefined>,
  scaling: number,
) {
  const totalPointsAvailable = calculateMaximumNotableItemsPoints(
    notableItems,
    scaling,
  );
  const { totalItems, itemPoints } = Object.entries(itemList).reduce(
    (acc, [, { items }]) => {
      const { categoryItemPointMap } = items.reduce(
        (categoryAcc, val) => ({
          categoryItemPointMap: {
            ...categoryAcc.categoryItemPointMap,
            [stripEntityName(val.name)]: val.points,
          },
        }),
        {
          categoryItemPointMap: {},
        },
      );

      return {
        totalItems: acc.totalItems + items.length,
        itemPoints: {
          ...acc.itemPoints,
          ...categoryItemPointMap,
        },
      };
    },
    {
      totalItems: 0,
      itemPoints: {} as Record<string, number>,
    },
  );
  const filteredItemFields = itemFields
    ? Object.entries(itemFields).filter(([, value]) => !!value)
    : [];
  const itemsCollected = filteredItemFields.length;
  const percentageCollected = itemsCollected / totalItems;
  const unscaledPointsAwarded = filteredItemFields.reduce(
    (acc, [item]) => acc + (itemPoints?.[item] ?? 0),
    0,
  );
  const pointsAwarded = new Decimal(unscaledPointsAwarded)
    .times(scaling)
    .toDecimalPlaces(0, Decimal.ROUND_FLOOR)
    .toNumber();
  const pointsAwardedPercentage = pointsAwarded / totalPointsAvailable;
  const pointsRemaining = totalPointsAvailable - pointsAwarded;

  return {
    pointsAwarded,
    pointsAwardedPercentage,
    pointsRemaining,
    percentageCollected,
    itemsCollected,
    totalItems,
  };
}
