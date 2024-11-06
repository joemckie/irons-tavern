import { DiaryLocation, DiaryTier, diaryTierSchema } from '@/types/osrs';
import { AchievementDiaryMap } from '@/types/rank-calculator';
import { DiaryTierData, WikiSyncResponse } from '@/types/wiki';

export function parseAchievementDiaries(
  diaries: WikiSyncResponse['achievement_diaries'],
) {
  return Object.entries(diaries).reduce<AchievementDiaryMap>(
    (acc, [diaryLocation, diaryTiers]) => {
      const orderedTiers = [
        [diaryTierSchema.enum.Easy, diaryTiers.Easy],
        [diaryTierSchema.enum.Medium, diaryTiers.Medium],
        [diaryTierSchema.enum.Hard, diaryTiers.Hard],
        [diaryTierSchema.enum.Elite, diaryTiers.Elite],
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
      Ardougne: diaryTierSchema.enum.None,
      Desert: diaryTierSchema.enum.None,
      Falador: diaryTierSchema.enum.None,
      Fremennik: diaryTierSchema.enum.None,
      Kandarin: diaryTierSchema.enum.None,
      Karamja: diaryTierSchema.enum.None,
      'Kourend & Kebos': diaryTierSchema.enum.None,
      'Lumbridge & Draynor': diaryTierSchema.enum.None,
      Morytania: diaryTierSchema.enum.None,
      Varrock: diaryTierSchema.enum.None,
      'Western Provinces': diaryTierSchema.enum.None,
      Wilderness: diaryTierSchema.enum.None,
    } satisfies AchievementDiaryMap,
  );
}
