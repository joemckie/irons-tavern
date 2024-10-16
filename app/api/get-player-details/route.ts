import { NextRequest, NextResponse } from 'next/server';
import { get } from 'get-wild';
import {
  CollectionLogError,
  CollectionLogItemMap,
  CollectionLogResponse,
  CollectionLogItem,
  isCollectionLogError,
} from '@/types/collection-log';
import { itemsResponseFixture } from '@/fixtures/items-response.fixture';
import { AchievementDiaryMap, PlayerData } from '@/types/rank-calculator';
import { constants } from '@/config/constants';
import {
  DiaryTierData,
  isWikiSyncError,
  WikiSyncError,
  WikiSyncResponse,
} from '@/types/wiki-sync';
import { DiaryLocation, DiaryTier } from '@/types/osrs';
import { list } from '@vercel/blob';
import { isItemAcquired } from './utils/is-item-acquired';
import { ClanMember } from '../update-member-list/route';

function parseAchievementDiaries(
  diaries: WikiSyncResponse['achievement_diaries'],
) {
  return Object.entries(diaries).reduce<AchievementDiaryMap>(
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
      Wilderness: null,
    } satisfies AchievementDiaryMap,
  );
}

function parseLevels({ Overall, ...levels }: WikiSyncResponse['levels']) {
  return levels;
}

const emptyResponse = {
  achievementDiaries: null,
  acquiredItems: null,
  joinDate: null,
} satisfies PlayerData;

async function getJoinedDate(player: string) {
  const blobList = await list();
  const [{ url }] = blobList.blobs.sort(
    (a, b) => +b.uploadedAt - +a.uploadedAt,
  );

  const response = await fetch(url);
  const data: ClanMember[] = await response.json();

  return (
    data.find(({ rsn }) => rsn.toLowerCase() === player.toLowerCase())
      ?.joinedDate ?? null
  );
}

export async function GET(
  request: NextRequest,
): Promise<NextResponse<PlayerData>> {
  const player = request.nextUrl.searchParams.get('player');

  if (!player) {
    return NextResponse.json(emptyResponse, {
      status: 400,
    });
  }

  try {
    const wikiSyncResponse = await fetch(
      `${constants.wikiSync.baseUrl}/runelite/player/${player}/STANDARD`,
      {
        headers: {
          // User agent is required or the API returns a 400
          'User-Agent': 'Irons-Tavern-Rank-Calculator',
        },
      },
    );
    const wikiSyncData: WikiSyncResponse | WikiSyncError =
      await wikiSyncResponse.json();

    const collectionLogResponse = await fetch(
      `${constants.collectionLogBaseUrl}/collectionlog/user/${player}`,
    );
    const collectionLogData: CollectionLogResponse | CollectionLogError =
      await collectionLogResponse.json();

    const hasCollectionLogData = !isCollectionLogError(collectionLogData);
    const hasWikiSyncData = !isWikiSyncError(wikiSyncData);
    const hasThirdPartyData = hasWikiSyncData || hasCollectionLogData;

    if (!hasThirdPartyData) {
      return NextResponse.json(emptyResponse, { status: 404 });
    }

    const collectionLogItems = hasCollectionLogData
      ? get<CollectionLogItem[]>(
          collectionLogData,
          'collectionLog.tabs.*.*.items',
        ).reduce<CollectionLogItemMap>(
          (acc, item) =>
            item.obtained
              ? {
                  ...acc,
                  [item.name]: item.quantity,
                }
              : acc,
          {},
        )
      : null;

    const {
      achievementDiaries = null,
      levels = null,
      quests = null,
    } = hasWikiSyncData
      ? {
          achievementDiaries: parseAchievementDiaries(
            wikiSyncData.achievement_diaries,
          ),
          levels: parseLevels(wikiSyncData.levels),
          quests: wikiSyncData.quests,
        }
      : {};

    const acquiredItems =
      hasWikiSyncData || !isCollectionLogError(collectionLogData)
        ? Object.values(itemsResponseFixture)
            .flatMap(({ items }) => items)
            .filter((item) =>
              isItemAcquired(item, {
                collectionLogItems,
                quests,
                achievementDiaries,
                levels,
              }),
            )
            .map(({ name }) => name)
        : [];

    const joinDate = await getJoinedDate(player);

    return NextResponse.json({
      acquiredItems,
      achievementDiaries,
      joinDate,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(emptyResponse, {
      status: 500,
    });
  }
}
