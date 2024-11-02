import 'server-only';
import { ResponseLike, REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';

export async function sendDiscordMessage(message: string, channelId: string) {
  if (!process.env.DISCORD_TOKEN) {
    throw new Error('No discord token provided');
  }

  const discord = new REST({
    makeRequest: async (url: string, init) => {
      const response = await fetch(url, init as RequestInit);
      return response as ResponseLike;
    },
  }).setToken(process.env.DISCORD_TOKEN);

  return discord.post(Routes.channelMessages(channelId), {
    body: {
      content: message,
    },
  });
}
