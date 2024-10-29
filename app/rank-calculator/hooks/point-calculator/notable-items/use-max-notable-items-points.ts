import { useGetItems } from '../../use-get-items';

export function useMaxNotableItemsPoints() {
  const { data } = useGetItems();

  return data.reduce((acc, [, { items }]) => {
    const categoryTotalPoints = items.reduce(
      (categoryAcc, val) => categoryAcc + val.points,
      0,
    );

    return acc + categoryTotalPoints;
  }, 0);
}
