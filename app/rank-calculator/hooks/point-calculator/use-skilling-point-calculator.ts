import { DiaryLocation, DiaryTier } from '@/types/osrs';
import {
  achievementDiaryTierPoints,
  CommonPointCalculatorData,
  FormData,
} from '@/types/rank-calculator';
import { useWatch } from 'react-hook-form';
import { useCalculatorScaling } from './use-calculator-scaling';

export interface SkillingPointCalculatorData extends CommonPointCalculatorData {
  ehpPoints: number;
  totalLevelPoints: number;
  achievementDiariesPoints: Record<DiaryLocation, number>;
}

export function useSkillingPointCalculator() {
  const pointsPerEhp = 10;
  const scaling = useCalculatorScaling();
  const ehp = useWatch<FormData, 'ehp'>({ name: 'ehp' });
  const achievementDiaries = useWatch<FormData, 'achievementDiaries'>({
    name: 'achievementDiaries',
  });
  const unscaledTotalDiaryPoints =
    Object.values(DiaryLocation).length * achievementDiaryTierPoints.Elite;
  const scaledTotalDiaryPoints = unscaledTotalDiaryPoints * scaling;
  const achievementDiariesPoints = (
    Object.entries(achievementDiaries) as [DiaryLocation, DiaryTier][]
  ).reduce<Record<DiaryLocation, number>>(
    (acc, [location, tier]) => ({
      ...acc,
      [location]: Math.floor(achievementDiaryTierPoints[tier] * scaling),
    }),
    {
      'Kourend & Kebos': 0,
      'Lumbridge & Draynor': 0,
      'Western Provinces': 0,
      Ardougne: 0,
      Desert: 0,
      Falador: 0,
      Fremennik: 0,
      Kandarin: 0,
      Karamja: 0,
      Morytania: 0,
      Varrock: 0,
      Wilderness: 0,
    } satisfies Record<DiaryLocation, number>,
  );
  const ehpPoints = Math.floor((ehp * pointsPerEhp * scaling).toFixed(10));
  const pointsAwarded = Object.values(achievementDiariesPoints).reduce(
    (acc, val) => acc + val,
  );
  const totalPointsAvailable = scaledTotalDiaryPoints;
  const pointsRemaining = totalPointsAvailable - pointsAwarded;
  const pointsAwardedPercentage = (pointsAwarded / totalPointsAvailable) * 100;

  return {
    pointsAwarded,
    pointsAwardedPercentage,
    pointsRemaining,
    ehpPoints,
    totalLevelPoints: 0,
    achievementDiariesPoints,
  } satisfies SkillingPointCalculatorData;
}
