import { OSRSAccount } from './osrs-account';
import { defineEntity, p } from '@mikro-orm/core';

const UserSchema = defineEntity({
  name: 'User',
  tableName: 'user',
  properties: {
    discordId: p.string().primary(),
    name: p.string(),
    osrsAccounts: () => p.oneToMany(OSRSAccount).mappedBy('user'),
  },
});

export class User extends UserSchema.class {
  discordId!: string;
}

UserSchema.setClass(User);
