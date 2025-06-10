import { useWatch } from 'react-hook-form';
import { RankCalculatorSchema } from '../../[player]/submit-rank-calculator-validation';
import { calculateMaximumAvailablePoints } from '../../utils/calculators/calculate-maximum-available-points';
import { useGetItems } from '../use-get-items';

export function useMaximumAvailablePoints() {
  const maximumCollectionLogSlotCount = useWatch<
    RankCalculatorSchema,
    'collectionLogTotal'
  >({
    name: 'collectionLogTotal',
  });
  const { data: notableItems } = useGetItems();

  return calculateMaximumAvailablePoints(
    notableItems,
    maximumCollectionLogSlotCount,
  );
}
