import 'server-only';
import { ResponseLike, REST } from '@discordjs/rest';

if (!process.env.DISCORD_TOKEN) {
  throw new Error('No discord token provided');
}

export const discord = new REST({
  makeRequest: async (url: string, init) => {
    const response = await fetch(url, init as RequestInit);
    return response as ResponseLike;
  },
}).setToken(process.env.DISCORD_TOKEN);
