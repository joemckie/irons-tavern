import { combatAchievementItem, itemList, singleItem } from '@/data/item-list';
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
import { maximumTotalLevel, TzHaarCape } from '@/app/schemas/osrs';
import {
  CollectionLogItem,
  CombatAchievementItem,
  CustomItem,
} from '@/app/schemas/items';
import { isItemAcquired } from './utils/is-item-acquired';
import { getWikiSyncData } from './get-wikisync-data';
import { fetchTemplePlayerStats } from '../fetch-temple-player-stats';
import { calculateCombatAchievementTier } from './utils/calculate-combat-achievement-tier';
import { parseAchievementDiaries } from './utils/parse-achievement-diaries';
import { parseLevels } from './utils/parse-levels';
import { mergeCombatAchievementTier } from './utils/merge-combat-achievement-tier';
import { mergeAchievementDiaries } from './utils/merge-achievement-diaries';
import { calculateEfficiencyData } from './utils/calculate-efficiency-data';
import { RankCalculatorSchema } from '../../[player]/submit-rank-calculator-validation';
import { validatePlayerExists } from '../../players/validation/player-validation';
import { fetchTemplePlayerCollectionLog } from './fetch-temple-collection-log';
import { fetchTempleConstants } from './fetch-temple-constants';

interface PlayerDetailsResponse
  extends Omit<RankCalculatorSchema, 'rank' | 'points'> {
  currentRank?: Rank;
  hasTemplePlayerStats: boolean;
  hasTempleCollectionLog: boolean;
  hasWikiSyncData: boolean;
  hasThirdPartyData: boolean;
  isTempleCollectionLogOutdated: boolean;
  isMobileOnly: boolean;
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
  hasTemplePlayerStats: false,
  hasTempleCollectionLog: false,
  hasWikiSyncData: false,
  hasThirdPartyData: false,
  isTempleCollectionLogOutdated: false,
  isMobileOnly: false,
  tzhaarCape: 'None',
  hasBloodTorva: false,
  hasDizanasQuiver: false,
  combatMultiplier: 0,
  skillingMultiplier: 0,
  collectionLogMultiplier: 0,
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
    // // Flag the account as having an invalid name, and force the user to edit it
    // await redis.hset<Player>(userOSRSAccountsKey(userId), {
    //   [player.toLowerCase()]: {
    //     ...playerRecord,
    //     isNameInvalid: true,
    //   },
    // });
    // redirect(`/rank-calculator/players/edit/${player}`);
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
    const [wikiSyncData, templePlayerStats, templeCollectionLog] =
      await Promise.all([
        getWikiSyncData(player),
        fetchTemplePlayerStats(player, true),
        fetchTemplePlayerCollectionLog(player),
      ]);

    const hasThirdPartyData = Boolean(
      wikiSyncData || templePlayerStats || templeCollectionLog,
    );

    Sentry.setTags({
      'has-wikisync-data': !!wikiSyncData,
      'has-temple-data': !!templePlayerStats,
      'has-temple-collection-log-data': !!templeCollectionLog,
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

    const collectionLogTotal =
      templeCollectionLog?.total_collections_available ??
      (await fetchTempleConstants())?.MAX_COLLECTION_LOGS;

    if (!collectionLogTotal) {
      throw new Error('Unable to determine max collection log slots');
    }

    const combatAchievementTier = wikiSyncData
      ? await calculateCombatAchievementTier(wikiSyncData.combat_achievements)
      : null;

    const {
      Overall_level: totalLevel = null,
      Collections: hiscoresCollectionLogCount = null,
    } = templePlayerStats ?? {};
    const { ehb, ehp } = calculateEfficiencyData(templePlayerStats);

    const { total_collections_finished: templeCollectionLogCount = null } =
      templeCollectionLog ?? {};

    const isTempleCollectionLogOutdated =
      templeCollectionLogCount && hiscoresCollectionLogCount
        ? templeCollectionLogCount < hiscoresCollectionLogCount
        : false;

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

    const collectionLogItems =
      templeCollectionLog?.items.reduce(
        (acc, { name, count }) => ({
          ...acc,
          [stripEntityName(name)]: count,
        }),
        CollectionLogAcquiredItemMap.parse({}),
      ) ?? null;

    /**
     * Some items must be retrieved from the collection log,
     * but are not displayed in the notable items list.
     */
    const additionalItems = [
      singleItem({
        name: 'Fire cape',
        collectionLogCategory: 'tzhaar',
      }),
      singleItem({
        name: 'Infernal cape',
        collectionLogCategory: 'tzhaar',
      }),
      singleItem({
        name: "Dizana's quiver",
        clogName: "Dizana's quiver (uncharged)",
        collectionLogCategory: 'fortis_colosseum',
      }),
      combatAchievementItem({
        name: 'Ancient blood ornament kit',
        points: 1,
        requiredCombatAchievements: [
          490, // https://oldschool.runescape.wiki/w/Vardorvis_Sleeper
          499, // https://oldschool.runescape.wiki/w/Whispered
          508, // https://oldschool.runescape.wiki/w/Leviathan_Sleeper
          517, // https://oldschool.runescape.wiki/w/Duke_Sucellus_Sleeper
        ],
      }),
    ] satisfies (CollectionLogItem | CombatAchievementItem)[];

    const acquiredItems =
      wikiSyncData || templeCollectionLog
        ? Object.values(itemList)
            .flatMap(({ items }) => items)
            .concat(additionalItems)
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

    const proofLink =
      savedData?.proofLink ??
      (templeCollectionLog
        ? `${clientConstants.temple.baseUrl}/player/collection-log.php?player=${player}`
        : null);

    const acquiredItemsMap = [
      ...new Set(acquiredItems.concat(previouslyAcquiredItems)),
    ].reduce<Record<string, boolean>>(
      (acc, val) => ({ ...acc, [stripEntityName(val)]: true }),
      {},
    );

    const tzhaarCape =
      (acquiredItemsMap['Infernal cape'] && TzHaarCape.enum['Infernal cape']) ||
      (acquiredItemsMap['Fire cape'] && TzHaarCape.enum['Fire cape']) ||
      TzHaarCape.enum.None;

    const hasBloodTorva = acquiredItemsMap['Ancient blood ornament kit'];

    const hasDizanasQuiver = acquiredItemsMap['Dizanas quiver'];

    const hasAchievementDiaryCape = achievementDiaries
      ? Object.values(achievementDiaries).every((tier) => tier === 'Elite')
      : false;

    const hasMaxCape = totalLevel === maximumTotalLevel;

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
          templeCollectionLogCount ?? 0,
          hiscoresCollectionLogCount ?? 0,
          savedData?.collectionLogCount ?? 0,
        ),
        ehb: Math.round(ehb ?? savedData?.ehb ?? 0),
        ehp: Math.round(ehp ?? savedData?.ehp ?? 0),
        totalLevel: Math.max(totalLevel ?? 0, savedData?.totalLevel ?? 0),
        collectionLogTotal,
        joinDate,
        playerName: rsn,
        rankStructure: savedData?.rankStructure ?? 'Standard',
        proofLink,
        currentRank,
        hasTemplePlayerStats: !!templePlayerStats,
        hasTempleCollectionLog: !!templeCollectionLog,
        hasWikiSyncData: !!wikiSyncData,
        hasThirdPartyData,
        isTempleCollectionLogOutdated,
        isMobileOnly: playerRecord.isMobileOnly,
        tzhaarCape,
        hasBloodTorva,
        hasDizanasQuiver,
        hasAchievementDiaryCape,
        hasMaxCape,
        collectionLogMultiplier: 0,
        combatMultiplier: 0,
        skillingMultiplier: 0,
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
