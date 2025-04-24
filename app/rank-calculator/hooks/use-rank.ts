import { useWatch } from 'react-hook-form';
import { RankCalculatorSchema } from '../[player]/submit-rank-calculator-validation';
import { calculateRank } from '../utils/calculators/calculate-rank';
import { useMaximumAvailablePoints } from './point-calculator/use-maximum-available-points';

export function useRank(pointsAwarded: number) {
  const rankStructure = useWatch<RankCalculatorSchema, 'rankStructure'>({
    name: 'rankStructure',
  });
  const maximumAvailablePoints = useMaximumAvailablePoints();

  return calculateRank(maximumAvailablePoints, pointsAwarded, rankStructure);
}
