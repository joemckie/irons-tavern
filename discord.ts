import 'server-only';
import { ResponseLike, REST } from '@discordjs/rest';
import { constants } from './config/constants';

function createDiscordClient() {
  return new REST({
    makeRequest: async (url: string, init) => {
      const response = await fetch(url, init as RequestInit);
      return response as ResponseLike;
    },
  });
}

export const discordBotClient = createDiscordClient().setToken(
  constants.discord.token,
);

export const discordUserClient = (accessToken: string) =>
  createDiscordClient().setToken(accessToken);
