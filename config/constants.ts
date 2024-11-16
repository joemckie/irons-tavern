import { z } from 'zod';
import { Rank } from './enums';

const ConfigSchema = z.object({
  collectionLogBaseUrl: z.literal('https://api.collectionlog.net'),
  publicUrl: z.string(),
  zeplo: z.object({
    apiKey: z.string(),
    url: z.string(),
  }),
  temple: z.object({
    groupName: z.string(),
    groupId: z.string(),
    groupKey: z.string(),
    baseUrl: z.literal('https://templeosrs.com'),
    privateGroup: z.string(),
  }),
  ranks: z.object({
    leaders: z.array(Rank).nonempty(),
    unranked: Rank,
  }),
  wiki: z.object({
    baseUrl: z.literal('https://oldschool.runescape.wiki'),
  }),
  wikiSync: z.object({
    baseUrl: z.literal('https://sync.runescape.wiki'),
  }),
  redisUrl: z.string(),
  discord: z.object({
    baseUrl: z.literal('https://discord.com/api/v10'),
    token: z.string(),
    guildId: z.string(),
    channelId: z.string(),
  }),
  collectionLogTotal: z.literal(1561),
});

export const constants = ConfigSchema.parse({
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
    leaders: ['Owner', 'Deputy Owner', 'Artisan'],
    unranked: 'Air',
  },
  wiki: {
    baseUrl: 'https://oldschool.runescape.wiki' as const,
  },
  wikiSync: {
    baseUrl: 'https://sync.runescape.wiki' as const,
  },
  redisUrl: process.env.KV_REST_API_URL,
  discord: {
    baseUrl: 'https://discord.com/api/v10' as const,
    token: process.env.DISCORD_TOKEN,
    guildId: process.env.DISCORD_GUILD_ID,
    channelId: process.env.DISCORD_CHANNEL_ID,
  },
  collectionLogTotal: 1561 as const,
});
