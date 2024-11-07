import { DiaryLocation } from '@/app/schemas/osrs';
import { CommonPointCalculatorData } from '@/app/schemas/rank-calculator';
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
  const pointsAwarded = totalAchievementDiaryPointsAwarded + totalLevelPoints;
  const pointsRemaining = totalPointsAvailable - pointsAwarded;
  const pointsAwardedPercentage = pointsAwarded / totalPointsAvailable;

  return {
    pointsAwarded: pointsAwarded + ehpPoints,
    pointsAwardedPercentage,
    pointsRemaining,
    ehpPoints,
    totalLevelPoints,
    achievementDiariesPoints,
  } satisfies SkillingPointCalculatorData;
}
