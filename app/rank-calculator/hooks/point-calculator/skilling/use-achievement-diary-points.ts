import { useWatch } from 'react-hook-form';
import { DiaryLocation, DiaryTier } from '@/types/osrs';
import { achievementDiaryTierPoints, FormData } from '@/types/rank-calculator';
import { useCalculatorScaling } from '../use-calculator-scaling';

export function useAchievementDiaryPoints() {
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
