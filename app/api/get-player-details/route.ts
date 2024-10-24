import { NextRequest, NextResponse } from 'next/server';
import { get } from 'get-wild';
import {
  CollectionLogItemMap,
  CollectionLogItem,
} from '@/types/collection-log';
import { PlayerData } from '@/types/rank-calculator';
import { itemList } from '@/data/item-list';
import { isItemAcquired } from './utils/is-item-acquired';
import { getWikiSyncData } from './utils/get-wikisync-data';
import { getCollectionLog } from './utils/get-collection-log';
import { calculateCombatAchievementTier } from './utils/calculate-combat-achievement-tier';
import { parseAchievementDiaries } from './utils/parse-achievement-diaries';
import { getJoinedDate } from './utils/get-joined-date';
import { parseLevels } from './utils/parse-levels';
import { getTempleData } from './utils/get-temple-data';

const emptyResponse = {
  achievementDiaries: null,
  acquiredItems: null,
  joinDate: null,
  collectionLogCount: null,
  collectionLogTotal: null,
  combatAchievementTier: null,
  ehb: null,
  ehp: null,
  totalLevel: null,
} satisfies PlayerData;

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
    const [wikiSyncData, collectionLogData, templeData] = await Promise.all([
      getWikiSyncData(player),
      getCollectionLog(player),
      getTempleData(player),
    ]);

    const hasThirdPartyData = Boolean(
      wikiSyncData || collectionLogData || templeData,
    );

    if (!hasThirdPartyData) {
      return NextResponse.json(emptyResponse, { status: 404 });
    }

    const combatAchievementTier = wikiSyncData
      ? await calculateCombatAchievementTier(wikiSyncData.combat_achievements)
      : null;

    const {
      Im_ehb: ehb = null,
      Im_ehp: ehp = null,
      Overall_level: totalLevel = null,
    } = templeData ?? {};

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
        ? Object.values(itemList)
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

    return NextResponse.json<PlayerData>({
      acquiredItems,
      achievementDiaries,
      combatAchievementTier,
      collectionLogCount,
      collectionLogTotal,
      joinDate,
      ehb: ehb ? Math.round(ehb) : null,
      ehp: ehp ? Math.round(ehp) : null,
      totalLevel,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(emptyResponse, {
      status: 500,
    });
  }
}
