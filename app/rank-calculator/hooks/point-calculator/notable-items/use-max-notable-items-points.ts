import { useGetItems } from '../../use-get-items';
import { useCalculatorScaling } from '../use-calculator-scaling';

export function useMaxNotableItemsPoints() {
  const { data } = useGetItems();
  const scaling = useCalculatorScaling();

  const maxAvailablePoints = data.reduce((acc, [, { items }]) => {
    const categoryTotalPoints = items.reduce(
      (categoryAcc, val) => categoryAcc + val.points,
      0,
    );

    return acc + categoryTotalPoints;
  }, 0);

  return Math.floor(maxAvailablePoints * scaling);
}
