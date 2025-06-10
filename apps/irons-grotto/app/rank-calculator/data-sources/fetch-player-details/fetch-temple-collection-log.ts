import * as Sentry from '@sentry/nextjs';
import { clientConstants } from '@/config/constants.client';
import {
  TempleOSRSCollectionLogCategory,
  TempleOSRSPlayerCollectionLog,
} from '@/app/schemas/temple-api';
import { itemList } from '@/data/item-list';
import { isCollectionLogItem } from '@/app/schemas/items';

function generateCollectionLogCategoryList() {
  return Object.values(itemList)
    .flatMap(({ items }) => items)
    .filter(isCollectionLogItem)
    .reduce(
      (acc, { collectionLogCategories }) => {
        collectionLogCategories.forEach((category) => acc.add(category), acc);

        return acc;
      },
      new Set<TempleOSRSCollectionLogCategory>([
        /*
         * the_inferno, fortis_colosseum, and the_fight_caves are added manually as they are not included
         * in the item list, and are required to determine the TzHaar capes and Dizana's quiver completion
         */
        'the_inferno',
        'the_fight_caves',
        'fortis_colosseum',
      ]),
    );
}

export async function fetchTemplePlayerCollectionLog(player: string) {
  const categories = generateCollectionLogCategoryList();

  try {
    const collectionLogQueryParams = new URLSearchParams({
      player,
      onlyitems: '1',
      includenames: '1',
      categories: [...categories].join(','),
    });

    const collectionLogResponse = await fetch(
      `${clientConstants.temple.baseUrl}/api/collection-log/player_collection_log.php?${collectionLogQueryParams}`,
    );

    return TempleOSRSPlayerCollectionLog.parse(
      await collectionLogResponse.json(),
    ).data;
  } catch {
    Sentry.captureMessage('TempleOSRS collection log not found', 'info');

    return null;
  }
}
