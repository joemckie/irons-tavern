import { useWatch } from 'react-hook-form';
import { RankCalculatorSchema } from '../../[player]/submit-rank-calculator-validation';
import { calculateMaximumAvailablePoints } from '../../utils/calculators/calculate-maximum-available-points';
import { useItemList } from '../../contexts/item-list-context';

export function useMaximumAvailablePoints() {
  const maximumCollectionLogSlotCount = useWatch<
    RankCalculatorSchema,
    'collectionLogTotal'
  >({
    name: 'collectionLogTotal',
  });
  const notableItems = useItemList();

  return calculateMaximumAvailablePoints(
    notableItems,
    maximumCollectionLogSlotCount,
  );
}
