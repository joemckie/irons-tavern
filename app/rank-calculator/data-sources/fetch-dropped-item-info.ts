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
  const query = [
    `Dropped item::${[...queriedItems].join('||')}]]`,
    '?Drop JSON',
    'limit=1000',
  ].join('|');

  const params = new URLSearchParams({
    action: 'ask',
    format: 'json',
    query,
    api_version: '2',
    formatversion: '2',
  });

  try {
    const droppedItemResponse = await fetch(
      `${clientConstants.wiki.baseUrl}/api.php?${params}`,
    );

    const data = DroppedItemResponse.parse(await droppedItemResponse.json());

    return data;
  } catch (error) {
    Sentry.captureException(error);

    return null;
  }
}
