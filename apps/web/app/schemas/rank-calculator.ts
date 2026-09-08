import { z } from 'zod';
import {
  CombatAchievementTier,
  DiaryLocation,
  DiaryTier,
  TzHaarCape,
} from './osrs';
import { RankCalculatorSchema } from '../rank-calculator/[player]/submit-rank-calculator-validation';
import { Rank } from '@/config/enums';

export const RankStructure = z.enum([
  'Standard',
  'Legacy',
  'Admin',
  'Moderator',
  'Deputy Owner',
  'Owner',
]);

export type RankStructure = z.infer<typeof RankStructure>;

export const AchievementDiaryMap = z.record(DiaryLocation, DiaryTier);

export type AchievementDiaryMap = z.infer<typeof AchievementDiaryMap>;

export interface CommonPointCalculatorData {
  pointsAwarded: number;
  pointsAwardedPercentage: number;
  pointsRemaining: number;
}

export interface BonusPointCalculatorData {
  bonusPointsAwarded: number;
  bonusMultiplier: number;
}

export const RankSubmissionStatus = z.enum(['Pending', 'Approved', 'Rejected']);

export type RankSubmissionStatus = z.infer<typeof RankSubmissionStatus>;

export const RankSubmissionMetadata = z.object({
  status: RankSubmissionStatus,
  discordMessageId: z.string(),
  submittedBy: z.string(),
  submittedAt: z.date(),
  actionedBy: z.string().nullable(),
  hasTemplePlayerStats: z.boolean(),
  hasTempleCollectionLog: z.boolean(),
  isTempleCollectionLogOutdated: z.boolean(),
  hasWikiSyncData: z.boolean(),
  automaticApproval: z.boolean().optional(),
});

export type RankSubmissionMetadata = z.infer<typeof RankSubmissionMetadata>;

export const RankSubmissionDiff = z.object({
  achievementDiaries: AchievementDiaryMap.nullable(),
  acquiredItems: z.array(z.string()).nullable(),
  combatAchievementTier: CombatAchievementTier.nullable(),
  totalLevel: z.number().nullable(),
  collectionLogCount: z.number().nullable(),
  tzhaarCape: TzHaarCape.nullable(),
  hasBloodTorva: z.boolean().nullable(),
  hasDizanasQuiver: z.boolean().nullable(),
  hasAchievementDiaryCape: z.boolean().nullable(),
  hasMaxCape: z.boolean().nullable(),
});

export type RankSubmissionDiff = z.infer<typeof RankSubmissionDiff>;

export const PlayerDetailsResponse = RankCalculatorSchema.omit({
  rank: true,
  points: true,
}).extend({
  currentRank: Rank.optional(),
  hasTemplePlayerStats: z.boolean(),
  hasTempleCollectionLog: z.boolean(),
  hasWikiSyncData: z.boolean(),
  hasThirdPartyData: z.boolean(),
  isTempleCollectionLogOutdated: z.boolean(),
  isMobileOnly: z.boolean(),
});

export type PlayerDetailsResponse = z.infer<typeof PlayerDetailsResponse>;
