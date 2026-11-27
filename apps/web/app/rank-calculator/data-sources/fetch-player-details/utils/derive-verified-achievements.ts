import "core-js/actual/set/is-subset-of";
import { itemList } from "@/data/item-list";
import { normaliseEntityName } from "@/app/rank-calculator/utils/normalise-entity-name";
import { CollectionLogAcquiredItemMap, isHolidayTrack, WikiSyncResponse } from "@/app/schemas/wiki";
import { CombatAchievementTier, TzHaarCape } from "@/app/schemas/osrs";
import { AchievementDiaryMap } from "@/app/schemas/rank-calculator";
import { isAchievementDiaryCapeAchieved } from "../../../utils/is-achievement-diary-cape-achieved";
import { isItemAcquired } from "./is-item-acquired";
import { calculateCombatAchievementTier } from "./calculate-combat-achievement-tier";
import { parseAchievementDiaries } from "./parse-achievement-diaries";

interface VerifiedAchievementSources {
  wikiSyncData: WikiSyncResponse | null;
  /** Normalised collection log item name → count */
  collectionLogItems: CollectionLogAcquiredItemMap | null;
  zukKillCount: number | null;
}

export interface VerifiedAchievements {
  /** Normalised names of acquired notable items, before any saved data is merged in */
  acquiredItems: string[];
  hasMusicCape: boolean;
  achievementDiaries: AchievementDiaryMap | null;
  combatAchievementTier: CombatAchievementTier | null;
  tzhaarCape: TzHaarCape;
  hasBloodTorva: boolean;
  hasDizanasQuiver: boolean;
  hasAchievementDiaryCape: boolean;
}

/**
 * Derives everything that can be verified from third-party data (WikiSync, TempleOSRS).
 */
export async function deriveVerifiedAchievements({
  wikiSyncData,
  collectionLogItems,
  zukKillCount,
}: VerifiedAchievementSources): Promise<VerifiedAchievements> {
  const combatAchievementTier = wikiSyncData
    ? await calculateCombatAchievementTier(wikiSyncData.combat_achievements)
    : null;

  const {
    achievementDiaries = null,
    quests = null,
    musicTracks = null,
    combatAchievements = null,
  } = wikiSyncData
    ? {
        achievementDiaries: parseAchievementDiaries(wikiSyncData.achievement_diaries),
        quests: wikiSyncData.quests,
        musicTracks: wikiSyncData.music_tracks,
        combatAchievements: wikiSyncData.combat_achievements,
      }
    : {};

  const acquiredItems =
    wikiSyncData || collectionLogItems
      ? Object.values(itemList)
          .flatMap(({ items }) => items)
          .filter((item) =>
            isItemAcquired(item, {
              acquiredItems: collectionLogItems,
              quests,
              combatAchievements,
            }),
          )
          .map(({ name }) => normaliseEntityName(name))
      : [];

  const hasMusicCape = musicTracks
    ? Object.entries(musicTracks)
        .filter(([track]) => !isHolidayTrack(track))
        .every(([, unlocked]) => unlocked)
    : false;

  const hasInfernalCape = zukKillCount ? zukKillCount > 0 : false;
  const hasFireCape =
    wikiSyncData?.combat_achievements.includes(
      147, // https://oldschool.runescape.wiki/w/Fight_Caves_Veteran
    ) ?? false;

  const tzhaarCape =
    (hasInfernalCape && TzHaarCape.enum["Infernal cape"]) ||
    (hasFireCape && TzHaarCape.enum["Fire cape"]) ||
    TzHaarCape.enum.None;

  const hasBloodTorva = new Set([
    490, // https://oldschool.runescape.wiki/w/Vardorvis_Sleeper
    499, // https://oldschool.runescape.wiki/w/Whispered
    508, // https://oldschool.runescape.wiki/w/Leviathan_Sleeper
    517, // https://oldschool.runescape.wiki/w/Duke_Sucellus_Sleeper
  ]).isSubsetOf(new Set(wikiSyncData?.combat_achievements));

  const hasDizanasQuiver =
    wikiSyncData?.combat_achievements.includes(
      538, // https://oldschool.runescape.wiki/w/Sportsmanship
    ) ?? false;

  const hasAchievementDiaryCape = achievementDiaries
    ? isAchievementDiaryCapeAchieved(achievementDiaries)
    : false;

  return {
    acquiredItems,
    hasMusicCape,
    achievementDiaries,
    combatAchievementTier,
    tzhaarCape,
    hasBloodTorva,
    hasDizanasQuiver,
    hasAchievementDiaryCape,
  };
}
