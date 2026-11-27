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
import { AutoRankRow, SkipReason } from "./auto-rank-row";

export { SkipReason, type AutoRankRow } from "./auto-rank-row";

export interface MatchedAccount {
  name: string;
  joinDate: Date;
  rank: Rank | null;
  discordId: string;
  discordName: string;
  draftRankStructure: RankStructure | null;
}

const wikiSyncConcurrency = 10;

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

function groupAccountsByRsn(accounts: MatchedAccount[]) {
  return accounts.reduce((acc, account) => {
    const key = normaliseRsn(account.name);

    acc.set(key, [...(acc.get(key) ?? []), account]);

    return acc;
  }, new Map<string, MatchedAccount[]>());
}

function skip(row: AutoRankRow, skipReason: SkipReason): AutoRankRow {
  return { ...row, skipReason };
}

export async function resolveAutoRankRows({
  temple,
  accounts,
  discordRoles,
  fetchWikiSync,
  notableItems,
}: {
  temple: TempleGroupData;
  accounts: MatchedAccount[];
  discordRoles: Map<string, Set<string>>;
  fetchWikiSync: (rsn: string) => Promise<WikiSyncResponse | null>;
  notableItems: [string, ItemCategory][];
}): Promise<AutoRankRow[]> {
  const accountsByRsn = groupAccountsByRsn(accounts);

  return mapWithConcurrency(
    collectGroupMembers(temple),
    wikiSyncConcurrency,
    async ({ key, rsn, memberInfo, collectionLogMember }): Promise<AutoRankRow> => {
      const row: AutoRankRow = { rsn };

      if (!collectionLogMember) {
        return skip(row, "Missing collection log");
      }

      const matches = accountsByRsn.get(key) ?? [];

      if (matches.length === 0) {
        return skip(row, "Unlinked");
      }

      if (matches.length > 1) {
        return skip(row, "Ambiguous");
      }

      const [account] = matches;
      const linkedRow: AutoRankRow = {
        ...row,
        discordId: account.discordId,
        discordName: account.discordName,
        currentRank: account.rank ?? undefined,
      };

      if (account.draftRankStructure && account.draftRankStructure !== "Standard") {
        return skip(linkedRow, "Non-standard structure");
      }

      if (account.rank && !StandardRank.safeParse(account.rank).success) {
        return skip(linkedRow, "Staff / non-standard rank");
      }

      const roles = discordRoles.get(account.discordId);

      if (!roles) {
        return skip(linkedRow, "Not in Discord server");
      }

      try {
        const wikiSyncData = await fetchWikiSync(account.name);

        if (!wikiSyncData) {
          return skip(linkedRow, "Missing WikiSync");
        }

        if (!memberInfo) {
          return skip(linkedRow, "Missing Temple stats");
        }

        const verified = await buildVerifiedRankInput({
          memberInfo,
          collectionLogMember,
          collectionLogTotal: temple.collectionLog.total_collections_available,
          itemNames: temple.itemNames,
          wikiSyncData,
          joinDate: account.joinDate,
          discordRoles: roles,
        });

        if (!verified.success) {
          return skip(linkedRow, verified.reason);
        }

        const { rank, totalPoints } = calculatePlayerRank(verified.input, notableItems);

        return {
          ...linkedRow,
          calculatedRank: rank,
          totalPoints,
          isRankUp: isRankUp(linkedRow.currentRank, rank),
        };
      } catch (error) {
        Sentry.captureException(error, { tags: { rsn: account.name } });

        return skip(linkedRow, "Error");
      }
    },
  );
}
