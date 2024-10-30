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

export type AchievementDiaryMap = Record<DiaryLocation, DiaryTier>;

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
  rankStructure: RankStructure | null;
}

export interface FormData {
  acquiredItems: Record<string, boolean>;
  achievementDiaries: AchievementDiaryMap;
  joinDate: Date;
  collectionLogCount: number;
  collectionLogTotal: number;
  combatAchievementTier: CombatAchievementTier;
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

export const achievementDiaryTierPoints: Record<DiaryTier, number> = {
  get None() {
    return this.Elite * 0;
  },
  get Easy() {
    return this.Elite * 0.1;
  },
  get Medium() {
    return this.Elite * 0.3;
  },
  get Hard() {
    return this.Elite * 0.6;
  },
  Elite: 1000,
};
