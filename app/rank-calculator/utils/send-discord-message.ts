import 'server-only';
import { ResponseLike, REST } from '@discordjs/rest';
import { APIMessage, Routes } from 'discord-api-types/v10';

export async function sendDiscordMessage(
  message: Partial<APIMessage>,
  channelId: string,
): Promise<APIMessage> {
  if (!process.env.DISCORD_TOKEN) {
    throw new Error('No discord token provided');
  }

  const discord = new REST({
    makeRequest: async (url: string, init) => {
      const response = await fetch(url, init as RequestInit);
      return response as ResponseLike;
    },
  }).setToken(process.env.DISCORD_TOKEN);

  const response = await discord.post(Routes.channelMessages(channelId), {
    body: message,
  });

  return response as APIMessage;
}
