import { itemList } from '@/data/item-list';

export async function calculateMaximumNotableItemsPoints(scaling: number) {
  const maxAvailablePoints = Object.entries(await itemList).reduce(
    (acc, [, { items }]) => {
      const categoryTotalPoints = items.reduce(
        (categoryAcc, val) => categoryAcc + (val.points ?? 0),
        0,
      );

      return acc + categoryTotalPoints;
    },
    0,
  );

  return Math.floor(maxAvailablePoints * scaling);
}
