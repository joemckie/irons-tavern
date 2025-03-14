import * as Sentry from '@sentry/nextjs';
import { clientConstants } from '@/config/constants.client';
import {
  TempleOSRSCollectionLogCategory,
  TempleOSRSPlayerCollectionLog,
} from '@/app/schemas/temple-api';
import { itemList } from '@/data/item-list';
import { isCollectionLogItem } from '@/app/schemas/items';

export async function fetchTemplePlayerCollectionLog(player: string) {
  const categories = Object.values(itemList)
    .flatMap(({ items }) => items)
    .filter(isCollectionLogItem)
    .reduce((acc, { collectionLogCategories }) => {
      collectionLogCategories.forEach(acc.add, acc);

      return acc;
    }, new Set<TempleOSRSCollectionLogCategory>());

  try {
    const collectionLogQueryParams = new URLSearchParams({
      player,
      onlyitems: '1',
      includenames: '1',
      categories: [...categories].join(','),
    });

    const playerStatsResponse = await fetch(
      `${clientConstants.temple.baseUrl}/api/collection-log/player_collection_log.php?${collectionLogQueryParams}`,
    );

    return TempleOSRSPlayerCollectionLog.parse(await playerStatsResponse.json())
      .data;
  } catch {
    Sentry.captureMessage('TempleOSRS collection log not found', 'info');

    return null;
  }
}
