import {
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/decorators/es';
import { OSRSAccount } from './osrs-account';
import { Collection, PrimaryKeyProp } from '@mikro-orm/core';

@Entity()
export class User {
  [PrimaryKeyProp]?: 'discordId';

  @PrimaryKey()
  discordId!: string;

  @Property()
  name!: string;

  @OneToMany(() => OSRSAccount, 'user')
  osrsAccounts = new Collection<OSRSAccount>(this);
}
