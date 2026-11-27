/** @jest-environment node */

jest.mock("next/cache", () => ({ cacheLife: jest.fn() }));

import { WikiSyncResponse } from "@/app/schemas/wiki";
import { GroupCollectionLogResponse, GroupMemberInfoResponse } from "@/app/schemas/temple-api";
import { midGamePlayerFixture } from "@/mocks/wiki-sync";
import {
  collectionLogItemNamesFixture,
  groupCollectionLogFixture,
  groupMemberInfoFixture,
} from "@/mocks/temple-group";
import { tavernDiaryDiscordRoles } from "@/config/discord-roles";
import { calculateTavernDiaryTierMultipliers } from "../utils/calculators/calculate-tavern-diary-tier-multipliers";
import { normaliseEntityName } from "../utils/normalise-entity-name";
import { server } from "@/mocks/server";
import { combatAchievementHandler } from "@/test-utils/combat-achievement-handlers";
import { buildVerifiedRankInput } from "./build-verified-rank-input";

const wikiSyncData = WikiSyncResponse.parse(midGamePlayerFixture);
const { memberlist } = GroupMemberInfoResponse.parse(groupMemberInfoFixture).data;
const [ironTysonLog, uimLog, lvlThreeLog] =
  GroupCollectionLogResponse.parse(groupCollectionLogFixture).data.members;
const joinDate = new Date("2023-01-01");

function buildArgs(
  overrides: Partial<Parameters<typeof buildVerifiedRankInput>[0]> = {},
): Parameters<typeof buildVerifiedRankInput>[0] {
  return {
    memberInfo: memberlist["Iron Tyson"],
    collectionLogMember: ironTysonLog,
    collectionLogTotal: 1738,
    itemNames: collectionLogItemNamesFixture.items,
    wikiSyncData,
    joinDate,
    discordRoles: new Set(),
    ...overrides,
  };
}

async function buildInput(overrides: Partial<Parameters<typeof buildVerifiedRankInput>[0]> = {}) {
  const result = await buildVerifiedRankInput(buildArgs(overrides));

  if (!result.success) {
    throw new Error(`Expected success, got ${result.reason}`);
  }

  return result.input;
}

