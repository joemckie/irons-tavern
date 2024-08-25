import { Rank } from './enums';

export const constants = {
  publicUrl: process.env.NEXT_PUBLIC_URL,
  temple: {
    groupName: process.env.TEMPLE_GROUP_NAME,
    groupId: process.env.TEMPLE_GROUP_ID,
    groupKey: process.env.TEMPLE_GROUP_KEY,
    baseUrl: 'https://templeosrs.com' as const,
    privateGroup: process.env.TEMPLE_PRIVATE_GROUP,
  },
  ranks: {
    leaders: [Rank.Owner, Rank['Deputy Owner'], Rank.Artisan],
    unranked: Rank.Air,
  },
};
