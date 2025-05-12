import * as Sentry from '@sentry/nextjs';
import { clientConstants } from '@/config/constants.client';
import { TempleOSRSPlayerCollectionLogWithCategories } from '@repo/templeosrs/api-schema';

export async function fetchTemplePlayerCollectionLogWithCategories(
  player: string,
  categories: string[],
) {
  try {
    const collectionLogQueryParams = new URLSearchParams({
      player,
      includenames: '1',
      includemissingitems: '1',
      categories: [...categories].join(','),
    });

    const collectionLogResponse = await fetch(
      `${clientConstants.temple.baseUrl}/api/collection-log/player_collection_log.php?${collectionLogQueryParams}`,
    );

    return TempleOSRSPlayerCollectionLogWithCategories.parse(
      await collectionLogResponse.json(),
    ).data;
  } catch {
    Sentry.captureMessage('TempleOSRS collection log not found', 'info');

    return null;
  }
}
