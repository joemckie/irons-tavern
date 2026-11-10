import { randomUUID } from 'node:crypto';
import { defineEntity, p } from '@mikro-orm/core';
import type { Rank } from '@/config/enums';
import type { Player } from '@/app/schemas/player';
import { RankSubmission } from './rank-submission.entity';
import { DraftRankSubmission } from './draft-rank-submission.entity';
import { User } from './user.entity';

const OSRSAccountSchema = defineEntity({
  name: 'OSRSAccount',
  tableName: 'osrs_account',
  uniques: [{ properties: ['user', 'name'] }],
  properties: {
    id: p.uuid().primary(),
    // citext makes lookups and the per-user unique constraint case-insensitive,
    // matching how RSNs are treated in-game.
    name: p.string().columnType('citext'),
    joinDate: p.datetime(),
    rank: p.string().$type<Rank>().nullable(),
    isMobileOnly: p.boolean().default(false),
    isNameInvalid: p.boolean().default(false),
    // The last rank the user was notified (via Discord DM) that they're eligible for
    lastNotifiedRank: p.string().$type<Rank>().nullable(),
    user: () => p.manyToOne(User),
    draftRankSubmission: () =>
      p.oneToOne(DraftRankSubmission).mappedBy('osrsAccount').nullable(),
    rankSubmissions: () => p.oneToMany(RankSubmission).mappedBy('osrsAccount'),
  },
});

export class OSRSAccount extends OSRSAccountSchema.class {
  id: string = randomUUID();

  toPlayer(): Player {
    return {
      rsn: this.name,
      joinDate: this.joinDate,
      rank: this.rank ?? undefined,
      isMobileOnly: this.isMobileOnly,
      ...(this.isNameInvalid && { isNameInvalid: true }),
    };
  }
}

OSRSAccountSchema.setClass(OSRSAccount);
