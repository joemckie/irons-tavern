import type { AchievementDiaryMap } from '@/app/schemas/rank-calculator';
import { CombatAchievementTier, TzHaarCape } from '@/app/schemas/osrs';
import { defineEntity, p } from '@mikro-orm/core';
import { randomUUID } from 'node:crypto';
import { OSRSAccount } from './osrs-account';

const RankSubmissionMetadataSchema = defineEntity({
  name: 'RankSubmissionMetadata',
  embeddable: true,
  properties: {
    discordMessageId: p.string(),
    submittedBy: p.string(),
    submittedAt: p.date(),
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
    achievementDiaries: p.json(),
    acquiredItems: p.json().nullable(),
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

export class RankSubmissionDiff extends RankSubmissionDiffSchema.class {
  achievementDiaries!: AchievementDiaryMap;
}

RankSubmissionDiffSchema.setClass(RankSubmissionDiff);

const RankSubmissionSchema = defineEntity({
  name: 'RankSubmission',
  tableName: 'rank_submission',
  properties: {
    id: p.uuid().primary(),
    metadata: p.embedded(RankSubmissionMetadata).object(true),
    diff: p.embedded(RankSubmissionDiff).object(true),
    osrsAccount: () => p.manyToOne(OSRSAccount),
  },
});

export class RankSubmission extends RankSubmissionSchema.class {
  id = randomUUID();
}

RankSubmissionSchema.setClass(RankSubmission);
