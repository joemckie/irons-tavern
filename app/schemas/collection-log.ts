import { z } from 'zod';

export const CollectionLogItem = z.object({
  id: z.number(),
  name: z.string(),
  quantity: z.number().nonnegative(),
  obtained: z.boolean(),
  obtainedAt: z.string().nullable(),
  sequence: z.number(),
});

export type CollectionLogItem = z.infer<typeof CollectionLogItem>;

const CollectionLogKillCount = z.object({
  name: z.string(),
  amount: z.number(),
  sequence: z.number(),
});

const CollectionLogPage = z.object({
  killCount: z.array(CollectionLogKillCount).optional(),
  items: z.array(CollectionLogItem),
});

const CollectionLogTab = z.record(z.string(), CollectionLogPage);

export const CollectionLogResponse = z.object({
  collectionLogId: z.string(),
  userId: z.string(),
  collectionLog: z.object({
    tabs: z.record(z.string(), CollectionLogTab),
    username: z.string(),
    accountType: z.string(),
    totalObtained: z.number(),
    totalItems: z.number(),
    uniqueObtained: z.number(),
    uniqueItems: z.number(),
  }),
});

export type CollectionLogResponse = z.infer<typeof CollectionLogResponse>;

export interface CollectionLogError {
  error: string;
}

export const AcquiredItemMap = z.record(z.string(), z.number());

export type AcquiredItemMap = z.infer<typeof AcquiredItemMap>;
