import "core-js/actual/set/intersection";
import { itemList } from "@/data/item-list";
import { CollectionLogAcquiredItemMap, WikiSyncResponse } from "@/app/schemas/wiki";
import { GroupCollectionLogMember, MemberInfo } from "@/app/schemas/temple-api";
import { maximumTotalLevel } from "@/app/schemas/osrs";
import { AchievementDiaryMap } from "@/app/schemas/rank-calculator";
import { normaliseEntityName } from "../utils/normalise-entity-name";
import { PlayerRankInput } from "../utils/calculators/calculate-player-rank";
import { calculateTavernDiaryTierMultipliers } from "../utils/calculators/calculate-tavern-diary-tier-multipliers";
import { deriveVerifiedAchievements } from "../data-sources/fetch-player-details/utils/derive-verified-achievements";

export type VerifiedRankInputResult =
  | { success: true; input: PlayerRankInput }
  | { success: false; reason: "Missing Temple stats" };

interface VerifiedRankInputSources {
  /** From the group member info, keyed by Temple RSN */
  memberInfo: MemberInfo;
  /** The member's entry in the group collection log */
  collectionLogMember: GroupCollectionLogMember;
  collectionLogTotal: number;
  /** Item ID → collection log item name */
  itemNames: Record<string, string>;
  wikiSyncData: WikiSyncResponse;
  /** From `OSRSAccount.joinDate` */
  joinDate: Date;
  discordRoles: Set<string>;
}

const emptyAchievementDiaries = {
  "Kourend & Kebos": "None",
  "Lumbridge & Draynor": "None",
  "Western Provinces": "None",
  Ardougne: "None",
  Desert: "None",
  Falador: "None",
  Fremennik: "None",
  Kandarin: "None",
  Karamja: "None",
  Morytania: "None",
  Varrock: "None",
  Wilderness: "None",
} satisfies AchievementDiaryMap;

function buildCollectionLogItems(
  items: GroupCollectionLogMember["items"],
  itemNames: Record<string, string>,
) {
  return Object.entries(items).reduce<CollectionLogAcquiredItemMap>((acc, [id, count]) => {
    const name = itemNames[id];

    if (!name) {
      return acc;
    }

    const key = normaliseEntityName(name);

    // Several item IDs can share a collection log name (e.g. graceful recolours)
    acc[key] = Math.max(acc[key] ?? 0, count);

    return acc;
  }, {});
}

/**
 * Builds the rank calculator input purely from verified third-party data.
 * No draft or saved submission data is used.
 */
export async function buildVerifiedRankInput({
  memberInfo: { skills, bosses, primary_ehp: primaryEhp, primary_ehb: primaryEhb },
  collectionLogMember,
  collectionLogTotal,
  itemNames,
  wikiSyncData,
  joinDate,
  discordRoles,
}: VerifiedRankInputSources): Promise<VerifiedRankInputResult> {
  const totalLevel = skills?.Overall_level;
  const ehp = primaryEhp ? skills?.[primaryEhp] : undefined;
  const ehb = primaryEhb ? bosses?.[primaryEhb] : undefined;

  if (totalLevel === undefined || ehp === undefined || ehb === undefined || !bosses) {
    return { success: false, reason: "Missing Temple stats" };
  }

  const {
    acquiredItems,
    hasMusicCape,
    achievementDiaries,
    combatAchievementTier,
    tzhaarCape,
    hasBloodTorva,
    hasDizanasQuiver,
    hasAchievementDiaryCape,
  } = await deriveVerifiedAchievements({
    wikiSyncData,
    collectionLogItems: buildCollectionLogItems(collectionLogMember.items, itemNames),
    zukKillCount: bosses["TzKal-Zuk"] ?? null,
  });

  const allCurrentNotableItemNames = new Set(
    Object.values(itemList)
      .flatMap(({ items }) => items)
      .map(({ name }) => normaliseEntityName(name)),
  );

  // Mirrors fetchPlayerDetails, without merging in any previously saved items
  const acquiredItemsMap = [
    ...new Set(acquiredItems).intersection(allCurrentNotableItemNames),
  ].reduce<Record<string, boolean>>(
    (acc, val) => ({
      ...acc,
      [normaliseEntityName(val)]: true,
    }),
    { ...(hasMusicCape && { [normaliseEntityName("Music cape")]: true }) },
  );

  const { collectionLogBonusMultiplier, combatBonusMultiplier, skillingBonusMultiplier } =
    calculateTavernDiaryTierMultipliers(discordRoles);

  return {
    success: true,
    input: {
      joinDate,
      collectionLogTotal,
      collectionLogCount: Math.max(
        collectionLogMember.total_collections_finished,
        bosses.Collections ?? 0,
      ),
      acquiredItems: acquiredItemsMap,
      achievementDiaries: achievementDiaries ?? emptyAchievementDiaries,
      combatAchievementTier: combatAchievementTier ?? "None",
      ehp: Math.round(ehp),
      ehb: Math.round(ehb),
      totalLevel,
      rankStructure: "Standard",
      tzhaarCape,
      hasBloodTorva,
      hasDizanasQuiver,
      hasAchievementDiaryCape,
      hasMaxCape: totalLevel === maximumTotalLevel,
      collectionLogBonusMultiplier,
      combatBonusMultiplier,
      skillingBonusMultiplier,
      notableItemsBonusMultiplier: 0,
    },
  };
}
