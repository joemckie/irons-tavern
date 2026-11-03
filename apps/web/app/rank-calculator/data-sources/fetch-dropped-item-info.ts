import { clientConstants } from '@/config/constants.client';
import { DroppedItemResponse } from '@/app/schemas/wiki';
import * as Sentry from '@sentry/nextjs';
import { CollectionLogItemName } from '@/app/schemas/osrs';
import { itemList } from '@/data/item-list';
import { CollectionLogItem, isCollectionLogItem } from '@/app/schemas/items';
import { cacheLife } from 'next/cache';
import { collectionLogItemWikiOverrideMap } from '../config/item-point-map';

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

export const fetchItemDropRates = async (items: CollectionLogItemName[]) => {
  'use cache: remote';

  cacheLife('weeks');

  const batches = [];
  const batchSize = 80;

  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const queryConditions = batch.map(
      (item) =>
        `{"item_name","${collectionLogItemWikiOverrideMap[item] ?? item}"}`,
    );
    const query = `bucket("dropsline").select("drop_json").where(bucket.Or(${queryConditions.join(',')})).run()`;

    batches.push(query);
  }

  try {
    const batchResponses = await Promise.all(
      batches.map((query) => {
        const params = new URLSearchParams({
          action: 'bucket',
          format: 'json',
          query,
        });

        return fetch(`${clientConstants.wiki.baseUrl}/api.php?${params}`, {
          cache: 'force-cache',
          headers: {
            'User-Agent': clientConstants.wiki.userAgent,
          },
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

          Sentry.captureException(error);

          return {};
        }

        return data;
      }),
    );

    const mergedResponses = droppedItemResponses.reduce(
      (acc, val) => ({ ...acc, ...val }),
      {},
    );

    for (const [clogName, wikiPage] of Object.entries(
      collectionLogItemWikiOverrideMap,
    )) {
      if (mergedResponses[wikiPage]) {
        // Normalise the Wiki drop rate data back to the clog name
        Object.assign(mergedResponses, {
          [clogName]: mergedResponses[wikiPage],
          [wikiPage]: undefined,
        });
      }
    }

    return mergedResponses;
  } catch (error) {
    Sentry.captureException(error);

    throw new Error('Could not fetch drop rates!', { cause: error });
  }
};
