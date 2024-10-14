import { Rank } from './enums';

export const constants = {
  collectionLogBaseUrl: 'https://api.collectionlog.net' as const,
  publicUrl: process.env.NEXT_PUBLIC_URL,
  zeplo: {
    apiKey: process.env.ZEPLO_API_KEY,
    url: process.env.ZEPLO_URL,
  },
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
  wiki: {
    baseUrl: 'https://oldschool.runescape.wiki' as const,
  },
};
