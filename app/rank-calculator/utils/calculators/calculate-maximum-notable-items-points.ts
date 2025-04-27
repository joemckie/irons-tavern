import { DroppedItemResponse } from '@/app/schemas/wiki';
import { itemList } from '@/data/item-list';
import { isCollectionLogItem } from '@/app/schemas/items';
import { calculateItemPoints } from '../calculate-item-points';

export function calculateMaximumNotableItemsPoints(
  dropRates: DroppedItemResponse,
  scaling: number,
) {
  const maxAvailablePoints = Object.entries(itemList).reduce(
    (acc, [, { items }]) => {
      const categoryTotalPoints = items.reduce(
        (categoryAcc, val) =>
          !val.points && isCollectionLogItem(val)
            ? categoryAcc + calculateItemPoints(dropRates, val.requiredItems)
            : categoryAcc + val.points,
        0,
      );

      return acc + categoryTotalPoints;
    },
    0,
  );

  return Math.floor(maxAvailablePoints * scaling);
}
