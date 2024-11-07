import { DiaryLocation, DiaryTier } from '@/app/schemas/osrs';
import { AchievementDiaryMap } from '@/app/schemas/rank-calculator';
import { DiaryTierData, WikiSyncResponse } from '@/app/schemas/wiki';

export function parseAchievementDiaries(
  diaries: WikiSyncResponse['achievement_diaries'],
) {
  return Object.entries(diaries).reduce<AchievementDiaryMap>(
    (acc, [diaryLocation, diaryTiers]) => {
      const orderedTiers = [
        ['Easy', diaryTiers.Easy],
        ['Medium', diaryTiers.Medium],
        ['Hard', diaryTiers.Hard],
        ['Elite', diaryTiers.Elite],
      ] satisfies [DiaryTier, DiaryTierData][];

      orderedTiers.forEach(([tierName, tierData]) => {
        // WikiSync isn't 100% reliable with the "complete" field
        // Sometimes it's false when all tasks are marked as completed and vice versa
        if (tierData.complete || tierData.tasks.every(Boolean)) {
          acc[diaryLocation as DiaryLocation] = tierName;
        }
      });

      return acc;
    },
    {
      Ardougne: 'None',
      Desert: 'None',
      Falador: 'None',
      Fremennik: 'None',
      Kandarin: 'None',
      Karamja: 'None',
      'Kourend & Kebos': 'None',
      'Lumbridge & Draynor': 'None',
      Morytania: 'None',
      Varrock: 'None',
      'Western Provinces': 'None',
      Wilderness: 'None',
    } satisfies AchievementDiaryMap,
  );
}