describe("buildVerifiedRankInput", () => {
  beforeEach(() => {
    server.use(combatAchievementHandler(wikiSyncData.combat_achievements));
  });

  it("maps Temple stats using the member's primary EHP/EHB keys", async () => {
    const ironman = await buildInput();

    expect(ironman.ehp).toBe(Math.round(1556.6675));
    expect(ironman.ehb).toBe(Math.round(649.0079));
    expect(ironman.totalLevel).toBe(2303);
    expect(ironman.hasMaxCape).toBe(false);

    const uim = await buildInput({
      memberInfo: memberlist["Uim Fixture"],
      collectionLogMember: uimLog,
    });

    expect(uim.ehp).toBe(Math.round(1296.5774));
    expect(uim.ehb).toBe(Math.round(298.1111));
  });

  it("returns Missing Temple stats when the primary EHP key is absent", async () => {
    await expect(
      buildVerifiedRankInput(
        buildArgs({
          memberInfo: memberlist["Lvl Three"],
          collectionLogMember: lvlThreeLog,
        }),
      ),
    ).resolves.toEqual({ success: false, reason: "Missing Temple stats" });
  });

  it("returns Missing Temple stats when the primary EHB key is absent", async () => {
    const { Ehb_im: _, ...bosses } = memberlist["Iron Tyson"].bosses ?? {};

    await expect(
      buildVerifiedRankInput(buildArgs({ memberInfo: { ...memberlist["Iron Tyson"], bosses } })),
    ).resolves.toEqual({ success: false, reason: "Missing Temple stats" });
  });

  it.each([
    ["F2P", { primary_ehp: "F2p_im_ehp", primary_ehb: "Ehb_im" }],
    ["1 defence", { primary_ehp: "Ehp", primary_ehb: "Ehb_1def" }],
  ])(
    "returns Missing Temple stats for %s accounts, which player_stats.php can't verify",
    async (_, primaryKeys) => {
      const memberInfo = {
        ...memberlist["Iron Tyson"],
        ...primaryKeys,
        skills: { ...memberlist["Iron Tyson"].skills, F2p_im_ehp: 861.6643 },
      };

      await expect(buildVerifiedRankInput(buildArgs({ memberInfo }))).resolves.toEqual({
        success: false,
        reason: "Missing Temple stats",
      });
    },
  );

  it("returns Missing Temple stats when skills are absent", async () => {
    const { skills: _, ...memberInfo } = memberlist["Iron Tyson"];

    await expect(buildVerifiedRankInput(buildArgs({ memberInfo }))).resolves.toEqual({
      success: false,
      reason: "Missing Temple stats",
    });
  });

  it("returns Missing Temple stats when the total level is absent", async () => {
    const { Overall_level: _, ...skills } = memberlist["Iron Tyson"].skills ?? {};

    await expect(
      buildVerifiedRankInput(buildArgs({ memberInfo: { ...memberlist["Iron Tyson"], skills } })),
    ).resolves.toEqual({ success: false, reason: "Missing Temple stats" });
  });

  it("ignores collection log item IDs with no known name", async () => {
    const input = await buildInput();

    expect(Object.keys(input.acquiredItems)).not.toContain("undefined");
    expect(Object.values(input.acquiredItems).every((value) => value === true)).toBe(true);
  });

  it("marks an item acquired from collection log counts", async () => {
    // Iron Tyson has a Tanzanite fang (12922) and a Serpentine visage (12927)
    const input = await buildInput();

    expect(input.acquiredItems[normaliseEntityName("Toxic blowpipe")]).toBe(true);
    expect(input.acquiredItems[normaliseEntityName("Serpentine visage")]).toBe(true);
    expect(input.acquiredItems[normaliseEntityName("Magic fang")]).toBeUndefined();
  });

  it("keeps the highest count when several item IDs share a name", async () => {
    const input = await buildInput({
      collectionLogMember: { ...ironTysonLog, items: { "12922": 1, "99999": 0 } },
      itemNames: { ...collectionLogItemNamesFixture.items, "99999": "Tanzanite fang" },
    });

    expect(input.acquiredItems[normaliseEntityName("Toxic blowpipe")]).toBe(true);
  });

  it("takes collection log count as the higher of Temple and hiscores", async () => {
    // Temple 917, hiscores 917
    expect((await buildInput()).collectionLogCount).toBe(917);

    // Temple 781, hiscores 780
    const uim = await buildInput({
      memberInfo: memberlist["Uim Fixture"],
      collectionLogMember: uimLog,
    });

    expect(uim.collectionLogCount).toBe(781);

    // Temple 900, hiscores 917
    const outdatedLog = await buildInput({
      collectionLogMember: { ...ironTysonLog, total_collections_finished: 900 },
    });

    expect(outdatedLog.collectionLogCount).toBe(917);
  });

  it("uses the group collection log total and the account's join date", async () => {
    const input = await buildInput({ collectionLogTotal: 1700 });

    expect(input.collectionLogTotal).toBe(1700);
    expect(input.joinDate).toBe(joinDate);
  });

  it("awards the Infernal cape from Zuk kills", async () => {
    const zukKiller = {
      ...memberlist["Iron Tyson"],
      bosses: { ...memberlist["Iron Tyson"].bosses, "TzKal-Zuk": 1 },
    };

    expect((await buildInput({ memberInfo: zukKiller })).tzhaarCape).toBe("Infernal cape");
  });

  it("applies Tavern Diary multipliers from Discord roles", async () => {
    const roles = new Set([...tavernDiaryDiscordRoles.Combat.values()]);
    const input = await buildInput({ discordRoles: roles });
    const expected = calculateTavernDiaryTierMultipliers(roles);

    expect(input.combatBonusMultiplier).toBe(expected.combatBonusMultiplier);
    expect(input.combatBonusMultiplier).toBeGreaterThan(0);
    expect(input.collectionLogBonusMultiplier).toBe(expected.collectionLogBonusMultiplier);
    expect(input.skillingBonusMultiplier).toBe(expected.skillingBonusMultiplier);
    expect(input.notableItemsBonusMultiplier).toBe(0);
  });

  it("takes diaries and combat achievements from WikiSync", async () => {
    const input = await buildInput();

    expect(input.achievementDiaries).toHaveProperty("Ardougne");
    expect(input.combatAchievementTier).not.toBe("None");
  });

  it("never sets rankStructure other than Standard", async () => {
    expect((await buildInput()).rankStructure).toBe("Standard");
  });
});
