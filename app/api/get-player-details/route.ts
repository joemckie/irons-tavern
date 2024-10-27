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
import { merge } from 'lodash';
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
  playerName: null,
  rankStructure: RankStructure.Standard,
} satisfies PlayerData;

const redis = Redis.fromEnv({
  keepAlive: false,
});

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
      {
        status: 400,
      },
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

    if (!hasThirdPartyData) {
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
            .map(({ name }) => stripEntityName(name))
        : [];

    const playerMeta = await getPlayerMeta(player);
    const playerDetails = {
      acquiredItems,
      achievementDiaries,
      combatAchievementTier,
      collectionLogCount,
      collectionLogTotal,
      joinDate: playerMeta?.joinDate ?? null,
      ehb: ehb ? Math.round(ehb) : null,
      ehp: ehp ? Math.round(ehp) : null,
      totalLevel,
      playerName: playerMeta?.rsn ?? player,
      rankStructure: RankStructure.Standard,
    } satisfies PlayerData;

    if (!previousSubmission) {
      return NextResponse.json({
        success: true,
        data: playerDetails,
        error: null,
      });
    }

    const previouslyAcquiredItems = Object.keys(
      previousSubmission.acquiredItems,
    ).filter((key) => previousSubmission.acquiredItems[key]);

    return NextResponse.json<ApiResponse<NonNullableFields<PlayerData>>>({
      success: true,
      error: null,
      data: {
        achievementDiaries: mergeAchievementDiaries(
          playerDetails.achievementDiaries,
          previousSubmission.achievementDiaries,
        ),
        acquiredItems: [
          ...new Set(
            merge(playerDetails.acquiredItems, previouslyAcquiredItems),
          ),
        ],
        combatAchievementTier: mergeCombatAchievementTier(
          playerDetails.combatAchievementTier,
          previousSubmission.combatAchievementTier,
        ),
        collectionLogCount: Math.max(
          previousSubmission.collectionLogCount,
          playerDetails.collectionLogCount ?? 0,
        ),
        ehb: Math.max(previousSubmission.ehb, playerDetails.ehb ?? 0),
        ehp: Math.max(previousSubmission.ehp, playerDetails.ehp ?? 0),
        totalLevel: Math.max(
          previousSubmission.totalLevel,
          playerDetails.totalLevel ?? 0,
        ),
        collectionLogTotal: collectionLogTotal ?? 0,
        joinDate: playerDetails.joinDate ?? previousSubmission.joinDate,
        playerName: playerDetails.playerName,
        rankStructure:
          previousSubmission.rankStructure ?? playerDetails.rankStructure,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error,
        success: false,
      },
      {
        status: 500,
      },
    );
  }
}
