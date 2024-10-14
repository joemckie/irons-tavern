import { NextRequest, NextResponse } from 'next/server';
import collectionLogDataFixture from '@/fixtures/collection-log.fixture.json';
import wikiSyncDataFixture from '@/fixtures/wikisync.fixture.json';
import { get } from 'get-wild';
import { CollectionLogResponseItem } from '@/types/collection-log';
import { itemsResponseFixture } from '@/fixtures/items-response.fixture';
import {
  DiaryLocation,
  DiaryTier,
  DiaryTierData,
  WikiSyncResponse,
} from '@/types/rank-calculator';
import { isItemAcquired } from './utils/is-item-acquired';

export async function GET(request: NextRequest) {
  const player = request.nextUrl.searchParams.get('player');

  if (!player) {
    return NextResponse.error();
  }

  // const wikiSyncResponse = await fetch(
  //   `${constants.wikiSync.baseUrl}/runelite/player/${player}/STANDARD`,
  // );
  // const wikiSyncData = await wikiSyncResponse.json() as typeof wikiSyncDataFixture;
  const wikiSyncData: WikiSyncResponse = wikiSyncDataFixture;

  // const collectionLogResponse = await fetch(
  //   `${constants.collectionLogBaseUrl}/collectionlog/user/${player}`,
  // );
  // const collectionLogData = await collectionLogResponse.json() as typeof collectionLogDataFixture;
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
        quests: wikiSyncData.quests,
      }),
    )
    .map(({ name }) => name);

  const achievementDiaries = Object.entries(
    wikiSyncData.achievement_diaries,
  ).reduce(
    (acc, [diaryLocation, diaryTiers]) => {
      const orderedTiers = [
        [DiaryTier.Easy, diaryTiers.Easy],
        [DiaryTier.Medium, diaryTiers.Medium],
        [DiaryTier.Hard, diaryTiers.Hard],
        [DiaryTier.Elite, diaryTiers.Elite],
      ] satisfies [DiaryTier, DiaryTierData][];

      orderedTiers.forEach(([tierName, tierData]) => {
        if (tierData.complete) {
          acc[diaryLocation as DiaryLocation] = tierName;
        }
      });

      return acc;
    },
    {
      Ardougne: 'None',
      Desert: 'None',
      Falador: 'None',
      Fremennik: 'None',
      Kandarin: 'None',
      Karamja: 'None',
      'Kourend & Kebos': 'None',
      'Lumbridge & Draynor': 'None',
      Morytania: 'None',
      Varrock: 'None',
      'Western Provinces': 'None',
    } as Record<DiaryLocation, DiaryTier | 'None'>,
  );

  return NextResponse.json({
    acquiredItems,
    achievementDiaries,
  });
}
