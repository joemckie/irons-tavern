import {
  Embeddable,
  Embedded,
  Entity,
  Enum,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/decorators/es';
import type { OSRSAccount } from './osrs-account';
import { randomUUID } from 'node:crypto';
import type { AchievementDiaryMap } from '@/app/schemas/rank-calculator';
import { CombatAchievementTier, TzHaarCape } from '@/app/schemas/osrs';

@Embeddable()
export class RankSubmissionMetadata {
  @Property()
  discordMessageId!: string;

  @Property()
  submittedBy!: string;

  @Property()
  submittedAt!: Date;

  @Property()
  actionedBy?: string;

  @Property()
  hasTemplePlayerStats!: boolean;

  @Property()
  hasTempleCollectionLog!: boolean;

  @Property()
  isTempleCollectionLogOutdated!: boolean;

  @Property()
  hasWikiSyncData!: boolean;

  @Property()
  automaticApproval?: boolean;
}

@Embeddable()
export class RankSubmissionDiff {
  @Property()
  achievementDiaries!: AchievementDiaryMap;

  @Property()
  acquiredItems?: string[];

  @Enum(() => CombatAchievementTier.enum)
  combatAchievementTier?: CombatAchievementTier;

  @Property()
  totalLevel?: number;

  @Property()
  collectionLogCount?: number;

  @Enum(() => TzHaarCape.enum)
  tzhaarCape?: TzHaarCape;

  @Property()
  hasBloodTorva?: boolean;

  @Property()
  hasDizanasQuiver?: boolean;

  @Property()
  hasAchievementDiaryCape?: boolean;

  @Property()
  hasMaxCape?: boolean;
}

@Entity({ tableName: 'rank_submission' })
export class RankSubmission {
  @PrimaryKey({ type: 'uuid' })
  id = randomUUID();

  @Embedded({ object: true })
  metadata!: RankSubmissionMetadata;

  @Embedded({ object: true })
  diff!: RankSubmissionDiff;

  @ManyToOne()
  osrsAccount!: OSRSAccount;
}
