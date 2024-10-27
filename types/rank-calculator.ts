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
  combatAchievementTier: CombatAchievementTier | 'None' | null;
  ehp: number | null;
  ehb: number | null;
  totalLevel: number | null;
  playerName: string | null;
  rankStructure: RankStructure | null;
}

export interface FormData {
  acquiredItems: Record<string, boolean>;
  achievementDiaries: AchievementDiaryMap;
  joinDate: Date;
  collectionLogCount: number;
  combatAchievementTier: CombatAchievementTier | 'None';
  ehb: number;
  ehp: number;
  totalLevel: number;
  playerName: string;
  rankStructure: RankStructure;
}

export interface CommonPointCalculatorData {
  pointsAwarded: number;
  pointsAwardedPercentage: number;
  pointsRemaining: number;
}
