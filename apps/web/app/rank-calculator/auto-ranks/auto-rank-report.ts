import * as Sentry from "@sentry/nextjs";
import type { Rank } from "@/config/enums";
import { StandardRank } from "@/config/ranks";
import type { ItemCategory } from "@/app/schemas/items";
import type { RankStructure } from "@/app/schemas/rank-calculator";
import type { GroupCollectionLogMember, MemberInfo } from "@/app/schemas/temple-api";
import type { WikiSyncResponse } from "@/app/schemas/wiki";
import { calculatePlayerRank } from "../utils/calculators/calculate-player-rank";
import { isRankUp } from "../utils/is-rank-up";
import { mapWithConcurrency } from "../utils/map-with-concurrency";
import { buildVerifiedRankInput } from "./build-verified-rank-input";
import type { TempleGroupData } from "./data-sources/fetch-temple-group-data";
import { AutoRankRow, ClanListMember, GuildMember, SkipReason } from "./auto-rank-row";

export {
  SkipReason,
  type AutoRankRow,
  type ClanListMember,
  type GuildMember,
} from "./auto-rank-row";

export interface MatchedAccount {
  name: string;
  joinDate: Date;
  rank: Rank | null;
  discordId: string;
  discordName: string;
  draftRankStructure: RankStructure | null;
}

// WikiSync rate limits bursts (429s seen at 10 concurrent requests)
const wikiSyncConcurrency = 5;

/**
 * Normalises an RSN for matching across sources.
 * OSRS treats case, spaces, underscores and hyphens as equivalent.
 */
export function normaliseRsn(rsn: string): string {
  return rsn.toLowerCase().replace(/[_-]/g, " ").replace(/\s+/g, " ").trim();
}

interface GroupMember {
  key: string;
  rsn: string;
  memberInfo?: MemberInfo;
  collectionLogMember?: GroupCollectionLogMember;
}

function collectGroupMembers({ members, collectionLog }: TempleGroupData) {
  const groupMembers = new Map<string, GroupMember>();

  for (const [rsn, memberInfo] of Object.entries(members)) {
    groupMembers.set(normaliseRsn(rsn), { key: normaliseRsn(rsn), rsn, memberInfo });
  }

  for (const collectionLogMember of collectionLog.members) {
    const key = normaliseRsn(collectionLogMember.player);
    const existing = groupMembers.get(key);

    groupMembers.set(key, {
      key,
      memberInfo: existing?.memberInfo,
      collectionLogMember,
      rsn:
        collectionLogMember.player_name_with_capitalization ??
        existing?.rsn ??
        collectionLogMember.player,
    });
  }

  return [...groupMembers.values()];
}

function indexClanMembers(clanMembers: ClanListMember[]) {
  return new Map(clanMembers.map((member) => [normaliseRsn(member.rsn), member]));
}

/**
 * Indexes guild members by nickname, leaving out any nickname shared by more than one member.
 */
function indexGuildMembersByNickname(guildMembers: GuildMember[]) {
  const byNickname = new Map<string, GuildMember | null>();

  for (const member of guildMembers) {
    if (!member.nick) {
      continue;
    }

    const key = normaliseRsn(member.nick);

    byNickname.set(key, byNickname.has(key) ? null : member);
  }

  return byNickname;
}

function groupAccountsByRsn(accounts: MatchedAccount[]) {
  return accounts.reduce((acc, account) => {
    const key = normaliseRsn(account.name);

    acc.set(key, [...(acc.get(key) ?? []), account]);

    return acc;
  }, new Map<string, MatchedAccount[]>());
}

/**
 * Notable items with a points error (e.g. missing drop rates) make every rank threshold NaN,
 * which collapses every member's rank. Fail the whole report instead.
 */
export function assertNotableItemPoints(notableItems: [string, ItemCategory][]) {
  const invalidItems = notableItems
    .flatMap(([, { items }]) => items)
    .filter(
      (item) => ("hasPointsError" in item && item.hasPointsError) || !Number.isFinite(item.points),
    )
    .map(({ name }) => name);

  if (invalidItems.length > 0) {
    throw new Error(`Unable to calculate notable item points for ${invalidItems.join(", ")}`);
  }
}

function skip(row: AutoRankRow, skipReason: SkipReason): AutoRankRow {
  return { ...row, skipReason };
}

