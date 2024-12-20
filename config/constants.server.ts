import 'server-only';
import { z } from 'zod';

const ServerConfigSchema = z.object({
  zeplo: z.object({
    apiKey: z.string(),
    url: z.string(),
  }),
  temple: z.object({
    groupName: z.string(),
    groupId: z.string(),
    groupKey: z.string(),
    privateGroup: z.coerce.boolean(),
  }),
  redisUrl: z.string(),
  discord: z.object({
    token: z.string(),
    guildId: z.string(),
    channelId: z.string(),
  }),
});

export const serverConstants = ServerConfigSchema.parse({
  zeplo: {
    apiKey: process.env.ZEPLO_API_KEY,
    url: process.env.ZEPLO_URL,
  },
  temple: {
    groupName: process.env.TEMPLE_GROUP_NAME,
    groupId: process.env.TEMPLE_GROUP_ID,
    groupKey: process.env.TEMPLE_GROUP_KEY,
    privateGroup: process.env.TEMPLE_PRIVATE_GROUP,
  },
  redisUrl: process.env.KV_REST_API_URL,
  discord: {
    token: process.env.DISCORD_TOKEN,
    guildId: process.env.DISCORD_GUILD_ID,
    channelId: process.env.DISCORD_CHANNEL_ID,
  },
});
