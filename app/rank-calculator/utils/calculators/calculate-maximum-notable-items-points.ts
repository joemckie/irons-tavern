import { itemList } from '@/data/item-list';

export function calculateMaximumNotableItemsPoints(scaling: number) {
  const maxAvailablePoints = Object.entries(itemList).reduce(
    (acc, [, { items }]) => {
      const categoryTotalPoints = items.reduce(
        (categoryAcc, val) => categoryAcc + val.points,
        0,
      );

      return acc + categoryTotalPoints;
    },
    0,
  );

  return Math.floor(maxAvailablePoints * scaling);
}
