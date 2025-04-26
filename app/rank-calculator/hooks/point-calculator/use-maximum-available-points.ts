import { useEffect, useState } from 'react';
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
  const [maximumAvailablePoints, setMaximumAvailablePoints] = useState(0);

  useEffect(() => {
    async function fetchMaximumAvailablePoints() {
      if (maximumCollectionLogSlotCount) {
        const points = calculateMaximumAvailablePoints(
          maximumCollectionLogSlotCount,
        );

        setMaximumAvailablePoints(points);
      }
    }

    fetchMaximumAvailablePoints();
  }, [maximumCollectionLogSlotCount]);

  return maximumAvailablePoints;
}
