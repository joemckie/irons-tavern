import { useWatch } from 'react-hook-form';
import { RankCalculatorSchema } from '@/app/rank-calculator/[player]/submit-rank-calculator-validation';
import { calculateMaxCapePoints } from '@/app/rank-calculator/utils/calculators/calculate-max-cape-points';
import { useCalculatorScaling } from '../use-calculator-scaling';

export function useAchievementDiaryCapePoints() {
  const hasAchievementDiaryCape = useWatch<
    RankCalculatorSchema,
    'hasAchievementDiaryCape'
  >({
    name: 'hasAchievementDiaryCape',
  });
  const scaling = useCalculatorScaling();

  return calculateMaxCapePoints(hasAchievementDiaryCape || false, scaling);
}
