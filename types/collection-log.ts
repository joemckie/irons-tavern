export interface CollectionLogResponseItem {
  id: number;
  name: string;
  quantity: number;
  obtained: boolean;
  obtainedAt: string | null;
  sequence: number;
}

export interface CollectionLogError {
  error: string;
}

export interface CollectionLogResponse {
  collectionLogId: string;
  userId: string;
  collectionLog: {
    tabs: Record<string, Record<string, CollectionLogResponseItem>>;
  };
}

export type CollectionLogItemMap = Record<string, number>;

export function isCollectionLogError(
  collectionLogResponse: CollectionLogResponse | CollectionLogError,
): collectionLogResponse is CollectionLogResponse {
  return (collectionLogResponse as CollectionLogError).error !== undefined;
}
