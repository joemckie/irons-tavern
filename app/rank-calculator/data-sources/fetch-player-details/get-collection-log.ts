import { constants } from '@/config/constants';
import { CollectionLogResponse } from '@/app/schemas/collection-log';
import * as Sentry from '@sentry/nextjs';

export async function getCollectionLog(player: string) {
  try {
    const collectionLogResponse = await fetch(
      `${constants.collectionLogBaseUrl}/collectionlog/user/${player}`,
    );

    return CollectionLogResponse.parse(await collectionLogResponse.json());
  } catch (error) {
    Sentry.captureException(error);

    return null;
  }
}
