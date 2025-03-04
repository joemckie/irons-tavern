import { clientConstants } from '@/config/constants.client';
import * as Sentry from '@sentry/nextjs';

export async function getUniqueCollectionLogCount() {
  try {
    const collectionLogDataResponse = await fetch(
      `${clientConstants.wiki.baseUrl}/?title=Module:Collection_log/data.json&action=raw&ctype=application%2Fjson`,
    );

    const collectionLogData = await collectionLogDataResponse.json();

    return collectionLogData.length;
  } catch (error) {
    Sentry.captureException(error);

    return null;
  }
}
