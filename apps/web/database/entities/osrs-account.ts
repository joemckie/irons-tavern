import {
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/decorators/es';
import { randomUUID } from 'node:crypto';
import { User } from './user.entity';
import { Collection } from '@mikro-orm/core';
import { RankSubmission } from './rank-submission.entity';

@Entity({ tableName: 'osrs_account' })
export class OSRSAccount {
  @PrimaryKey({ type: 'uuid' })
  id = randomUUID();

  @Property()
  name!: string;

  @ManyToOne()
  user!: User;

  @OneToMany(() => RankSubmission, 'osrsAccount')
  rankSubmissions = new Collection<RankSubmission>(this);
}
