import { useWatch } from 'react-hook-form';
import { RankCalculatorSchema } from '../[player]/submit-rank-calculator-validation';
import { calculateRank } from '../utils/calculators/calculate-rank';

export function useRank(pointsAwarded: number) {
  const rankStructure = useWatch<RankCalculatorSchema, 'rankStructure'>({
    name: 'rankStructure',
  });

  return calculateRank(pointsAwarded, rankStructure);
}
