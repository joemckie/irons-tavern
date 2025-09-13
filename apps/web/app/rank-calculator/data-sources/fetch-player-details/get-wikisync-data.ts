import { clientConstants } from '@/config/constants.client';
import { WikiSyncError, WikiSyncResponse } from '@/app/schemas/wiki';
import * as Sentry from '@sentry/nextjs';

export async function getWikiSyncData(player: string) {
  try {
    const wikiSyncResponse = await fetch(
      `${clientConstants.wikiSync.baseUrl}/runelite/player/${player}/STANDARD`,
      {
        headers: {
          // User agent is required or the API returns a 400
          'User-Agent': 'Irons-Tavern-Rank-Calculator',
        },
      },
    );

    const data: unknown = await wikiSyncResponse.json();

    if (WikiSyncError.safeParse(data).success) {
      Sentry.captureMessage('WikiSync data not found', 'info');

      return null;
    }

    return WikiSyncResponse.parse(data);
  } catch (error) {
    Sentry.captureException(error);

    return null;
  }
}
