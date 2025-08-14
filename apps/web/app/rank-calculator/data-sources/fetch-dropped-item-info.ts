import { clientConstants } from '@/config/constants.client';
import { DroppedItemResponse } from '@/app/schemas/wiki';
import * as Sentry from '@sentry/nextjs';
import { CollectionLogItemName } from '@/app/schemas/osrs';
import { itemList } from '@/data/item-list';
import { CollectionLogItem, isCollectionLogItem } from '@/app/schemas/items';
import { unstable_cache } from 'next/cache';

export function generateRequiredItemList() {
  return Object.values(itemList)
    .flatMap(({ items }) => items)
    .filter(
      (item): item is CollectionLogItem =>
        !item.points && isCollectionLogItem(item),
    )
    .reduce((acc, { requiredItems }) => {
      requiredItems.forEach(({ clogName }) => acc.add(clogName), acc);

      return acc;
    }, new Set<CollectionLogItemName>());
}

export const fetchItemDropRates = unstable_cache(
  async (items: CollectionLogItemName[]) => {
    const batches = [];
    const batchSize = 10;

    for (let i = 0; i < items.length; i += batchSize) {
      const batch = items.slice(i, i + batchSize);
      const query = [
        `[[Dropped item::${[...batch].join('||')}]]`,
        '?Drop JSON',
        'limit=1000',
      ].join('|');

      batches.push(query);
    }

    try {
      const batchResponses = await Promise.all(
        batches.map((query) => {
          const params = new URLSearchParams({
            action: 'ask',
            format: 'json',
            query,
            api_version: '2',
            formatversion: '2',
          });

          return fetch(`${clientConstants.wiki.baseUrl}/api.php?${params}`, {
            cache: 'force-cache',
          });
        }),
      );

      const droppedItemResponses = await Promise.all(
        batchResponses.map(async (res) => {
          const { success, data, error } = DroppedItemResponse.safeParse(
            await res.json(),
          );

          if (!success) {
            Sentry.addBreadcrumb({
              category: 'drop-rates.parse',
              type: 'error',
              data: {
                url: res.url,
                error,
              },
              message: `Failed to parse drop rates for ${res.url}`,
            });

            return {};
          }

          return data;
        }),
      );

      return droppedItemResponses.reduce(
        (acc, val) => ({ ...acc, ...val }),
        {},
      );
    } catch (error) {
      Sentry.captureException(error);

      throw new Error('Could not fetch drop rates!');
    }
  },
  [],
  {
    revalidate: 60 * 60 * 24 * 7, // 7 days
  },
);
