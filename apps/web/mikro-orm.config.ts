import { User } from './database/entities/user.entity';
import {
  RankSubmission,
  RankSubmissionDiff,
  RankSubmissionMetadata,
} from './database/entities/rank-submission.entity';
import { OSRSAccount } from './database/entities/osrs-account';
import { defineConfig } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';
import { Migration20261110135542_initial } from './database/migrations/Migration20261110135542_initial';

export default defineConfig({
  clientUrl: process.env.POSTGRES_URL,
  debug: process.env.NODE_ENV !== 'production',
  entities: [
    OSRSAccount,
    User,
    RankSubmission,
    RankSubmissionMetadata,
    RankSubmissionDiff,
  ],
  extensions: [Migrator],
  migrations: {
    path: './database/migrations',
    migrationsList: [Migration20261110135542_initial],
  },
});
