import { z } from 'zod';

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

interface CollectionLogKillCount {
  name: string;
  amount: number;
  sequence: number;
}

interface CollectionLogPage {
  killCount?: CollectionLogKillCount[];
  items: CollectionLogItem[];
}

type CollectionLogTab = Record<string, CollectionLogPage>;

export interface CollectionLogResponse {
  collectionLogId: string;
  userId: string;
  collectionLog: {
    tabs: Record<string, CollectionLogTab>;
    username: string;
    accountType: string;
    totalObtained: number;
    totalItems: number;
    uniqueObtained: number;
    uniqueItems: number;
  };
}

export const CollectionLogItemMap = z.record(z.string(), z.number());

export type CollectionLogItemMap = z.infer<typeof CollectionLogItemMap>;

export function isCollectionLogError(
  collectionLogResponse: CollectionLogResponse | CollectionLogError,
): collectionLogResponse is CollectionLogError {
  return (collectionLogResponse as CollectionLogError).error !== undefined;
}
