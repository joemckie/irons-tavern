import { clientConstants } from '@/config/constants.client';
import { DroppedItemResponse } from '@/app/schemas/wiki';
import * as Sentry from '@sentry/nextjs';
import { CollectionLogItemName } from '@/app/schemas/osrs';
import { itemList } from '@/data/item-list';
import { isCollectionLogItem } from '@/app/schemas/items';

function generateRequiredItemList() {
  return Object.values(itemList)
    .flatMap(({ items }) => items)
    .filter(isCollectionLogItem)
    .reduce((acc, { requiredItems }) => {
      requiredItems.forEach(({ clogName }) => acc.add(clogName), acc);

      return acc;
    }, new Set<CollectionLogItemName>());
}

export async function fetchItemDropRates() {
  const queriedItems = generateRequiredItemList();
  const batches = [];

  while (queriedItems.size > 0) {
    const batch = [...queriedItems].slice(0, 10);
    const query = [
      `[[Dropped item::${[...queriedItems].join('||')}]]`,
      '?Drop JSON',
      'limit=1000',
    ].join('|');

    batches.push(query);

    batch.forEach((item) => queriedItems.delete(item));
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

        return fetch(`${clientConstants.wiki.baseUrl}/api.php?${params}`);
      }),
    );

    const droppedItemResponse = await Promise.all(
      batchResponses.map((res) => res.json()),
    );

    return DroppedItemResponse.parse({
      query: {
        results: Object.values(droppedItemResponse).reduce(
          (acc, { query }) => ({
            ...acc,
            ...query.results,
          }),
          {},
        ),
      },
    });
  } catch (error) {
    Sentry.captureException(error);

    return null;
  }
}
