export interface CollectionLogItem {
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

interface CollectionLogPage {
  items: CollectionLogItem[];
}

type CollectionLogTab = Record<string, CollectionLogPage>;

export interface CollectionLogResponse {
  collectionLogId: string;
  userId: string;
  collectionLog: {
    tabs: Record<string, CollectionLogTab>;
  };
}

export type CollectionLogItemMap = Record<string, number>;

export function isCollectionLogError(
  collectionLogResponse: CollectionLogResponse | CollectionLogError,
): collectionLogResponse is CollectionLogResponse {
  return (collectionLogResponse as CollectionLogError).error !== undefined;
}
