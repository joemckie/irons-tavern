import { DiaryLocation } from '@/app/schemas/osrs';
import { CommonPointCalculatorData } from '@/app/schemas/rank-calculator';
import { calculateSkillingPoints } from '@/app/rank-calculator/utils/calculators/calculate-skilling-points';
import { useAchievementDiaryPoints } from './use-achievement-diary-points';
import { useEhpPoints } from './use-ehp-points';
import { useTotalLevelPoints } from './use-total-level-points';
import { useCalculatorScaling } from '../use-calculator-scaling';

export interface SkillingPointCalculatorData extends CommonPointCalculatorData {
  ehpPoints: number;
  totalLevelPoints: number;
  achievementDiariesPoints: Record<DiaryLocation, number>;
}

export function useSkillingPointCalculator() {
  const {
    pointMap: achievementDiariesPoints,
    pointsAwarded: totalAchievementDiaryPointsAwarded,
  } = useAchievementDiaryPoints();
  const ehpPoints = useEhpPoints();
  const totalLevelPoints = useTotalLevelPoints();
  const scaling = useCalculatorScaling();
  const { pointsAwarded, pointsAwardedPercentage, pointsRemaining } =
    calculateSkillingPoints(
      totalAchievementDiaryPointsAwarded,
      ehpPoints,
      totalLevelPoints,
      scaling,
    );

  return {
    pointsAwarded,
    pointsAwardedPercentage,
    pointsRemaining,
    ehpPoints,
    totalLevelPoints,
    achievementDiariesPoints,
  } satisfies SkillingPointCalculatorData;
}
