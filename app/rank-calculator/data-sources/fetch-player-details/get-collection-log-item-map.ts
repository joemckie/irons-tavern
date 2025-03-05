import { CollectionLogResponse } from '@/app/schemas/wiki';
import { clientConstants } from '@/config/constants.client';
import * as Sentry from '@sentry/nextjs';

export async function getCollectionLogItemMap() {
  try {
    const params = new URLSearchParams({
      title: 'Module:Collection_log/data.json',
      action: 'raw',
      ctype: 'application/json',
    });

    const collectionLogDataResponse = await fetch(
      `${clientConstants.wiki.baseUrl}/?${params}`,
    );

    const collectionLogData = CollectionLogResponse.parse(
      await collectionLogDataResponse.json(),
    );

    return collectionLogData.reduce(
      (acc, { id, ...data }) => ({
        ...acc,
        [id]: data,
      }),
      {} as Record<string, Omit<CollectionLogResponse[number], 'id'>>,
    );
  } catch (error) {
    Sentry.captureException(error);

    return null;
  }
}
