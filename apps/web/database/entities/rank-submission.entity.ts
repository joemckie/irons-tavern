import type { AchievementDiaryMap } from '@/app/schemas/rank-calculator';
import { RankSubmissionStatus } from '@/app/schemas/rank-calculator';
import type { RankCalculatorSchema } from '@/app/rank-calculator/[player]/submit-rank-calculator-validation';
import { CombatAchievementTier, TzHaarCape } from '@/app/schemas/osrs';
import { defineEntity, p } from '@mikro-orm/core';
import { randomUUID } from 'node:crypto';
import { OSRSAccount } from './osrs-account';

/**
 * The rank calculator form data, as saved by the user
 */
export type RankSubmissionData = Omit<RankCalculatorSchema, 'rank' | 'points'>;

const RankSubmissionMetadataSchema = defineEntity({
  name: 'RankSubmissionMetadata',
  embeddable: true,
  properties: {
    status: p.enum(() => RankSubmissionStatus.enum),
    discordMessageId: p.string(),
    submittedBy: p.string(),
    submittedAt: p.datetime(),
    actionedBy: p.string().nullable(),
    hasTemplePlayerStats: p.boolean(),
    hasTempleCollectionLog: p.boolean(),
    isTempleCollectionLogOutdated: p.boolean(),
    hasWikiSyncData: p.boolean(),
    automaticApproval: p.boolean().nullable(),
  },
});

export class RankSubmissionMetadata
  extends RankSubmissionMetadataSchema.class {}

RankSubmissionMetadataSchema.setClass(RankSubmissionMetadata);

const RankSubmissionDiffSchema = defineEntity({
  name: 'RankSubmissionDiff',
  embeddable: true,
  properties: {
    achievementDiaries: p.json<AchievementDiaryMap>().nullable(),
    acquiredItems: p.json<string[]>().nullable(),
    combatAchievementTier: p.enum(() => CombatAchievementTier.enum).nullable(),
    totalLevel: p.integer().nullable(),
    collectionLogCount: p.integer().nullable(),
    tzhaarCape: p.enum(() => TzHaarCape.enum).nullable(),
    hasBloodTorva: p.boolean().nullable(),
    hasDizanasQuiver: p.boolean().nullable(),
    hasAchievementDiaryCape: p.boolean().nullable(),
    hasMaxCape: p.boolean().nullable(),
  },
});

export class RankSubmissionDiff extends RankSubmissionDiffSchema.class {}

RankSubmissionDiffSchema.setClass(RankSubmissionDiff);

const RankSubmissionSchema = defineEntity({
  name: 'RankSubmission',
  tableName: 'rank_submission',
  properties: {
    id: p.uuid().primary(),
    data: p.json<RankSubmissionData>(),
    metadata: p.embedded(RankSubmissionMetadata).object(true),
    diff: p.embedded(RankSubmissionDiff).object(true),
    // Submissions are kept for posterity when the account is deleted
    osrsAccount: () =>
      p.manyToOne(OSRSAccount).nullable().deleteRule('set null'),
  },
});

export class RankSubmission extends RankSubmissionSchema.class {
  id: string = randomUUID();
}

RankSubmissionSchema.setClass(RankSubmission);
