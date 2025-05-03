import { useWatch } from 'react-hook-form';
import { RankCalculatorSchema } from '@/app/rank-calculator/[player]/submit-rank-calculator-validation';
import { calculateAchievementDiaryCapePoints } from '@/app/rank-calculator/utils/calculators/calculate-achievement-diary-cape-points';
import { useCalculatorScaling } from '../use-calculator-scaling';

export function useAchievementDiaryCapePoints() {
  const hasAchievementDiaryCape = useWatch<
    RankCalculatorSchema,
    'hasAchievementDiaryCape'
  >({
    name: 'hasAchievementDiaryCape',
  });
  const scaling = useCalculatorScaling();

  return calculateAchievementDiaryCapePoints(hasAchievementDiaryCape, scaling);
}
