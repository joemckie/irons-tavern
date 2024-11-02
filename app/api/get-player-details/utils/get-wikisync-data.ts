import { constants } from '@/config/constants';
import { isWikiSyncError, WikiSyncError, WikiSyncResponse } from '@/types/wiki';
import { captureException } from '@sentry/nextjs';

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
    const wikiSyncData: WikiSyncResponse | WikiSyncError =
      await wikiSyncResponse.json();

    return isWikiSyncError(wikiSyncData) ? null : wikiSyncData;
  } catch (error) {
    captureException(error);

    return null;
  }
}
