import { DiaryLocation } from '@/types/osrs';
import { FormData } from '@/types/rank-calculator';
import { useWatch } from 'react-hook-form';

export function usePointCalculator() {
  const totalLevel = useWatch<FormData, 'totalLevel'>({ name: 'totalLevel' });
  const joinDate = useWatch<FormData, 'joinDate'>({ name: 'joinDate' });
  const items = useWatch<FormData, 'items'>({ name: 'items' });
  const ehp = useWatch<FormData, 'ehp'>({ name: 'ehp' });
  const ehb = useWatch<FormData, 'ehb'>({ name: 'ehb' });
  const achievementDiaries = useWatch<FormData, 'achievementDiaries'>({
    name: 'achievementDiaries',
  });
  const caTier = useWatch<FormData, 'caTier'>({ name: 'caTier' });

  // console.log({
  //   totalLevel,
  //   joinDate,
  //   items,
  //   ehp,
  //   ehb,
  //   achievementDiaries,
  //   caTier,
  // });

  return {
    collectionLogSlotPoints: 0,
    totalLevelPoints: 0,
    ehpPoints: 0,
    ehbPoints: 0,
    achievementDiariesPoints: Object.entries(achievementDiaries).reduce(
      (acc, [location, _tier]) => ({
        ...acc,
        [location]: 0,
      }),
      {} as Record<DiaryLocation, number>,
    ),
    caTierPoints: 0,
  };
}
