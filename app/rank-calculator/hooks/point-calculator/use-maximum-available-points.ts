import { useWatch } from 'react-hook-form';
import { RankCalculatorSchema } from '../../[player]/submit-rank-calculator-validation';
import { calculateMaximumAvailablePoints } from '../../utils/calculators/calculate-maximum-available-points';

export function useMaximumAvailablePoints() {
  const maximumCollectionLogSlotCount = useWatch<
    RankCalculatorSchema,
    'collectionLogTotal'
  >({
    name: 'collectionLogTotal',
  });

  return calculateMaximumAvailablePoints(maximumCollectionLogSlotCount);
}
