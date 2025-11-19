import { pointsConfig } from '@/app/rank-calculator/config/points';
import { useCalculatorScaling } from '../use-calculator-scaling';

export function useMaxSkillingPoints() {
  const scaling = useCalculatorScaling();

  const {
    maximumTotalLevelPoints,
    maximumAchievementDiaryPoints,
  } = pointsConfig;

  return (
    (maximumAchievementDiaryPoints + maximumTotalLevelPoints) *
    scaling
  );
}