export async function resolveAutoRankRows({
  temple,
  accounts,
  clanMembers,
  guildMembers,
  fetchWikiSync,
  notableItems,
  knownCombatAchievementIds,
}: {
  temple: TempleGroupData;
  accounts: MatchedAccount[];
  /** The in-game clan export, the preferred source of current rank and join date */
  clanMembers: ClanListMember[];
  /** Only used for Tavern Diary roles and, as a last resort, join dates */
  guildMembers: GuildMember[];
  fetchWikiSync: (rsn: string) => Promise<WikiSyncResponse | null>;
  notableItems: [string, ItemCategory][];
  /** Every combat achievement ID the wiki knows about */
  knownCombatAchievementIds: Set<number>;
}): Promise<AutoRankRow[]> {
  assertNotableItemPoints(notableItems);

  const accountsByRsn = groupAccountsByRsn(accounts);
  const clanMembersByRsn = indexClanMembers(clanMembers);
  const guildMembersById = new Map(guildMembers.map((member) => [member.id, member]));
  const guildMembersByNickname = indexGuildMembersByNickname(guildMembers);

  return mapWithConcurrency(
    collectGroupMembers(temple),
    wikiSyncConcurrency,
    async ({ key, rsn, memberInfo, collectionLogMember }): Promise<AutoRankRow> => {
      const row: AutoRankRow = { rsn };

      if (!collectionLogMember) {
        return skip(row, "Missing collection log");
      }

      const matches = accountsByRsn.get(key) ?? [];

      if (matches.length > 1) {
        return skip(row, "Ambiguous");
      }

      const [account] = matches;
      const clanMember = clanMembersByRsn.get(key);
      const currentRank = clanMember?.rank ?? account?.rank ?? undefined;
      // A linked account is authoritative; otherwise fall back to an exact, unique nickname
      const guildMember = account
        ? guildMembersById.get(account.discordId)
        : (guildMembersByNickname.get(key) ?? undefined);
      const discordUser: Pick<AutoRankRow, "discordId" | "discordName" | "discordMatchedBy"> =
        account
          ? {
              discordId: account.discordId,
              discordName: account.discordName,
              discordMatchedBy: "Account",
            }
          : guildMember
            ? {
                discordId: guildMember.id,
                discordName: guildMember.nick ?? undefined,
                discordMatchedBy: "Nickname",
              }
            : {};
      const knownRow: AutoRankRow = { ...row, ...discordUser, currentRank };

      if (account?.draftRankStructure && account.draftRankStructure !== "Standard") {
        return skip(knownRow, "Non-standard structure");
      }

      if (currentRank && !StandardRank.safeParse(currentRank).success) {
        return skip(knownRow, "Staff / non-standard rank");
      }

      const joinDate = clanMember?.joinDate ?? account?.joinDate ?? guildMember?.joinedAt;

      if (!joinDate) {
        return skip(knownRow, "Missing join date");
      }

      try {
        const wikiSyncData = await fetchWikiSync(account?.name ?? clanMember?.rsn ?? rsn);

        if (!wikiSyncData) {
          return skip(knownRow, "Missing WikiSync");
        }

        const unknownCombatAchievementIds = wikiSyncData.combat_achievements.filter(
          (id) => !knownCombatAchievementIds.has(id),
        );

        // An unknown ID makes the combat achievement tier incalculable, which would otherwise become "None"
        if (unknownCombatAchievementIds.length > 0) {
          throw new Error(
            `Unknown combat achievement IDs: ${unknownCombatAchievementIds.join(", ")}`,
          );
        }

        if (!memberInfo) {
          return skip(knownRow, "Missing Temple stats");
        }

        const verified = await buildVerifiedRankInput({
          memberInfo,
          collectionLogMember,
          collectionLogTotal: temple.collectionLog.total_collections_available,
          itemNames: temple.itemNames,
          wikiSyncData,
          joinDate,
          // Discord is optional: without roles, no Tavern Diary bonus is applied
          discordRoles: guildMember?.roles ?? new Set(),
        });

        if (!verified.success) {
          return skip(knownRow, verified.reason);
        }

        const { rank, totalPoints } = calculatePlayerRank(verified.input, notableItems);

        return {
          ...knownRow,
          calculatedRank: rank,
          totalPoints,
          isRankUp: isRankUp(currentRank, rank),
          hasDiscordRoles: Boolean(guildMember),
        };
      } catch (error) {
        Sentry.captureException(error, { tags: { rsn } });

        return skip(knownRow, "Error");
      }
    },
  );
}
