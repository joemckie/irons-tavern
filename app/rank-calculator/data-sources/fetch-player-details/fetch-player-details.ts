import { get } from 'get-wild';
import {
  AcquiredItemMap,
  CollectionLogItem,
} from '@/app/schemas/collection-log';
import { itemList } from '@/data/item-list';
import {
  rankSubmissionStatusKey,
  userOSRSAccountsKey,
  userRankSubmissionsKey,
} from '@/config/redis';
import { stripEntityName } from '@/app/rank-calculator/utils/strip-entity-name';
import { ApiResponse } from '@/types/api';
import { fetchTemplePlayerStats } from '@/app/rank-calculator/data-sources/temple-osrs';
import * as Sentry from '@sentry/nextjs';
import { auth } from '@/auth';
import { Rank } from '@/config/enums';
import { redis } from '@/redis';
import { Player } from '@/app/schemas/player';
import { clientConstants } from '@/config/constants.client';
import { RankSubmissionStatus } from '@/app/schemas/rank-calculator';
import { redirect } from 'next/navigation';
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
import { validatePlayerExists } from '../../players/validation/player-validation';

interface PlayerDetailsResponse
  extends Omit<RankCalculatorSchema, 'rank' | 'points'> {
  previousSubmissionStatus: RankSubmissionStatus | null;
  currentRank?: Rank;
}

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
  previousSubmissionStatus: null,
} satisfies PlayerDetailsResponse;

export async function fetchPlayerDetails(
  player: string,
): Promise<ApiResponse<PlayerDetailsResponse>> {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error('No user session');
  }

  const playerRecord = await redis.hget<Player>(
    userOSRSAccountsKey(session.user.id),
    player.toLowerCase(),
  );

  if (!playerRecord) {
    throw new Error('Unable to find player record');
  }

  Sentry.setTag('has-player-record', true);

  if (playerRecord.isNameInvalid) {
    redirect(`/rank-calculator/players/edit/${player}`);
  }

  const isPlayerNameValid = validatePlayerExists(player);

  if (!isPlayerNameValid) {
    // Flag the account as having an invalid name, and force the user to edit it
    await redis.hset<Player>(userOSRSAccountsKey(session.user.id), {
      [player.toLowerCase()]: {
        ...playerRecord,
        isNameInvalid: true,
      },
    });

    redirect(`/rank-calculator/players/edit/${player}`);
  }

  try {
    const latestRankSubmissionId: string | null = await redis.lindex(
      userRankSubmissionsKey(session.user.id, player),
      0,
    );

    const { joinDate, rsn, rank: currentRank } = playerRecord;
    const [
      wikiSyncData,
      collectionLogData,
      templeData,
      previousSubmission,
      previousSubmissionStatus,
    ] = await Promise.all([
      getWikiSyncData(player),
      getCollectionLog(player),
      fetchTemplePlayerStats(player, true),
      latestRankSubmissionId
        ? redis.json.get<RankCalculatorSchema>(latestRankSubmissionId)
        : null,
      latestRankSubmissionId
        ? redis.get<RankSubmissionStatus>(
            rankSubmissionStatusKey(latestRankSubmissionId),
          )
        : null,
    ]);

    const hasThirdPartyData = Boolean(
      wikiSyncData || collectionLogData || templeData,
    );

    Sentry.setTags({
      'has-wikisync-data': !!wikiSyncData,
      'has-collection-log-data': !!collectionLogData,
      'has-temple-data': !!templeData,
      'has-previous-submission': !!previousSubmission,
      'has-third-party-data': hasThirdPartyData,
    });

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
        ).reduce<AcquiredItemMap>(
          (acc, item) =>
            item.obtained
              ? {
                  ...acc,
                  [stripEntityName(item.name)]: item.quantity,
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
                acquiredItems: collectionLogItems,
                quests,
                achievementDiaries,
                levels,
                musicTracks,
                combatAchievements,
                totalLevel,
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
      (acc, val) => ({ ...acc, [stripEntityName(val)]: true }),
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
        ehb: Math.round(Math.max(ehb ?? 0, previousSubmission?.ehb ?? 0)),
        ehp: Math.round(Math.max(ehp ?? 0, previousSubmission?.ehp ?? 0)),
        totalLevel: Math.max(
          totalLevel ?? 0,
          previousSubmission?.totalLevel ?? 0,
        ),
        collectionLogTotal:
          collectionLogTotal ?? clientConstants.collectionLog.totalItems,
        joinDate,
        playerName: rsn,
        rankStructure: previousSubmission?.rankStructure ?? 'Standard',
        proofLink,
        currentRank,
        previousSubmissionStatus,
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
