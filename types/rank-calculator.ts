import { DiaryLocation, DiaryTier } from './osrs';

export type AchievementDiaryMap = Record<DiaryLocation, DiaryTier | null>;

export interface PlayerData {
  acquiredItems: string[];
  achievementDiaries: Record<DiaryLocation, DiaryTier | null>;
}
