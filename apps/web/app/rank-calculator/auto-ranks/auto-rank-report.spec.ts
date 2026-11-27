/** @jest-environment node */

jest.mock("next/cache", () => ({ cacheLife: jest.fn() }));

import { WikiSyncResponse } from "@/app/schemas/wiki";
import { GroupCollectionLogResponse, GroupMemberInfoResponse } from "@/app/schemas/temple-api";
import { ItemCategory } from "@/app/schemas/items";
import { midGamePlayerFixture } from "@/mocks/wiki-sync";
import {
  collectionLogItemNamesFixture,
  groupCollectionLogFixture,
  groupMemberInfoFixture,
} from "@/mocks/temple-group";
import { server } from "@/mocks/server";
import { combatAchievementHandler } from "@/test-utils/combat-achievement-handlers";
import { tavernDiaryDiscordRoles } from "@/config/discord-roles";
import { calculatePlayerRank } from "../utils/calculators/calculate-player-rank";
import { isRankUp } from "../utils/is-rank-up";
import { buildVerifiedRankInput } from "./build-verified-rank-input";
import { TempleGroupData } from "./data-sources/fetch-temple-group-data";
import {
  AutoRankRow,
  ClanListMember,
  GuildMember,
  MatchedAccount,
  resolveAutoRankRows,
} from "./auto-rank-report";
import { SkipReason } from "./auto-rank-row";
import { normaliseRsn } from "./normalise-rsn";

const wikiSyncData = WikiSyncResponse.parse(midGamePlayerFixture);

const temple: TempleGroupData = {
  members: GroupMemberInfoResponse.parse(groupMemberInfoFixture).data.memberlist,
  collectionLog: GroupCollectionLogResponse.parse(groupCollectionLogFixture).data,
  itemNames: collectionLogItemNamesFixture.items,
};

const notableItems: [string, ItemCategory][] = [
  [
    "Zulrah",
    {
      items: [
        { image: "", name: "Toxic blowpipe", points: 500 },
        { image: "", name: "Serpentine visage", points: 300 },
        { image: "", name: "Magic fang", points: 300 },
      ],
    },
  ],
];

function account(name: string, overrides: Partial<MatchedAccount> = {}): MatchedAccount {
  return {
    name,
    joinDate: new Date("2023-01-01"),
    rank: "Dragon",
    discordId: `discord-${normaliseRsn(name)}`,
    discordName: `User ${name}`,
    draftRankStructure: null,
    ...overrides,
  };
}

const linkedAccounts = [account("Iron Tyson"), account("Uim Fixture"), account("Lvl Three")];

function clanMember(rsn: string, overrides: Partial<ClanListMember> = {}): ClanListMember {
  return { rsn, rank: "Rune", joinDate: new Date("2022-06-01"), ...overrides };
}

const clanMembers = [clanMember("Iron Tyson"), clanMember("Uim Fixture"), clanMember("Lvl Three")];

function guildMember(id: string, overrides: Partial<GuildMember> = {}): GuildMember {
  return { id, nick: null, roles: new Set(), joinedAt: new Date("2020-01-01"), ...overrides };
}

function guildFor(accounts: MatchedAccount[]) {
  return accounts.map(({ discordId }) => guildMember(discordId));
}

function resolve(overrides: Partial<Parameters<typeof resolveAutoRankRows>[0]> = {}) {
  const accounts = overrides.accounts ?? linkedAccounts;

  return resolveAutoRankRows({
    temple,
    accounts,
    clanMembers,
    guildMembers: guildFor(accounts),
    fetchWikiSync: () => Promise.resolve(wikiSyncData),
    notableItems,
    knownCombatAchievementIds: new Set(wikiSyncData.combat_achievements),
    ...overrides,
  });
}

function findRow(rows: AutoRankRow[], rsn: string) {
  const row = rows.find((candidate) => normaliseRsn(candidate.rsn) === normaliseRsn(rsn));

  if (!row) {
    throw new Error(`No row for ${rsn}`);
  }

  return row;
}

function expectSkipped(row: AutoRankRow, reason: SkipReason) {
  expect(row.skipReason).toBe(reason);
  expect(row.calculatedRank).toBeUndefined();
  expect(row.totalPoints).toBeUndefined();
  expect(row.isRankUp).toBeUndefined();
}

