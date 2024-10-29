import { DiaryLocation } from '@/types/osrs';
import { CommonPointCalculatorData } from '@/types/rank-calculator';
import { useAchievementDiaryPoints } from './use-achievement-diary-points';
import { useEhpPoints } from './use-ehp-points';
import { useTotalLevelPoints } from './use-total-level-points';
import { useMaxSkillingPoints } from './use-max-skilling-points';

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
  const totalPointsAvailable = useMaxSkillingPoints();
  const pointsAwarded = totalAchievementDiaryPointsAwarded;
  const pointsRemaining = totalPointsAvailable - pointsAwarded;
  const pointsAwardedPercentage = (pointsAwarded / totalPointsAvailable) * 100;

  return {
    pointsAwarded,
    pointsAwardedPercentage,
    pointsRemaining,
    ehpPoints,
    totalLevelPoints,
    achievementDiariesPoints,
  } satisfies SkillingPointCalculatorData;
}
