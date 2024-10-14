import collectionLogFixture from '@/fixtures/collection-log.fixture.json';

export interface CollectionLogResponseItem {
  id: number;
  name: string;
  quantity: number;
  obtained: boolean;
  obtainedAt: string | null;
  sequence: number;
}

export type CollectionLogResponse = typeof collectionLogFixture;
