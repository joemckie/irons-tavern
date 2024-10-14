import { NextRequest, NextResponse } from 'next/server';
import collectionLogDataFixture from '@/fixtures/collection-log.fixture.json';
import { get } from 'get-wild';
import { CollectionLogResponseItem } from '@/types/collection-log';
import { itemsResponseFixture } from '@/fixtures/items-response.fixture';
import { isItemAcquired } from './utils/is-item-acquired';

export async function GET(request: NextRequest) {
  const player = request.nextUrl.searchParams.get('player');

  if (!player) {
    return NextResponse.error();
  }

  // const collectionLogResponse = await fetch(
  //   `${constants.collectionLogBaseUrl}/collectionlog/user/${player}`,
  // );
  // const collectionLogData = await collectionLogResponse.json();
  const collectionLogData = collectionLogDataFixture;
  const collectionLogItems = get<CollectionLogResponseItem[]>(
    collectionLogData,
    'collectionLog.tabs.*.*.items',
  ).reduce(
    (acc, item) =>
      item.obtained
        ? {
            ...acc,
            [item.name]: item.quantity,
          }
        : acc,
    {},
  );

  const acquiredItems = Object.values(itemsResponseFixture)
    .flatMap(({ items }) => items)
    .filter((item) =>
      isItemAcquired(item, {
        collectionLogItems,
      }),
    )
    .map(({ name }) => name);

  return NextResponse.json({
    acquiredItems,
  });
}
