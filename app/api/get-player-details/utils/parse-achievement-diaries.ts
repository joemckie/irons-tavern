import { DiaryLocation, DiaryTier } from '@/types/osrs';
import { AchievementDiaryMap, PlayerData } from '@/types/rank-calculator';
import { DiaryTierData, WikiSyncResponse } from '@/types/wiki';

export const emptyAchievementDiaryList = {
  achievementDiaries: null,
  acquiredItems: null,
  joinDate: null,
  collectionLogCount: null,
  collectionLogTotal: null,
  combatAchievementTier: null,
} satisfies PlayerData;

export function parseAchievementDiaries(
  diaries: WikiSyncResponse['achievement_diaries'],
) {
  return Object.entries(diaries).reduce<AchievementDiaryMap>(
    (acc, [diaryLocation, diaryTiers]) => {
      const orderedTiers = [
        [DiaryTier.Easy, diaryTiers.Easy],
        [DiaryTier.Medium, diaryTiers.Medium],
        [DiaryTier.Hard, diaryTiers.Hard],
        [DiaryTier.Elite, diaryTiers.Elite],
      ] satisfies [DiaryTier, DiaryTierData][];

      orderedTiers.forEach(([tierName, tierData]) => {
        if (tierData.complete) {
          acc[diaryLocation as DiaryLocation] = tierName;
        }
      });

      return acc;
    },
    {
      Ardougne: null,
      Desert: null,
      Falador: null,
      Fremennik: null,
      Kandarin: null,
      Karamja: null,
      'Kourend & Kebos': null,
      'Lumbridge & Draynor': null,
      Morytania: null,
      Varrock: null,
      'Western Provinces': null,
      Wilderness: null,
    } satisfies AchievementDiaryMap,
  );
}