describe("resolveAutoRankRows", () => {
  beforeEach(() => {
    server.use(combatAchievementHandler(wikiSyncData.combat_achievements));
  });

  it("returns one row per Temple group member", async () => {
    const rows = await resolve();

    expect(rows.map(({ rsn }) => normaliseRsn(rsn)).sort()).toEqual([
      "iron tyson",
      "lvl three",
      "no clog",
      "uim fixture",
    ]);
  });

  it("uses Temple's capitalised name when available", async () => {
    const rows = await resolve();

    expect(rows.map(({ rsn }) => rsn)).toContain("IRON Tyson");
    expect(rows.map(({ rsn }) => rsn)).toContain("Uim Fixture");
  });

  it("skips members missing from the group collection log", async () => {
    const accounts = [...linkedAccounts, account("No Clog")];

    expectSkipped(findRow(await resolve({ accounts }), "No Clog"), "Missing collection log");
  });

  it("keeps the current rank on members missing from the group collection log", async () => {
    const accounts = [...linkedAccounts, account("No Clog", { rank: "Gold" })];
    const row = findRow(await resolve({ accounts }), "No Clog");

    expect(row.currentRank).toBe("Gold");
  });

  it("ranks members with no linked account, without Discord roles", async () => {
    const row = findRow(await resolve({ accounts: [] }), "Iron Tyson");

    expect(row.skipReason).toBeUndefined();
    expect(row.calculatedRank).toBeDefined();
    expect(row.discordId).toBeUndefined();
    expect(row.currentRank).toBe("Rune");
    expect(row.hasDiscordRoles).toBe(false);
  });

  it("fetches WikiSync for unlinked members using their clan RSN", async () => {
    const fetchWikiSync = jest.fn((_rsn: string) => Promise.resolve(wikiSyncData));

    await resolve({
      accounts: [],
      clanMembers: [clanMember("iron_tyson")],
      fetchWikiSync,
    });

    expect(fetchWikiSync).toHaveBeenCalledWith("iron_tyson");
  });

  it("skips members claimed by more than one account", async () => {
    const accounts = [account("Iron Tyson"), account("iron_tyson", { discordId: "someone-else" })];

    expectSkipped(findRow(await resolve({ accounts }), "Iron Tyson"), "Ambiguous");
  });

  it("keeps the clan export rank on ambiguous members", async () => {
    const accounts = [account("Iron Tyson"), account("iron_tyson", { discordId: "someone-else" })];
    const row = findRow(await resolve({ accounts }), "Iron Tyson");

    expect(row.currentRank).toBe("Rune");
  });

  it("skips members whose draft uses a non-standard structure", async () => {
    const accounts = [account("Iron Tyson", { draftRankStructure: "Legacy" })];

    expectSkipped(findRow(await resolve({ accounts }), "Iron Tyson"), "Non-standard structure");
  });

  it("skips members with a staff or non-standard rank", async () => {
    const rows = await resolve({
      clanMembers: [clanMember("Iron Tyson", { rank: "Moderator" })],
    });

    expectSkipped(findRow(rows, "Iron Tyson"), "Staff / non-standard rank");
  });

  it("takes the current rank from the clan export over the account", async () => {
    const rows = await resolve({
      accounts: [account("Iron Tyson", { rank: "Deputy Owner" })],
      clanMembers: [clanMember("Iron Tyson", { rank: "Helper" })],
    });

    expect(findRow(rows, "Iron Tyson").currentRank).toBe("Helper");
  });

  it("falls back to the account's rank when the member isn't in the clan export", async () => {
    const rows = await resolve({
      accounts: [account("Iron Tyson", { rank: "Deputy Owner" })],
      clanMembers: [],
    });

    expectSkipped(findRow(rows, "Iron Tyson"), "Staff / non-standard rank");
  });

  it("takes the join date from the clan export over the account", async () => {
    const fromExport = findRow(
      await resolve({
        accounts: [account("Iron Tyson", { joinDate: new Date("2025-11-01") })],
        clanMembers: [clanMember("Iron Tyson", { joinDate: new Date("2021-05-26") })],
      }),
      "Iron Tyson",
    );
    const fromAccount = findRow(
      await resolve({
        accounts: [account("Iron Tyson", { joinDate: new Date("2021-05-26") })],
        clanMembers: [],
      }),
      "Iron Tyson",
    );

    expect(fromExport.totalPoints).toBe(fromAccount.totalPoints);
  });

  it("skips unlinked members missing from the clan export", async () => {
    const rows = await resolve({ accounts: [], clanMembers: [] });

    expectSkipped(findRow(rows, "Iron Tyson"), "Missing join date");
  });

  it("matches unlinked members to Discord by their exact nickname", async () => {
    const combatRoles = new Set([...tavernDiaryDiscordRoles.Combat.values()]);
    const row = findRow(
      await resolve({
        accounts: [],
        guildMembers: [guildMember("tyson-id", { nick: "Iron Tyson", roles: combatRoles })],
      }),
      "Iron Tyson",
    );
    const unmatched = findRow(await resolve({ accounts: [], guildMembers: [] }), "Iron Tyson");

    expect(row).toMatchObject({
      discordId: "tyson-id",
      discordName: "Iron Tyson",
      discordMatchedBy: "Nickname",
      hasDiscordRoles: true,
    });
    expect(row.totalPoints).toBeGreaterThan(unmatched.totalPoints ?? Infinity);
  });

  it("treats OSRS-equivalent spellings of a nickname as exact", async () => {
    const row = findRow(
      await resolve({
        accounts: [],
        guildMembers: [guildMember("tyson-id", { nick: "iron_tyson" })],
      }),
      "Iron Tyson",
    );

    expect(row.discordId).toBe("tyson-id");
  });

  it.each([
    ["a partial nickname", [guildMember("a", { nick: "Iron Tyson | Main" })]],
    [
      "a nickname shared by two members",
      [guildMember("a", { nick: "Iron Tyson" }), guildMember("b", { nick: "Iron Tyson" })],
    ],
  ])("doesn't match %s", async (_, guildMembers) => {
    const row = findRow(await resolve({ accounts: [], guildMembers }), "Iron Tyson");

    expect(row.discordId).toBeUndefined();
    expect(row.hasDiscordRoles).toBe(false);
  });

  it("uses the linked account's Discord user over a nickname match", async () => {
    const row = findRow(
      await resolve({
        accounts: [account("Iron Tyson", { discordId: "owner" })],
        guildMembers: [guildMember("owner"), guildMember("impostor", { nick: "Iron Tyson" })],
      }),
      "Iron Tyson",
    );

    expect(row).toMatchObject({ discordId: "owner", discordMatchedBy: "Account" });
  });

  it("falls back to the Discord join date for nickname matches missing from the clan export", async () => {
    const joinedAt = new Date("2021-05-26");
    const fromDiscord = findRow(
      await resolve({
        accounts: [],
        clanMembers: [],
        guildMembers: [guildMember("tyson-id", { nick: "Iron Tyson", joinedAt })],
      }),
      "Iron Tyson",
    );
    const fromExport = findRow(
      await resolve({
        accounts: [],
        clanMembers: [clanMember("Iron Tyson", { joinDate: joinedAt })],
      }),
      "Iron Tyson",
    );

    expect(fromDiscord.skipReason).toBeUndefined();
    expect(fromDiscord.totalPoints).toBe(fromExport.totalPoints);
  });

  it("ranks linked members who aren't in the Discord server, without Discord roles", async () => {
    const row = findRow(await resolve({ guildMembers: [] }), "Iron Tyson");

    expect(row.skipReason).toBeUndefined();
    expect(row.hasDiscordRoles).toBe(false);
  });

  it("applies the diary bonus from Discord roles", async () => {
    const combatRoles = new Set([...tavernDiaryDiscordRoles.Combat.values()]);
    const withRoles = findRow(
      await resolve({ guildMembers: [guildMember("discord-iron tyson", { roles: combatRoles })] }),
      "Iron Tyson",
    );
    const withoutRoles = findRow(await resolve(), "Iron Tyson");

    expect(withRoles.hasDiscordRoles).toBe(true);
    expect(withoutRoles.hasDiscordRoles).toBe(true);
    expect(withRoles.totalPoints).toBeGreaterThan(withoutRoles.totalPoints ?? Infinity);
  });

  it("skips members without WikiSync data", async () => {
    const rows = await resolve({ fetchWikiSync: () => Promise.resolve(null) });

    expectSkipped(findRow(rows, "Iron Tyson"), "Missing WikiSync");
  });

  it("skips members whose Temple stats can't be used", async () => {
    expectSkipped(findRow(await resolve(), "Lvl Three"), "Missing Temple stats");
  });

  it("skips collection log members absent from the group member info", async () => {
    const { "Uim Fixture": _, ...members } = temple.members;

    const rows = await resolve({ temple: { ...temple, members } });

    expectSkipped(findRow(rows, "Uim Fixture"), "Missing Temple stats");
  });

  it("matches accounts regardless of case, spaces, underscores and hyphens", async () => {
    const accounts = [account("iron_tyson"), account("UIM-FIXTURE")];
    const rows = await resolve({ accounts });

    expect(findRow(rows, "Iron Tyson").skipReason).toBeUndefined();
    expect(findRow(rows, "Iron Tyson").discordId).toBe("discord-iron tyson");
    expect(findRow(rows, "Uim Fixture").skipReason).toBeUndefined();
  });

  it("treats no draft as Standard", async () => {
    const accounts = [account("Iron Tyson", { draftRankStructure: null })];
    const row = findRow(await resolve({ accounts }), "Iron Tyson");

    expect(row.skipReason).toBeUndefined();
    expect(row.calculatedRank).toBeDefined();
  });

  it("only fetches WikiSync for members that reach that check", async () => {
    const fetchWikiSync = jest.fn((_rsn: string) => Promise.resolve(wikiSyncData));
    const accounts = [account("Iron Tyson"), account("Lvl Three"), account("No Clog")];

    await resolve({
      accounts,
      clanMembers: [
        clanMember("Iron Tyson"),
        clanMember("Uim Fixture", { rank: "Deputy Owner" }),
        clanMember("Lvl Three"),
      ],
      fetchWikiSync,
    });

    expect(fetchWikiSync.mock.calls.map(([rsn]) => rsn).sort()).toEqual([
      "Iron Tyson",
      "Lvl Three",
    ]);
  });

  it("fetches WikiSync using the account's RSN", async () => {
    const fetchWikiSync = jest.fn((_rsn: string) => Promise.resolve(wikiSyncData));

    await resolve({ accounts: [account("iron_tyson")], fetchWikiSync });

    expect(fetchWikiSync).toHaveBeenCalledWith("iron_tyson");
  });

  it("marks only the failing member as Error", async () => {
    const rows = await resolve({
      fetchWikiSync: (rsn) =>
        rsn === "Iron Tyson"
          ? Promise.reject(new Error("WikiSync is down"))
          : Promise.resolve(wikiSyncData),
    });

    expectSkipped(findRow(rows, "Iron Tyson"), "Error");
    expect(findRow(rows, "Uim Fixture").calculatedRank).toBeDefined();
  });

  it("calculates rank and isRankUp for an eligible member", async () => {
    const tyson = account("Iron Tyson", { discordId: "tyson", discordName: "Tyson" });
    const joinDate = new Date("2021-05-26");
    const rows = await resolve({
      accounts: [tyson],
      clanMembers: [clanMember("Iron Tyson", { rank: "Helper", joinDate })],
    });
    const row = findRow(rows, "Iron Tyson");

    const verified = await buildVerifiedRankInput({
      memberInfo: temple.members["Iron Tyson"],
      collectionLogMember: temple.collectionLog.members[0],
      collectionLogTotal: temple.collectionLog.total_collections_available,
      itemNames: temple.itemNames,
      wikiSyncData,
      joinDate,
      discordRoles: new Set(),
    });

    if (!verified.success) {
      throw new Error("Expected verified input");
    }

    const expected = calculatePlayerRank(verified.input, notableItems);

    expect(row).toEqual({
      rsn: "IRON Tyson",
      discordId: "tyson",
      discordName: "Tyson",
      currentRank: "Helper",
      calculatedRank: expected.rank,
      totalPoints: expected.totalPoints,
      isRankUp: isRankUp("Helper", expected.rank),
      hasDiscordRoles: true,
      discordMatchedBy: "Account",
    });
  });

  it("treats a member with no current rank as a rank up", async () => {
    const row = findRow(
      await resolve({ accounts: [account("Iron Tyson", { rank: null })], clanMembers: [] }),
      "Iron Tyson",
    );

    expect(row.currentRank).toBeUndefined();
    expect(row.isRankUp).toBe(true);
  });

  it("marks a member as Error when WikiSync has a combat achievement the wiki doesn't know", async () => {
    const knownCombatAchievementIds = new Set(wikiSyncData.combat_achievements.slice(1));
    const rows = await resolve({ knownCombatAchievementIds });

    expectSkipped(findRow(rows, "Iron Tyson"), "Error");
    expectSkipped(findRow(rows, "Uim Fixture"), "Error");
  });

  it("rejects when notable item points can't be calculated, as every rank threshold would be wrong", async () => {
    const brokenItems = [
      ["Zulrah", { items: [{ image: "", name: "Toxic blowpipe", hasPointsError: true }] }],
    ] as unknown as [string, ItemCategory][];

    await expect(resolve({ notableItems: brokenItems })).rejects.toThrow("Toxic blowpipe");
  });
});
