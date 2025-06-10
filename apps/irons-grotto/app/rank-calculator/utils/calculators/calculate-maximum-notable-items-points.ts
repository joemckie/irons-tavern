import { ItemCategory } from '@/app/schemas/items';

export function calculateMaximumNotableItemsPoints(
  notableItems: [string, ItemCategory][],
  scaling: number,
) {
  const maxAvailablePoints = notableItems.reduce((acc, [, { items }]) => {
    const categoryTotalPoints = items.reduce(
      (categoryAcc, val) => categoryAcc + val.points,
      0,
    );

    return acc + categoryTotalPoints;
  }, 0);

  return Math.floor(maxAvailablePoints * scaling);
}
