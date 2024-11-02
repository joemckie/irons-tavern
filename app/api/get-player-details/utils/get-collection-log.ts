import { constants } from '@/config/constants';
import {
  CollectionLogError,
  CollectionLogResponse,
  isCollectionLogError,
} from '@/types/collection-log';
import * as Sentry from '@sentry/nextjs';

export async function getCollectionLog(player: string) {
  try {
    const collectionLogResponse = await fetch(
      `${constants.collectionLogBaseUrl}/collectionlog/user/${player}`,
    );
    const collectionLogData: CollectionLogResponse | CollectionLogError =
      await collectionLogResponse.json();

    return isCollectionLogError(collectionLogData) ? null : collectionLogData;
  } catch (error) {
    Sentry.captureException(error);

    return null;
  }
}
