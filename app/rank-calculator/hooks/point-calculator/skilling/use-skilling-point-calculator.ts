import { DiaryLocation } from '@/app/schemas/osrs';
import { CommonPointCalculatorData } from '@/app/schemas/rank-calculator';
import { calculateSkillingPoints } from '@/app/rank-calculator/utils/calculators/calculate-skilling-points';
import { useAchievementDiaryPoints } from './use-achievement-diary-points';
import { useEhpPoints } from './use-ehp-points';
import { useTotalLevelPoints } from './use-total-level-points';
import { useCalculatorScaling } from '../use-calculator-scaling';
import { useAchievementDiaryCapePoints } from './use-achievement-diary-cape-points';
import { useMaxCapePoints } from './use-max-cape-points';
import { useWatch } from 'react-hook-form';
import { RankCalculatorSchema } from '@/app/rank-calculator/[player]/submit-rank-calculator-validation';

export interface SkillingPointCalculatorData extends CommonPointCalculatorData {
  ehpPoints: number;
  totalLevelPoints: number;
  achievementDiariesPoints: Record<DiaryLocation, number>;
  achievementDiaryCapePoints: number;
  maxCapePoints: number;
}

export function useSkillingPointCalculator() {
  const rawMultiplier = useWatch<RankCalculatorSchema, 'skillingMultiplier'>({
    name: 'skillingMultiplier',
  });
  const multiplier = 1 + rawMultiplier / 100;

  const {
    pointMap: achievementDiariesPoints,
    pointsAwarded: totalAchievementDiaryPointsAwarded,
  } = useAchievementDiaryPoints();
  const ehpPoints = useEhpPoints();
  const totalLevelPoints = useTotalLevelPoints();
  const achievementDiaryCapePoints = useAchievementDiaryCapePoints();
  const maxCapePoints = useMaxCapePoints();
  const scaling = useCalculatorScaling();
  const { pointsAwarded, pointsAwardedPercentage, pointsRemaining } =
    calculateSkillingPoints(
      totalAchievementDiaryPointsAwarded,
      ehpPoints,
      totalLevelPoints,
      achievementDiaryCapePoints,
      maxCapePoints,
      multiplier,
      scaling,
    );

  return {
    pointsAwarded,
    pointsAwardedPercentage,
    pointsRemaining,
    ehpPoints,
    totalLevelPoints,
    achievementDiariesPoints,
    achievementDiaryCapePoints,
    maxCapePoints,
  } satisfies SkillingPointCalculatorData;
}
