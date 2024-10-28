import { NextRequest, NextResponse } from 'next/server';
import { get } from 'get-wild';
import {
  CollectionLogItemMap,
  CollectionLogItem,
} from '@/types/collection-log';
import { FormData, PlayerData, RankStructure } from '@/types/rank-calculator';
import { itemList } from '@/data/item-list';
import { RedisKeyNamespace } from '@/config/redis';
import { Redis } from '@upstash/redis';
import { stripEntityName } from '@/app/rank-calculator/utils/strip-entity-name';
import { ApiResponse } from '@/types/api';
import { isItemAcquired } from './utils/is-item-acquired';
import { getWikiSyncData } from './utils/get-wikisync-data';
import { getCollectionLog } from './utils/get-collection-log';
import { calculateCombatAchievementTier } from './utils/calculate-combat-achievement-tier';
import { parseAchievementDiaries } from './utils/parse-achievement-diaries';
import { getPlayerMeta } from './utils/get-player-meta';
import { parseLevels } from './utils/parse-levels';
import { getTempleData } from './utils/get-temple-data';
import { mergeCombatAchievementTier } from './utils/merge-combat-achievement-tier';
import { mergeAchievementDiaries } from './utils/merge-achievement-diaries';

const redis = Redis.fromEnv({
  keepAlive: false,
});

export const emptyResponse = {
  achievementDiaries: null,
  acquiredItems: null,
  joinDate: null,
  collectionLogCount: null,
  collectionLogTotal: null,
  combatAchievementTier: null,
  ehb: null,
  ehp: null,
  totalLevel: null,
  playerName: null,
  rankStructure: RankStructure.Standard,
} satisfies PlayerData;

export type GetPlayerDetailsResponse = ApiResponse<PlayerData>;

export async function GET(
  request: NextRequest,
): Promise<NextResponse<GetPlayerDetailsResponse>> {
  const player = request.nextUrl.searchParams.get('player');

  if (!player) {
    return NextResponse.json(
      {
        error: 'No player provided',
        success: false,
      },
      { status: 400 },
    );
  }

  try {
    const [wikiSyncData, collectionLogData, templeData, previousSubmission] =
      await Promise.all([
        getWikiSyncData(player),
        getCollectionLog(player),
        getTempleData(player),
        redis.json.get<FormData>(`${RedisKeyNamespace.Submission}:${player}`),
      ]);

    const hasThirdPartyData = Boolean(
      wikiSyncData || collectionLogData || templeData,
    );

    if (!hasThirdPartyData && !previousSubmission) {
      return NextResponse.json(
        {
          error: null,
          success: true,
          data: emptyResponse,
        },
        { status: 404 },
      );
    }

    const combatAchievementTier = wikiSyncData
      ? await calculateCombatAchievementTier(wikiSyncData.combat_achievements)
      : null;

    // TODO: Implement GIMs
    const {
      info,
      // g
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
            .map(({ name }) => stripEntityName(name))
        : [];

    const playerMeta = await getPlayerMeta(player);
    const previouslyAcquiredItems = previousSubmission
      ? Object.keys(previousSubmission.acquiredItems).filter(
          (key) => previousSubmission.acquiredItems[key],
        )
      : [];

    return NextResponse.json<ApiResponse<PlayerData>>({
      success: true,
      error: null,
      data: {
        achievementDiaries: mergeAchievementDiaries(
          achievementDiaries,
          previousSubmission?.achievementDiaries ?? null,
        ),
        acquiredItems: [
          ...new Set(acquiredItems.concat(previouslyAcquiredItems)),
        ],
        combatAchievementTier: mergeCombatAchievementTier(
          combatAchievementTier,
          previousSubmission?.combatAchievementTier ?? null,
        ),
        collectionLogCount: Math.max(
          collectionLogCount ?? 0,
          previousSubmission?.collectionLogCount ?? 0,
        ),
        ehb: Math.max(ehb ?? 0, previousSubmission?.ehb ?? 0),
        ehp: Math.max(ehp ?? 0, previousSubmission?.ehp ?? 0),
        totalLevel: Math.max(
          totalLevel ?? 0,
          previousSubmission?.totalLevel ?? 0,
        ),
        collectionLogTotal: collectionLogTotal ?? 0,
        joinDate:
          playerMeta?.joinDate ?? previousSubmission?.joinDate ?? new Date(),
        playerName: playerMeta?.rsn ?? player,
        rankStructure:
          previousSubmission?.rankStructure ?? RankStructure.Standard,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error,
        success: false,
      },
      { status: 500 },
    );
  }
}
