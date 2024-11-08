import { constants } from '@/config/constants';
import { WikiSyncResponse } from '@/app/schemas/wiki';
import * as Sentry from '@sentry/nextjs';

export async function getWikiSyncData(player: string) {
  try {
    const wikiSyncResponse = await fetch(
      `${constants.wikiSync.baseUrl}/runelite/player/${player}/STANDARD`,
      {
        headers: {
          // User agent is required or the API returns a 400
          'User-Agent': 'Irons-Tavern-Rank-Calculator',
        },
      },
    );

    return WikiSyncResponse.parse(await wikiSyncResponse.json());
  } catch (error) {
    Sentry.captureException(error);

    return null;
  }
}
