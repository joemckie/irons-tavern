import { pointsConfig } from '@/app/rank-calculator/config/points';
import { useCalculatorScaling } from '../use-calculator-scaling';

export function useMaxSkillingPoints() {
  const scaling = useCalculatorScaling();

  // Remove this when Sailing is released
  // It is used to make max points equal 100% pre-Sailing
  const {
    sailingOffset,
    maximumTotalLevelPoints: maxTotalLevelPoints,
    maximumAchievementDiaryPoints,
  } = pointsConfig;

  return (
    (maximumAchievementDiaryPoints + maxTotalLevelPoints - sailingOffset) *
    scaling
  );
}
