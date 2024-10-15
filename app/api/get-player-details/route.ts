import { NextRequest, NextResponse } from 'next/server';
import collectionLogDataFixture from '@/fixtures/collection-log.fixture.json';
// import wikiSyncDataFixture from '@/fixtures/wikisync.fixture.json';
import { get } from 'get-wild';
import { CollectionLogResponseItem } from '@/types/collection-log';
import { itemsResponseFixture } from '@/fixtures/items-response.fixture';
import {
  DiaryLocation,
  DiaryTier,
  DiaryTierData,
  WikiSyncResponse,
} from '@/types/rank-calculator';
import { constants } from '@/config/constants';
import { isItemAcquired } from './utils/is-item-acquired';

export async function GET(request: NextRequest) {
  const player = request.nextUrl.searchParams.get('player');

  if (!player) {
    return NextResponse.json('No player provided', {
      status: 400,
    });
  }

  try {
    const wikiSyncResponse = await fetch(
      `${constants.wikiSync.baseUrl}/runelite/player/${player}/STANDARD`,
      {
        method: 'GET',
        headers: {
          // User agent is required or the API returns a 400
          'User-Agent': 'Irons-Tavern-Rank-Calculator',
        },
      },
    );
    const wikiSyncData = (await wikiSyncResponse.json()) as WikiSyncResponse;
    // const wikiSyncData: WikiSyncResponse = wikiSyncDataFixture;

    const collectionLogResponse = await fetch(
      `${constants.collectionLogBaseUrl}/collectionlog/user/${player}`,
    );
    const collectionLogData =
      (await collectionLogResponse.json()) as typeof collectionLogDataFixture;
    // const collectionLogData = collectionLogDataFixture;
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
        Ardougne: null,
        Desert: null,
        Falador: null,
        Fremennik: null,
        Kandarin: null,
        Karamja: null,
        'Kourend & Kebos': null,
        'Lumbridge & Draynor': null,
        Morytania: null,
        Varrock: null,
        'Western Provinces': null,
      } as Record<DiaryLocation, DiaryTier | null>,
    );

    const {
      levels: { Overall, ...levels },
    } = wikiSyncData;
    const acquiredItems = Object.values(itemsResponseFixture)
      .flatMap(({ items }) => items)
      .filter((item) =>
        isItemAcquired(item, {
          collectionLogItems,
          quests: wikiSyncData.quests,
          achievementDiaries,
          levels,
        }),
      )
      .map(({ name }) => name);

    return NextResponse.json({
      acquiredItems,
      achievementDiaries,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(null, {
      status: 500,
    });
  }
}
