import { itemList } from '@/data/item-list';
import {
  userDraftRankSubmissionKey,
  userOSRSAccountsKey,
} from '@/config/redis';
import { stripEntityName } from '@/app/rank-calculator/utils/strip-entity-name';
import { ApiResponse } from '@/types/api';
import * as Sentry from '@sentry/nextjs';
import { Rank } from '@/config/enums';
import { redis } from '@/redis';
import { Player } from '@/app/schemas/player';
import { clientConstants } from '@/config/constants.client';
import { redirect } from 'next/navigation';
import { CollectionLogAcquiredItemMap } from '@/app/schemas/wiki';
import { isItemAcquired } from './utils/is-item-acquired';
import { getWikiSyncData } from './get-wikisync-data';
import { fetchTemplePlayerStats } from '../temple-osrs';
import { calculateCombatAchievementTier } from './utils/calculate-combat-achievement-tier';
import { parseAchievementDiaries } from './utils/parse-achievement-diaries';
import { parseLevels } from './utils/parse-levels';
import { mergeCombatAchievementTier } from './utils/merge-combat-achievement-tier';
import { mergeAchievementDiaries } from './utils/merge-achievement-diaries';
import { calculateEfficiencyData } from './utils/calculate-efficiency-data';
import { RankCalculatorSchema } from '../../[player]/submit-rank-calculator-validation';
import { validatePlayerExists } from '../../players/validation/player-validation';
import { getCollectionLogItemMap } from './get-collection-log-item-map';

interface PlayerDetailsResponse
  extends Omit<RankCalculatorSchema, 'rank' | 'points'> {
  currentRank?: Rank;
  hasTempleData: boolean;
  hasWikiSyncData: boolean;
  hasThirdPartyData: boolean;
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
  hasTempleData: false,
  hasWikiSyncData: false,
  hasThirdPartyData: false,
} satisfies PlayerDetailsResponse;

export async function fetchPlayerDetails(
  player: string,
  userId: string,
  mergeSavedData = true,
): Promise<ApiResponse<PlayerDetailsResponse>> {
  const playerRecord = await redis.hget<Player>(
    userOSRSAccountsKey(userId),
    player.toLowerCase(),
  );

  if (!playerRecord) {
    throw new Error('Unable to find player record');
  }

  Sentry.setTag('has-player-record', true);

  if (playerRecord.isNameInvalid) {
    redirect(`/rank-calculator/players/edit/${player}`);
  }

  const isPlayerNameValid = await validatePlayerExists(player);

  if (!isPlayerNameValid) {
    // Flag the account as having an invalid name, and force the user to edit it
    await redis.hset<Player>(userOSRSAccountsKey(userId), {
      [player.toLowerCase()]: {
        ...playerRecord,
        isNameInvalid: true,
      },
    });

    redirect(`/rank-calculator/players/edit/${player}`);
  }

  // Update Temple to get the most up-to-date info
  // Ignore any errors as this isn't required to succeed
  try {
    await fetch(
      `${clientConstants.temple.baseUrl}/php/add_datapoint.php?player=${player}`,
    );
  } catch (error) {
    Sentry.captureException(error);
  }

  try {
    const savedData = mergeSavedData
      ? await redis.json.get<RankCalculatorSchema>(
          userDraftRankSubmissionKey(userId, player),
        )
      : undefined;
    const { joinDate, rsn, rank: currentRank } = playerRecord;
    const [wikiSyncData, templeData, collectionLogItemMap] = await Promise.all([
      getWikiSyncData(player),
      fetchTemplePlayerStats(player, true),
      getCollectionLogItemMap(),
    ]);

    const hasThirdPartyData = Boolean(wikiSyncData || templeData);

    Sentry.setTags({
      'has-wikisync-data': !!wikiSyncData,
      'has-temple-data': !!templeData,
      'has-saved-data': !!savedData,
      'has-third-party-data': hasThirdPartyData,
    });

    if (!hasThirdPartyData && !savedData) {
      return {
        error: null,
        success: true,
        data: emptyResponse,
      };
    }

    const combatAchievementTier = wikiSyncData
      ? await calculateCombatAchievementTier(wikiSyncData.combat_achievements)
      : null;

    const {
      Overall_level: totalLevel = null,
      Collections: collectionLogCount = null,
    } = templeData ?? {};
    const { ehb, ehp } = calculateEfficiencyData(templeData);

    const {
      achievementDiaries = null,
      levels = null,
      quests = null,
      musicTracks = null,
      combatAchievements = null,
      collectionLogItems = {},
    } = wikiSyncData
      ? {
          achievementDiaries: parseAchievementDiaries(
            wikiSyncData.achievement_diaries,
          ),
          levels: parseLevels(wikiSyncData.levels),
          quests: wikiSyncData.quests,
          musicTracks: wikiSyncData.music_tracks,
          combatAchievements: wikiSyncData.combat_achievements,
          collectionLogItems:
            collectionLogItemMap &&
            wikiSyncData.collection_log.reduce((acc, id) => {
              // Some item IDs from WikiSync strangely don't match up to an item in their data file
              // so we need to check that it exists before attempting to parse it
              const item = collectionLogItemMap[id];

              return item
                ? {
                    ...acc,
                    [stripEntityName(collectionLogItemMap[id].name)]: true,
                  }
                : acc;
            }, {} as CollectionLogAcquiredItemMap),
        }
      : {};

    const acquiredItems = wikiSyncData
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

    const previouslyAcquiredItems = savedData
      ? Object.keys(savedData.acquiredItems).filter(
          (key) => savedData.acquiredItems[key],
        )
      : [];

    const proofLink = savedData?.proofLink ?? null;

    const acquiredItemsMap = [
      ...new Set(acquiredItems.concat(previouslyAcquiredItems)),
    ].reduce<Record<string, boolean>>(
      (acc, val) => ({ ...acc, [stripEntityName(val)]: true }),
      {},
    );

    const collectionLogTotal = collectionLogItemMap
      ? Object.keys(collectionLogItemMap).length
      : clientConstants.collectionLog.totalItems;

    return {
      success: true,
      error: null,
      data: {
        achievementDiaries:
          mergeAchievementDiaries(
            achievementDiaries,
            savedData?.achievementDiaries ?? null,
          ) ?? emptyResponse.achievementDiaries,
        acquiredItems: acquiredItemsMap,
        combatAchievementTier:
          mergeCombatAchievementTier(
            combatAchievementTier,
            savedData?.combatAchievementTier ?? null,
          ) ?? 'None',
        collectionLogCount: Math.max(
          collectionLogCount ?? 0,
          savedData?.collectionLogCount ?? 0,
        ),
        ehb: Math.round(Math.max(ehb ?? 0, savedData?.ehb ?? 0)),
        ehp: Math.round(Math.max(ehp ?? 0, savedData?.ehp ?? 0)),
        totalLevel: Math.max(totalLevel ?? 0, savedData?.totalLevel ?? 0),
        collectionLogTotal,
        joinDate,
        playerName: rsn,
        rankStructure: savedData?.rankStructure ?? 'Standard',
        proofLink,
        currentRank,
        hasTempleData: !!templeData,
        hasWikiSyncData: !!wikiSyncData,
        hasThirdPartyData,
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
