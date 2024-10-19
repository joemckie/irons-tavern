import { constants } from '@/config/constants';
import {
  CollectionLogError,
  CollectionLogResponse,
  isCollectionLogError,
} from '@/types/collection-log';

export async function getCollectionLog(player: string) {
  const collectionLogResponse = await fetch(
    `${constants.collectionLogBaseUrl}/collectionlog/user/${player}`,
  );
  const collectionLogData: CollectionLogResponse | CollectionLogError =
    await collectionLogResponse.json();

  return isCollectionLogError(collectionLogData) ? null : collectionLogData;
}
