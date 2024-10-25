import { CombatAchievementTier, DiaryLocation, DiaryTier } from './osrs';

export enum RankStructure {
  Standard = 'Standard',
  BingoWinner = 'Bingo Winner',
  Legacy = 'Legacy',
  Inviter = 'Inviter',
  Admin = 'Admin',
  Moderator = 'Moderator',
  DeputyOwner = 'Deputy Owner',
  Owner = 'Owner',
}

export type AchievementDiaryMap = Record<DiaryLocation, DiaryTier | 'None'>;

export interface PlayerData {
  acquiredItems: string[] | null;
  achievementDiaries: AchievementDiaryMap | null;
  joinDate: Date | null;
  collectionLogCount: number | null;
  collectionLogTotal: number | null;
  combatAchievementTier: CombatAchievementTier | null;
  ehp: number | null;
  ehb: number | null;
  totalLevel: number | null;
  playerName: string | null;
  rankStructure: RankStructure;
}

export interface FormData {
  achievementDiaries: AchievementDiaryMap;
  collectionLogCount: number;
  playerName: string;
  items: Record<string, boolean>;
  caTier: CombatAchievementTier | 'None';
  ehb: number;
  ehp: number;
  joinDate: Date | null;
  totalLevel: number;
  rankStructure: RankStructure;
}

export interface CategoryPointCalculatorData {
  [key: string]: unknown;
  pointsAwarded: number;
  pointsAwardedPercentage: number;
  pointsRemaining: number;
}
