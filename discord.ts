import 'server-only';
import { ResponseLike, REST } from '@discordjs/rest';

function createDiscordClient() {
  return new REST({
    makeRequest: async (url: string, init) => {
      const response = await fetch(url, init as RequestInit);
      return response as ResponseLike;
    },
  });
}

export const discordBotClient = createDiscordClient().setToken(
  process.env.DISCORD_TOKEN ?? '',
);

export const discordUserClient = (accessToken: string) =>
  createDiscordClient().setToken(accessToken);
