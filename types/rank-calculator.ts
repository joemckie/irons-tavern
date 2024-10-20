import { CombatAchievementTier, DiaryLocation, DiaryTier } from './osrs';

export type AchievementDiaryMap = Record<DiaryLocation, DiaryTier | null>;

export interface PlayerData {
  acquiredItems: string[] | null;
  achievementDiaries: AchievementDiaryMap | null;
  joinDate: string | null;
  collectionLogCount: number | null;
  collectionLogTotal: number | null;
  combatAchievementTier: CombatAchievementTier | null;
}

export interface FormData {
  achievementDiaries: AchievementDiaryMap;
  collectionLogCount: number;
  playerName: string;
  items: Record<string, boolean>;
  caTier: CombatAchievementTier | null;
  ehb: number;
  ehp: number;
}
