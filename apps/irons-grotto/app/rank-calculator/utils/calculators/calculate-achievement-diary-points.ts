import { DiaryLocation, DiaryTier } from '@/app/schemas/osrs';
import { AchievementDiaryMap } from '@/app/schemas/rank-calculator';
import { achievementDiaryTierPoints } from '../../config/points';

export function calculateAchievementDiaryPoints(
  achievementDiaries: AchievementDiaryMap,
  scaling: number,
) {
  const pointMap = (
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

  const pointsAwarded = Object.values(pointMap).reduce(
    (acc, val) => acc + val,
    0,
  );

  return {
    pointMap,
    pointsAwarded,
  };
}
