import { useWatch } from 'react-hook-form';
import { RankCalculatorSchema } from '../../[player]/submit-rank-calculator-validation';
import { calculateMaximumAvailablePoints } from '../../utils/calculators/calculate-maximum-available-points';
import { useDropRates } from '../use-drop-rates';

export function useMaximumAvailablePoints() {
  const maximumCollectionLogSlotCount = useWatch<
    RankCalculatorSchema,
    'collectionLogTotal'
  >({
    name: 'collectionLogTotal',
  });
  const { data: dropRates } = useDropRates();

  return calculateMaximumAvailablePoints(
    dropRates,
    maximumCollectionLogSlotCount,
  );
}
