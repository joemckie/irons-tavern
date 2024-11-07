import { get } from 'get-wild';
import {
  CollectionLogItemMap,
  CollectionLogItem,
} from '@/app/schemas/collection-log';
import { itemList } from '@/data/item-list';
import { userOSRSAccountsKey, userRankSubmissionsKey } from '@/config/redis';
import { stripEntityName } from '@/app/rank-calculator/utils/strip-entity-name';
import { ApiResponse } from '@/types/api';
import { fetchTemplePlayerStats } from '@/app/rank-calculator/data-sources/temple-osrs';
import * as Sentry from '@sentry/nextjs';
import { auth } from '@/auth';
import { redis } from '@/redis';
import { Player } from '@/app/schemas/player';
import { isItemAcquired } from './utils/is-item-acquired';
import { getWikiSyncData } from './get-wikisync-data';
import { getCollectionLog } from './get-collection-log';
import { calculateCombatAchievementTier } from './utils/calculate-combat-achievement-tier';
import { parseAchievementDiaries } from './utils/parse-achievement-diaries';
import { parseLevels } from './utils/parse-levels';
import { mergeCombatAchievementTier } from './utils/merge-combat-achievement-tier';
import { mergeAchievementDiaries } from './utils/merge-achievement-diaries';
import { calculateEfficiencyData } from './utils/calculate-efficiency-data';
import { RankCalculatorSchema } from '../../[player]/submit-rank-calculator-validation';

export const emptyResponse = {
  achievementDiaries: {
    'Kourend & Kebos': 'None',
    'Lumbridge & Draynor': 'None',
    'Western Provinces': 'None',
    Ardougne: 'None',
    Desert: 'None',
    Falador: 'None',
    Fremennik: 'None',
    Kandarin: 'None',
    Karamja: 'None',
    Morytania: 'None',
    Varrock: 'None',
    Wilderness: 'None',
  },
  acquiredItems: {},
  joinDate: new Date(),
  collectionLogCount: 0,
  collectionLogTotal: 0,
  combatAchievementTier: 'None',
  ehb: 0,
  ehp: 0,
  totalLevel: 0,
  playerName: '',
  rankStructure: 'Standard',
  proofLink: null,
} satisfies Omit<RankCalculatorSchema, 'rank' | 'points'>;

export async function fetchPlayerDetails(
  player: string,
): Promise<ApiResponse<Omit<RankCalculatorSchema, 'rank' | 'points'>>> {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error('No user session');
  }

  try {
    const playerRecord = await redis.hget<Player>(
      userOSRSAccountsKey(session.user.id),
      player.toLowerCase(),
    );
    const latestRankSubmissionId: string | null = await redis.lindex(
      userRankSubmissionsKey(session.user.id, player),
      0,
    );

    if (!playerRecord) {
      throw new Error('Unable to find player record');
    }

    const { joinDate, rsn } = playerRecord;
    const [wikiSyncData, collectionLogData, templeData, previousSubmission] =
      await Promise.all([
        getWikiSyncData(player),
        getCollectionLog(player),
        fetchTemplePlayerStats(player, true),
        latestRankSubmissionId
          ? redis.json.get<RankCalculatorSchema>(latestRankSubmissionId)
          : null,
      ]);

    const hasThirdPartyData = Boolean(
      wikiSyncData || collectionLogData || templeData,
    );

    if (!hasThirdPartyData && !previousSubmission) {
      return {
        error: null,
        success: true,
        data: emptyResponse,
      };
    }

    const combatAchievementTier = wikiSyncData
      ? await calculateCombatAchievementTier(wikiSyncData.combat_achievements)
      : null;

    const { Overall_level: totalLevel = null } = templeData ?? {};
    const { ehb, ehp } = calculateEfficiencyData(templeData);

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
      combatAchievements = null,
    } = wikiSyncData
      ? {
          achievementDiaries: parseAchievementDiaries(
            wikiSyncData.achievement_diaries,
          ),
          levels: parseLevels(wikiSyncData.levels),
          quests: wikiSyncData.quests,
          musicTracks: wikiSyncData.music_tracks,
          combatAchievements: wikiSyncData.combat_achievements,
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
                combatAchievements,
              }),
            )
            .map(({ name }) => stripEntityName(name))
        : [];

    const previouslyAcquiredItems = previousSubmission
      ? Object.keys(previousSubmission.acquiredItems).filter(
          (key) => previousSubmission.acquiredItems[key],
        )
      : [];

    const proofLink =
      previousSubmission?.proofLink ??
      (collectionLogData ? `https://collectionlog.net/log/${player}` : null);

    const acquiredItemsMap = [
      ...new Set(acquiredItems.concat(previouslyAcquiredItems)),
    ].reduce<Record<string, boolean>>(
      (acc, val) => ({ ...acc, [val]: true }),
      {},
    );

    return {
      success: true,
      error: null,
      data: {
        achievementDiaries:
          mergeAchievementDiaries(
            achievementDiaries,
            previousSubmission?.achievementDiaries ?? null,
          ) ?? emptyResponse.achievementDiaries,
        acquiredItems: acquiredItemsMap,
        combatAchievementTier:
          mergeCombatAchievementTier(
            combatAchievementTier,
            previousSubmission?.combatAchievementTier ?? null,
          ) ?? 'None',
        collectionLogCount: Math.max(
          collectionLogCount ?? 0,
          previousSubmission?.collectionLogCount ?? 0,
        ),
        ehb:
          ehb || previousSubmission?.ehb
            ? Math.round(Math.max(ehb ?? 0, previousSubmission?.ehb ?? 0))
            : 0,
        ehp:
          ehp || previousSubmission?.ehp
            ? Math.round(Math.max(ehp ?? 0, previousSubmission?.ehp ?? 0))
            : 0,
        totalLevel:
          totalLevel || previousSubmission?.totalLevel
            ? Math.max(totalLevel ?? 0, previousSubmission?.totalLevel ?? 0)
            : 0,
        collectionLogTotal: collectionLogTotal ?? 0,
        joinDate,
        playerName: rsn,
        rankStructure: previousSubmission?.rankStructure ?? 'Standard',
        proofLink,
      },
    };
  } catch (error) {
    Sentry.captureException(error);

    return {
      error: 'Something went wrong',
      success: false,
    };
  }
}
