import { DiaryLocation, DiaryTier } from '@/types/osrs';
import {
  achievementDiaryTierPoints,
  CommonPointCalculatorData,
  FormData,
} from '@/types/rank-calculator';
import { useWatch } from 'react-hook-form';
import { useCalculatorScaling } from '../use-calculator-scaling';

function useDiaryPoints() {
  const scaling = useCalculatorScaling();
  const achievementDiaries = useWatch<FormData, 'achievementDiaries'>({
    name: 'achievementDiaries',
  });
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

  const pointsAwarded = Object.values(achievementDiariesPoints).reduce(
    (acc, val) => acc + val,
    0,
  );

  return {
    pointMap: achievementDiariesPoints,
    pointsAwarded,
  };
}

function useEhpPoints() {
  const ehp = useWatch<FormData, 'ehp'>({ name: 'ehp' });
  const scaling = useCalculatorScaling();
  const pointsPerEhp = 10;
  const ehpPoints = Math.floor(
    Number((ehp * pointsPerEhp * scaling).toFixed(3)),
  );

  return ehpPoints;
}

// function useTotalLevelPoints() {
//   const totalLevel = useWatch<FormData, 'totalLevel'>({ name: 'totalLevel' });
//   const scaling = useCalculatorScaling();
// }

export interface SkillingPointCalculatorData extends CommonPointCalculatorData {
  ehpPoints: number;
  totalLevelPoints: number;
  achievementDiariesPoints: Record<DiaryLocation, number>;
}

export function useSkillingPointCalculator() {
  const {
    pointMap: achievementDiariesPoints,
    pointsAwarded: totalAchievementDiaryPointsAwarded,
  } = useDiaryPoints();
  const ehpPoints = useEhpPoints();

  const totalPointsAvailable = 50000;
  const pointsAwarded = totalAchievementDiaryPointsAwarded;
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
