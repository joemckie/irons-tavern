import { randomUUID } from 'node:crypto';
import { defineEntity, p } from '@mikro-orm/core';
import { RankSubmission } from './rank-submission.entity';
import { User } from './user.entity';

const OSRSAccountSchema = defineEntity({
  name: 'OSRSAccount',
  tableName: 'osrs_account',
  properties: {
    id: p.uuid().primary(),
    name: p.string(),
    user: () => p.manyToOne(User),
    rankSubmissions: () => p.oneToMany(RankSubmission).mappedBy('osrsAccount'),
  },
});

export class OSRSAccount extends OSRSAccountSchema.class {
  id = randomUUID();
}

OSRSAccountSchema.setClass(OSRSAccount);
