import { NextRequest, NextResponse } from 'next/server';
import collectionLogDataFixture from '@/fixtures/collection-log.fixture.json';
import { get } from 'get-wild';
import { CollectionLogResponseItem } from '@/types/collection-log';

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
  const collectionLogItemMap = get<CollectionLogResponseItem[]>(
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

  return NextResponse.json({
    collectionLogItems: collectionLogItemMap,
  });
}
