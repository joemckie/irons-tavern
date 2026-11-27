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
import { calculatePlayerRank } from "../utils/calculators/calculate-player-rank";
import { isRankUp } from "../utils/is-rank-up";
import { buildVerifiedRankInput } from "./build-verified-rank-input";
import { TempleGroupData } from "./data-sources/fetch-temple-group-data";
import {
  assertNotableItemPoints,
  AutoRankRow,
  MatchedAccount,
  normaliseRsn,
  resolveAutoRankRows,
  SkipReason,
} from "./auto-rank-report";

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

function rolesFor(accounts: MatchedAccount[]) {
  return new Map(accounts.map(({ discordId }) => [discordId, new Set<string>()]));
}

function resolve(overrides: Partial<Parameters<typeof resolveAutoRankRows>[0]> = {}) {
  const accounts = overrides.accounts ?? linkedAccounts;

  return resolveAutoRankRows({
    temple,
    accounts,
    discordRoles: rolesFor(accounts),
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

describe("normaliseRsn", () => {
  it.each([
    ["Iron Tyson", "iron tyson"],
    ["iron_tyson", "iron tyson"],
    ["Iron-Tyson", "iron tyson"],
    ["  IRON   tyson ", "iron tyson"],
  ])("normalises %j to %j", (input, expected) => {
    expect(normaliseRsn(input)).toBe(expected);
  });
});

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

  it("skips members with no linked account", async () => {
    expectSkipped(findRow(await resolve({ accounts: [] }), "Iron Tyson"), "Unlinked");
  });

  it("skips members claimed by more than one account", async () => {
    const accounts = [account("Iron Tyson"), account("iron_tyson", { discordId: "someone-else" })];

    expectSkipped(findRow(await resolve({ accounts }), "Iron Tyson"), "Ambiguous");
  });

  it("skips members whose draft uses a non-standard structure", async () => {
    const accounts = [account("Iron Tyson", { draftRankStructure: "Legacy" })];

    expectSkipped(findRow(await resolve({ accounts }), "Iron Tyson"), "Non-standard structure");
  });

  it("skips members with a staff or non-standard rank", async () => {
    const accounts = [account("Iron Tyson", { rank: "Deputy Owner" })];

    expectSkipped(findRow(await resolve({ accounts }), "Iron Tyson"), "Staff / non-standard rank");
  });

  it("skips members who aren't in the Discord server", async () => {
    const rows = await resolve({ discordRoles: new Map() });

    expectSkipped(findRow(rows, "Iron Tyson"), "Not in Discord server");
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
    const accounts = [
      account("Iron Tyson"),
      account("Uim Fixture", { rank: "Deputy Owner" }),
      account("Lvl Three"),
      account("No Clog"),
    ];

    await resolve({ accounts, fetchWikiSync });

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
    const tyson = account("Iron Tyson", {
      rank: "Helper",
      discordId: "tyson",
      discordName: "Tyson",
    });
    const rows = await resolve({ accounts: [tyson] });
    const row = findRow(rows, "Iron Tyson");

    const verified = await buildVerifiedRankInput({
      memberInfo: temple.members["Iron Tyson"],
      collectionLogMember: temple.collectionLog.members[0],
      collectionLogTotal: temple.collectionLog.total_collections_available,
      itemNames: temple.itemNames,
      wikiSyncData,
      joinDate: tyson.joinDate,
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
    });
  });

  it("treats a member with no current rank as a rank up", async () => {
    const row = findRow(
      await resolve({ accounts: [account("Iron Tyson", { rank: null })] }),
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

describe("assertNotableItemPoints", () => {
  it("accepts items that all have finite points", () => {
    expect(() => assertNotableItemPoints(notableItems)).not.toThrow();
  });

  it.each([
    ["a points error", { image: "", name: "Toxic blowpipe", hasPointsError: true, points: 5 }],
    ["missing points", { image: "", name: "Toxic blowpipe" }],
    ["NaN points", { image: "", name: "Toxic blowpipe", points: Number.NaN }],
  ])("throws for an item with %s", (_, item) => {
    const items = [["Zulrah", { items: [item] }]] as unknown as [string, ItemCategory][];

    expect(() => assertNotableItemPoints(items)).toThrow("Toxic blowpipe");
  });
});
