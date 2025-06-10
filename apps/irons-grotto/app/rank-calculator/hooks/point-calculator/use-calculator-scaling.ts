import { useWatch } from 'react-hook-form';
import { calculateScaling } from '../../utils/calculators/calculate-scaling';
import { RankCalculatorSchema } from '../../[player]/submit-rank-calculator-validation';

export function useCalculatorScaling() {
  const joinDate = useWatch<RankCalculatorSchema, 'joinDate'>({
    name: 'joinDate',
  });

  return calculateScaling(joinDate);
}
