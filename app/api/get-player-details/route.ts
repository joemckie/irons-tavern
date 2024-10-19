import { NextRequest, NextResponse } from 'next/server';
import { get } from 'get-wild';
import {
  CollectionLogItemMap,
  CollectionLogItem,
} from '@/types/collection-log';
import { itemsResponseFixture } from '@/fixtures/items-response.fixture';
import { PlayerData } from '@/types/rank-calculator';
import { isItemAcquired } from './utils/is-item-acquired';
import { getWikiSyncData } from './utils/get-wikisync-data';
import { getCollectionLog } from './utils/get-collection-log';
import { calculateCombatAchievementTier } from './utils/calculate-combat-achievement-tier';
import {
  emptyAchievementDiaryList,
  parseAchievementDiaries,
} from './utils/parse-achievement-diaries';
import { getJoinedDate } from './utils/get-joined-date';
import { parseLevels } from './utils/parse-levels';

export async function GET(
  request: NextRequest,
): Promise<NextResponse<PlayerData>> {
  const player = request.nextUrl.searchParams.get('player');

  if (!player) {
    return NextResponse.json(emptyAchievementDiaryList, {
      status: 400,
    });
  }

  try {
    const wikiSyncData = await getWikiSyncData(player);
    const collectionLogData = await getCollectionLog(player);

    const hasThirdPartyData = wikiSyncData || collectionLogData;

    if (!hasThirdPartyData) {
      return NextResponse.json(emptyAchievementDiaryList, { status: 404 });
    }

    const combatAchievementTier = wikiSyncData
      ? await calculateCombatAchievementTier(wikiSyncData.combat_achievements)
      : null;

    const collectionLogItems = collectionLogData
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

    const collectionLogCount =
      collectionLogData?.collectionLog.uniqueObtained ?? null;
    const collectionLogTotal =
      collectionLogData?.collectionLog.uniqueItems ?? null;

    const {
      achievementDiaries = null,
      levels = null,
      quests = null,
      musicTracks = null,
    } = wikiSyncData
      ? {
          achievementDiaries: parseAchievementDiaries(
            wikiSyncData.achievement_diaries,
          ),
          levels: parseLevels(wikiSyncData.levels),
          quests: wikiSyncData.quests,
          musicTracks: wikiSyncData.music_tracks,
        }
      : {};

    const acquiredItems =
      wikiSyncData || collectionLogData
        ? Object.values(itemsResponseFixture)
            .flatMap(({ items }) => items)
            .filter((item) =>
              isItemAcquired(item, {
                collectionLogItems,
                quests,
                achievementDiaries,
                levels,
                musicTracks,
              }),
            )
            .map(({ name }) => name)
        : [];

    const joinDate = await getJoinedDate(player);

    return NextResponse.json({
      acquiredItems,
      achievementDiaries,
      combatAchievementTier,
      collectionLogCount,
      collectionLogTotal,
      joinDate,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(emptyAchievementDiaryList, {
      status: 500,
    });
  }
}
