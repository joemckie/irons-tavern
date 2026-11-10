import 'server-only';

import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { User } from './database/entities/user.entity';
import {
  RankSubmission,
  RankSubmissionDiff,
  RankSubmissionMetadata,
} from './database/entities/rank-submission.entity';
import { OSRSAccount } from './database/entities/osrs-account';
import { defineConfig } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';

export default defineConfig({
  dbName: 'irons_tavern',
  debug: process.env.NODE_ENV !== 'production',
  entities: [
    User,
    OSRSAccount,
    RankSubmission,
    RankSubmissionMetadata,
    RankSubmissionDiff,
  ],
  metadataProvider: TsMorphMetadataProvider,
  extensions: [Migrator],
  migrations: {
    migrationsList: [],
  },
});
