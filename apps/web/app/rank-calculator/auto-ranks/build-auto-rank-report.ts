import { initORM, withRequestContext } from "@/database/db";
import { OSRSAccount } from "@/database/entities/osrs-account";
import {
  fetchItemDropRates,
  generateRequiredItemList,
} from "../data-sources/fetch-dropped-item-info";
import { getWikiSyncData } from "../data-sources/fetch-player-details/get-wikisync-data";
import { getCaIdMap } from "../data-sources/fetch-player-details/get-combat-achievement-id-map";
import { getCombatAchievementTierThresholds } from "../data-sources/fetch-player-details/get-combat-achievement-tier-thresholds";
import { buildNotableItemList } from "../utils/build-notable-item-list";
import { AutoRankRow, MatchedAccount, resolveAutoRankRows } from "./auto-rank-report";
import { fetchTempleGroupData } from "./data-sources/fetch-temple-group-data";
import { fetchGuildMemberRoles } from "./data-sources/fetch-guild-member-roles";

/**
 * Loads every linked account. RSNs are matched in memory with `normaliseRsn`,
 * as the database only matches case-insensitively, not across spaces, underscores and hyphens.
 */
async function fetchMatchedAccounts(): Promise<MatchedAccount[]> {
  return withRequestContext(async () => {
    const { em } = await initORM();
    const accounts = await em.find(OSRSAccount, {}, { populate: ["user", "draftRankSubmission"] });

    return accounts.map(({ name, joinDate, rank, user, draftRankSubmission }) => ({
      name,
      joinDate,
      rank: rank ?? null,
      discordId: user.discordId,
      discordName: user.name,
      draftRankStructure: draftRankSubmission?.data.rankStructure ?? null,
    }));
  });
}

/**
 * The combat achievement lookups return null on failure, which would otherwise be
 * indistinguishable from a member below the Easy tier. Fail the whole report instead.
 */
async function fetchKnownCombatAchievementIds() {
  const [caIdMap, tierThresholds] = await Promise.all([
    getCaIdMap(),
    getCombatAchievementTierThresholds(),
  ]);

  if (!caIdMap || Object.keys(caIdMap).length === 0 || !tierThresholds) {
    throw new Error("Unable to load combat achievement data from the wiki");
  }

  return new Set(Object.keys(caIdMap).map(Number));
}

export async function buildAutoRankReport(): Promise<AutoRankRow[]> {
  const [temple, discordRoles, accounts, notableItems, knownCombatAchievementIds] =
    await Promise.all([
      fetchTempleGroupData(),
      fetchGuildMemberRoles(),
      fetchMatchedAccounts(),
      fetchItemDropRates([...generateRequiredItemList()]).then(async (dropRates) =>
        Object.entries(await buildNotableItemList(dropRates)),
      ),
      fetchKnownCombatAchievementIds(),
    ]);

  return resolveAutoRankRows({
    temple,
    accounts,
    discordRoles,
    fetchWikiSync: getWikiSyncData,
    notableItems,
    knownCombatAchievementIds,
  });
}
