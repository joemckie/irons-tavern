import { z } from 'zod';
import { CombatAchievementTier, DiaryLocation, DiaryTier } from './osrs';

export const RankStructure = z.enum([
  'Standard',
  'Bingo Winner',
  'Legacy',
  'Inviter',
  'Admin',
  'Moderator',
  'Deputy Owner',
  'Owner',
]);

export type RankStructure = z.infer<typeof RankStructure>;

export const AchievementDiaryMap = z.record(DiaryLocation, DiaryTier);

export type AchievementDiaryMap = z.infer<typeof AchievementDiaryMap>;

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
  proofLink: string | null;
}

export interface CommonPointCalculatorData {
  pointsAwarded: number;
  pointsAwardedPercentage: number;
  pointsRemaining: number;
}

export const achievementDiaryTierPoints = {
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
  get Elite() {
    return 1000;
  },
} satisfies Record<DiaryTier, number>;
