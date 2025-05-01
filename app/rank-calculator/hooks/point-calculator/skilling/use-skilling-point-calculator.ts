import { DiaryLocation } from '@/app/schemas/osrs';
import { CommonPointCalculatorData } from '@/app/schemas/rank-calculator';
import { calculateSkillingPoints } from '@/app/rank-calculator/utils/calculators/calculate-skilling-points';
import { useWatch } from 'react-hook-form';
import { RankCalculatorSchema } from '@/app/rank-calculator/[player]/submit-rank-calculator-validation';
import { useAchievementDiaryPoints } from './use-achievement-diary-points';
import { useEhpPoints } from './use-ehp-points';
import { useTotalLevelPoints } from './use-total-level-points';
import { useCalculatorScaling } from '../use-calculator-scaling';
import { useAchievementDiaryCapePoints } from './use-achievement-diary-cape-points';
import { useMaxCapePoints } from './use-max-cape-points';

export interface SkillingPointCalculatorData extends CommonPointCalculatorData {
  ehpPoints: number;
  totalLevelPoints: number;
  achievementDiariesPoints: Record<DiaryLocation, number>;
  achievementDiaryCapePoints: number;
  maxCapePoints: number;
}

export function useSkillingPointCalculator() {
  const skillingMultiplier = useWatch<
    RankCalculatorSchema,
    'skillingMultiplier'
  >({
    name: 'skillingMultiplier',
  });

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
      skillingMultiplier,
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
