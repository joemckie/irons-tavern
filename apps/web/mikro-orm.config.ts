import 'server-only';

import { MikroORM } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { User } from './database/entities/user.entity';
import {
  RankSubmission,
  RankSubmissionDiff,
  RankSubmissionMetadata,
} from './database/entities/rank-submission.entity';
import { OSRSAccount } from './database/entities/osrs-account';

export const orm = await MikroORM.init({
  entities: [
    User,
    OSRSAccount,
    RankSubmission,
    RankSubmissionMetadata,
    RankSubmissionDiff,
  ],
  metadataProvider: TsMorphMetadataProvider,
});
