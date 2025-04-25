import { clientConstants } from '@/config/constants.client';
import { DroppedItemResponse } from '@/app/schemas/wiki';
import * as Sentry from '@sentry/nextjs';
import { CollectionLogItemName } from '@/app/schemas/osrs';

export async function fetchDroppedItemInfo(item: CollectionLogItemName) {
  const query = [`[[Dropped item::${item}]]`, '?Drop JSON', 'limit=1000'].join(
    '|',
  );

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
