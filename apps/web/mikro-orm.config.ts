import { User } from './database/entities/user.entity';
import {
  RankSubmission,
  RankSubmissionDiff,
  RankSubmissionMetadata,
} from './database/entities/rank-submission.entity';
import { OSRSAccount } from './database/entities/osrs-account';
import { DraftRankSubmission } from './database/entities/draft-rank-submission.entity';
import { PlayerGameMode } from './database/entities/player-game-mode.entity';
import { defineConfig } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';
import { Migration20261110135542_initial } from './database/migrations/Migration20261110135542_initial';
import { Migration20261110141116_rank_calculator } from './database/migrations/Migration20261110141116_rank_calculator';

export default defineConfig({
  clientUrl: process.env.DATABASE_URL,
  debug: process.env.NODE_ENV !== 'production',
  entities: [
    OSRSAccount,
    User,
    RankSubmission,
    RankSubmissionMetadata,
    RankSubmissionDiff,
    DraftRankSubmission,
    PlayerGameMode,
  ],
  extensions: [Migrator],
  migrations: {
    path: './database/migrations',
    migrationsList: [
      Migration20261110135542_initial,
      Migration20261110141116_rank_calculator,
    ],
  },
});
