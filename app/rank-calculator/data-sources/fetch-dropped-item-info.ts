import { clientConstants } from '@/config/constants.client';
import { DroppedItemResponse } from '@/app/schemas/wiki';
import * as Sentry from '@sentry/nextjs';
import { CollectionLogItemName } from '@/app/schemas/osrs';

export async function fetchItemDropRates(
  queriedItems: Set<CollectionLogItemName>,
) {
  const batches = [];
  const batchSize = 10;

  for (let i = 0; i < queriedItems.size; i += batchSize) {
    const batch = [...queriedItems].slice(i, i + batchSize);
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
      batchResponses.map(async (res) =>
        DroppedItemResponse.parse(await res.json()),
      ),
    );

    return droppedItemResponses.reduce(
      (acc, val) => ({
        ...acc,
        ...val,
      }),
      {},
    );
  } catch (error) {
    Sentry.captureException(error);

    return null;
  }
}
