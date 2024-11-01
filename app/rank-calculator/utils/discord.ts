import { ResponseLike, DefaultRestOptions } from '@discordjs/rest';

export const makeDiscordRequest: (typeof DefaultRestOptions)['makeRequest'] =
  async (url: string, init) => {
    const response = await fetch(url, init as RequestInit);
    return response as ResponseLike;
  };
