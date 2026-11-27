# Auto-rank checker page: implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task by task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A moderator-only page at `/rank-calculator/auto-ranks` that shows, for every TempleOSRS group member, the rank automatic approval would give them, calculated only from verified third-party data.

**Architecture:** A bulk pipeline under `app/rank-calculator/auto-ranks/`:

1. Three Temple group requests and one paged Discord member listing.
2. One database query to match accounts.
3. WikiSync requests per remaining member, with a concurrency cap.
4. A pure mapping step into the calculator's existing input shape.
5. A pure `calculatePlayerRank()`, extracted from `api/check-auto-rank`, followed by `isRankUp`.

The page is a server component that renders the resulting rows. Nothing is stored.

**Tech stack:** Next.js 16 App Router (cache components: `connection()` / `export const instant = false`), MikroORM 7 (Postgres, `citext`), Zod 4, `@discordjs/rest` + `discord-api-types/v10`, Radix Themes + Tailwind, Jest + MSW (`mocks/server.ts`, `onUnhandledRequest: "error"`).

**Spec:** `docs/superpowers/specs/2026-11-27-auto-rank-checker-design.md`

## Global constraints

- A rank is shown **only** when Temple collection log, Temple stats and WikiSync are all present and the structure is Standard. Otherwise the row carries a skip reason and no `calculatedRank`.
- No draft data feeds the calculation. The only draft field read is `rankStructure`. No draft means `"Standard"`.
- The points maths is unchanged. `calculatePlayerRank` is a verbatim move of the chain in `app/api/check-auto-rank/route.ts`.
- No per-member Temple requests: no `add_datapoint.php`, no `player_stats.php`, no `player_collection_log.php`.
- The group collection log requests `categories=` the list from `generateCollectionLogCategoryList()`, joined with `,`.
- Access: `userCanModerateSubmission(session.user.permissions)` (`MANAGE_ROLES`). Everyone else gets `notFound()`.
- WikiSync concurrency is 10.
- `api/check-all-auto-ranks` is not modified.
- Run commands from `apps/web`. Single spec: `yarn jest <path>`. Types: `yarn check-types`.
- **Baseline:** 9 suites already fail on `main`, mostly on a Sentry import through `safe-action.ts`. Only the specs this plan adds need to pass. Don't fix the unrelated failures, and don't import `safe-action` from any new module.
- New specs that hit `fetch` start with `/** @jest-environment node */` and register MSW handlers with `server.use(...)`.

## Review focus

1. **RSN spelling differs between sources.** Temple keys, Temple's capitalised names and DB names can differ in case, and in spaces vs `_` / `-`, which OSRS treats as equal. Members should still match. The test goes in Task 6.
2. **Item IDs in the group log that are missing from `items.php`.** These should be ignored, not crash the page or produce `undefined` keys. The test goes in Task 5.
3. **A member's `primary_ehp` / `primary_ehb` key is missing from `skills` / `bosses`.** This covers keys like `lvl3_ehp` and members with no `skills` at all. These should be classed as `Missing Temple stats`, never calculated with `ehp: undefined`. The test goes in Task 5.
4. **One member's WikiSync or calculation throws.** Only that row should get `Error`; the rest of the report still renders. The test goes in Task 6.
5. **The guild has more than 1,000 members.** Every page should be fetched, or members past the first 1,000 would look like `Not in Discord server`. The test goes in Task 4.

---

### Task 1: Extract `calculatePlayerRank`

**Files:**

- Create: `app/rank-calculator/utils/calculators/calculate-player-rank.ts`
- Create: `app/rank-calculator/utils/calculators/calculate-player-rank.spec.ts`
- Modify: `app/api/check-auto-rank/route.ts` (replace the inline chain with a call)

**Interfaces:**

- Produces:

  ```ts
  export type PlayerRankInput = Pick<
    RankCalculatorSchema,
    | "joinDate"
    | "collectionLogCount"
    | "collectionLogTotal"
    | "acquiredItems"
    | "achievementDiaries"
    | "ehp"
    | "ehb"
    | "totalLevel"
    | "combatAchievementTier"
    | "rankStructure"
    | "tzhaarCape"
    | "hasBloodTorva"
    | "hasDizanasQuiver"
    | "hasAchievementDiaryCape"
    | "hasMaxCape"
    | "collectionLogBonusMultiplier"
    | "combatBonusMultiplier"
    | "notableItemsBonusMultiplier"
    | "skillingBonusMultiplier"
  >;
  export function calculatePlayerRank(
    input: PlayerRankInput,
    notableItems: [string, ItemCategory][],
  ): { rank: Rank; totalPoints: number };
  ```

- [ ] **Step 1: Write a characterisation test.** Use `formDataMocks.earlyGamePlayer`, `midGamePlayer` and `endGamePlayer` from `@/mocks/misc/form-data`. Pin `joinDate` to the fixture's date and freeze time with `jest.useFakeTimers().setSystemTime(new Date("2026-11-27"))` so scaling is stable. Pass a hand-written two-category `[string, ItemCategory][]` fixture whose items all have explicit `points`. Assert each `{ rank, totalPoints }` with `toMatchInlineSnapshot()`.
- [ ] **Step 2:** Run `yarn jest app/rank-calculator/utils/calculators/calculate-player-rank.spec.ts`. Expected: FAIL, module not found.
- [ ] **Step 3: Implement `calculatePlayerRank`.** Move the code from `check-auto-rank/route.ts` verbatim, from `calculateScaling(joinDate)` through `calculateRank(...)`, so that `items` becomes the `notableItems` parameter. Return `{ rank, totalPoints: totalPointsAwarded }`. Don't reorder or alter any argument.
- [ ] **Step 4:** Run the spec. The inline snapshots get written.
- [ ] **Step 5: Prove parity with the old code.** Temporarily paste the original inline chain from `route.ts` into the spec as an `oldChain(input, items)` helper. Assert `calculatePlayerRank(...)` equals it for all three fixtures and run the spec. Then delete the helper. The snapshots must not change.
- [ ] **Step 6:** Replace the chain in `check-auto-rank/route.ts` with `const { rank, totalPoints: totalPointsAwarded } = calculatePlayerRank(playerDetails.data, items);`. Remove the now-unused imports.
- [ ] **Step 7:** Run `yarn check-types` and the spec. Expected: both pass.
- [ ] **Step 8:** Commit with `git commit -m "refactor: extract calculatePlayerRank"`.

### Task 2: `isRankUp`

**Files:**

- Create: `app/rank-calculator/utils/is-rank-up.ts`
- Create: `app/rank-calculator/utils/is-rank-up.spec.ts`

**Interfaces:**

- Produces: `export function isRankUp(currentRank: Rank | undefined, newRank: Rank): boolean`. It throws a `ZodError` if either rank is not a `StandardRank`.

- [ ] **Step 1:** Run `git show feat/auto-ranking:apps/web/app/rank-calculator/utils/is-rank-up.spec.ts > app/rank-calculator/utils/is-rank-up.spec.ts`. Add one case: `expect(isRankUp(undefined, StandardRank.enum.Helper)).toBe(true)`.
- [ ] **Step 2:** Run `yarn jest app/rank-calculator/utils/is-rank-up.spec.ts`. Expected: FAIL, module not found.
- [ ] **Step 3:** Run `git show feat/auto-ranking:apps/web/app/rank-calculator/utils/is-rank-up.ts > app/rank-calculator/utils/is-rank-up.ts`.
- [ ] **Step 4:** Run the spec. Expected: PASS. Then run `yarn oxfmt app/rank-calculator/utils/is-rank-up*` (or let the commit hook format it).
- [ ] **Step 5:** Commit with `git commit -m "feat: add isRankUp helper"`.

### Task 3: Temple group data sources

**Files:**

- Modify: `app/schemas/temple-api.ts`
- Modify: `app/rank-calculator/data-sources/fetch-player-details/fetch-temple-collection-log.ts` (export `generateCollectionLogCategoryList`)
- Create: `app/rank-calculator/auto-ranks/data-sources/fetch-temple-group-data.ts`
- Create: `app/rank-calculator/auto-ranks/data-sources/fetch-temple-group-data.spec.ts`
- Create: `mocks/temple-group.ts` (fixtures)

**Interfaces:**

- Produces, in `temple-api.ts`:
  - `MemberInfo` gains optional fields: `clog_synced: z.boolean()`, `primary_ehp: z.string()`, `primary_ehb: z.string()`, `skills: z.record(z.string(), z.number())` and `bosses: z.record(z.string(), z.number())`. Existing consumers must keep parsing.
  - `GroupCollectionLogResponse`: `{ data: { total_collections_available: number, members: Array<{ player: string, player_name_with_capitalization: string | null, total_collections_finished: number, items: Record<string, number> }> } }`. Use `z.looseObject` so extra fields pass.
  - `CollectionLogItemNamesResponse`: `{ items: Record<string, string> }`.
- Produces, in `fetch-temple-group-data.ts`:

  ```ts
  export interface TempleGroupData {
    members: GroupMemberInfoResponse["data"]["memberlist"]; // keyed by Temple RSN
    collectionLog: GroupCollectionLogResponse["data"];
    itemNames: Record<string, string>; // item ID → clog name
  }
  export async function fetchTempleGroupData(): Promise<TempleGroupData>;
  ```

  It makes three requests in parallel:
  - `group_member_info.php?id={groupId}&details=1&skills=1&bosses=1`
  - `collection-log/group_collection_log.php?group={groupId}&includecount=1&categories={list}`
  - `collection-log/items.php`

  Any non-OK response or schema failure throws, because the whole report depends on these.

- [ ] **Step 1: Write fixtures in `mocks/temple-group.ts`.** Base them on the real response shapes. Fetch them with `curl "https://templeosrs.com/api/group_member_info.php?id=2857&details=1&skills=1&bosses=1"`, `curl "https://templeosrs.com/api/collection-log/group_collection_log.php?group=2857&includecount=1&categories=the_inferno,the_fight_caves"` and `curl https://templeosrs.com/api/collection-log/items.php`, then trim the results down to about 4 members with renamed players:
  - an ironman with full data;
  - a UIM;
  - a member with `clog_synced: false` and no clog entry;
  - a member whose `primary_ehp` is `lvl3_ehp` with that key absent.

  Add an items map that deliberately omits one ID present in a member's `items`.

- [ ] **Step 2: Write the tests.**
  - `it("requests the filtered categories")`: the MSW handler asserts `url.searchParams.get("categories") === [...generateCollectionLogCategoryList()].join(",")` and `includecount === "1"`.
  - `it("returns members, collection log and item names")`: deep-equal the parsed fixtures.
  - `it("throws when any request fails")`: one handler returns `HttpResponse.error()`.
- [ ] **Step 3:** Run `yarn jest app/rank-calculator/auto-ranks/data-sources/fetch-temple-group-data.spec.ts`. Expected: FAIL.
- [ ] **Step 4:** Implement the schemas, the export and `fetchTempleGroupData`. Use `clientConstants.temple.baseUrl` and `serverConstants.temple.groupId`.
- [ ] **Step 5:** Run the spec and `yarn check-types`. Expected: PASS.
- [ ] **Step 6:** Commit with `git commit -m "feat: fetch Temple group data in bulk"`.

### Task 4: Discord guild member roles in bulk

**Files:**

- Create: `app/rank-calculator/auto-ranks/data-sources/fetch-guild-member-roles.ts`
- Create: `app/rank-calculator/auto-ranks/data-sources/fetch-guild-member-roles.spec.ts`

**Interfaces:**

- Produces: `export async function fetchGuildMemberRoles(): Promise<Map<string, Set<string>>>`, mapping Discord user ID to role IDs.

- [ ] **Step 1: Write the tests.** Use an MSW handler on `https://discord.com/api/v10/guilds/:guildId/members`.
  - `it("pages through every member")`: the handler returns 1,000 members when `after` is absent, then 3 when `after` is the last ID of page one. Assert the map has 1,003 entries and that the handler saw `limit=1000` on both calls.
  - `it("maps each user to their roles")`: check one entry's `Set` contents.
- [ ] **Step 2:** Run the spec. Expected: FAIL.
- [ ] **Step 3: Implement.** Loop `discordBotClient.get(Routes.guildMembers(guildId), { query: new URLSearchParams({ limit: "1000", ...(after && { after }) }) }) as APIGuildMember[]` until a page has fewer than 1,000 entries. Use `after` = the last `member.user.id`.
- [ ] **Step 4:** Run the spec. Expected: PASS.
- [ ] **Step 5:** Commit with `git commit -m "feat: fetch guild member roles in bulk"`.

### Task 5: Map verified bulk data to calculator input

**Files:**

- Create: `app/rank-calculator/data-sources/fetch-player-details/utils/derive-verified-achievements.ts`
- Modify: `app/rank-calculator/data-sources/fetch-player-details/fetch-player-details.ts` (use the helper; behaviour stays identical)
- Create: `app/rank-calculator/auto-ranks/build-verified-rank-input.ts`
- Create: `app/rank-calculator/auto-ranks/build-verified-rank-input.spec.ts`

**Interfaces:**

- Produces `deriveVerifiedAchievements` in `derive-verified-achievements.ts`. This is the logic from `fetchPlayerDetails`, moved verbatim: acquired items via `isItemAcquired`, music cape, TzHaar cape, Blood Torva CA set, Dizana's CA 538, diary cape, combat achievement tier, and parsed diaries.
  ```ts
  export async function deriveVerifiedAchievements(sources: {
    wikiSyncData: WikiSyncResponse | null;
    collectionLogItems: CollectionLogAcquiredItemMap | null;
    zukKillCount: number | null;
  }): Promise<{
    acquiredItems: string[]; // normalised names, before draft merge
    hasMusicCape: boolean;
    achievementDiaries: AchievementDiaryMap | null;
    combatAchievementTier: CombatAchievementTier | null;
    tzhaarCape: TzHaarCape;
    hasBloodTorva: boolean;
    hasDizanasQuiver: boolean;
    hasAchievementDiaryCape: boolean;
  }>;
  ```
- Produces, in `build-verified-rank-input.ts`:

  ```ts
  export type VerifiedRankInputResult =
    | { success: true; input: PlayerRankInput }
    | { success: false; reason: "Missing Temple stats" };
  export async function buildVerifiedRankInput(args: {
    memberInfo: MemberInfo; // from TempleGroupData.members
    collectionLogMember: GroupCollectionLogResponse["data"]["members"][number];
    collectionLogTotal: number;
    itemNames: Record<string, string>;
    wikiSyncData: WikiSyncResponse;
    joinDate: Date; // OSRSAccount.joinDate
    discordRoles: Set<string>;
  }): Promise<VerifiedRankInputResult>;
  ```

  Field mapping, from the spec:
  - `collectionLogCount = max(total_collections_finished, bosses.Collections ?? 0)`
  - `totalLevel = skills.Overall_level`
  - `ehp = Math.round(skills[primary_ehp])`
  - `ehb = Math.round(bosses[primary_ehb])`
  - `hasMaxCape = totalLevel === maximumTotalLevel`
  - `rankStructure: "Standard"`
  - multipliers from `calculateTavernDiaryTierMultipliers(discordRoles)`
  - `notableItemsBonusMultiplier: 0`
  - `acquiredItems` = a `Record<name, true>` built from `deriveVerifiedAchievements` plus `"Music cape"` when `hasMusicCape`, intersected with current item-list names exactly as `fetchPlayerDetails` does
  - diaries / CA tier fall back to the same empty defaults as `fetchPlayerDetails`'s `emptyResponse` when null

  `collectionLogItems` = `{ [normaliseEntityName(itemNames[id])]: count }`, skipping IDs with no name.

- [ ] **Step 1: Write the tests**, using the Task 3 fixtures and `@/mocks/wiki-sync` fixtures.
  - `it("maps Temple stats using the member's primary EHP/EHB keys")`: the ironman gives `ehp === Math.round(skills.Ehp_im)` and `ehb === Math.round(bosses.Ehb_im)`. The UIM uses `Uim_ehp` / `Ehb_uim`.
  - `it("returns Missing Temple stats when the primary EHP key is absent")`: use the `lvl3_ehp` fixture.
  - `it("returns Missing Temple stats when skills are absent")`.
  - `it("ignores collection log item IDs with no known name")`: no `"undefined"` key, and no throw.
  - `it("marks an item acquired from collection log counts")`: pick one `CollectionLogItem` from `itemList` whose `requiredItems` are all present in the fixture.
  - `it("takes collection log count as the higher of Temple and hiscores")`.
  - `it("never sets rankStructure other than Standard")`.
- [ ] **Step 2:** Run `yarn jest app/rank-calculator/auto-ranks/build-verified-rank-input.spec.ts`. Expected: FAIL.
- [ ] **Step 3:** Extract `deriveVerifiedAchievements` and change `fetchPlayerDetails` to call it. The returned `data` must be byte-for-byte the same.
- [ ] **Step 4:** Implement `buildVerifiedRankInput`.
- [ ] **Step 5:** Run the spec and `yarn check-types`. Expected: PASS.
- [ ] **Step 6:** Commit with `git commit -m "feat: build rank input from verified bulk data"`.

### Task 6: The auto-rank report pipeline

**Files:**

- Create: `app/rank-calculator/utils/map-with-concurrency.ts` (+ `.spec.ts`)
- Create: `app/rank-calculator/auto-ranks/auto-rank-report.ts`
- Create: `app/rank-calculator/auto-ranks/auto-rank-report.spec.ts`

**Interfaces:**

- Produces `export function mapWithConcurrency<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]>`. Results come back in input order.
- Produces, in `auto-rank-report.ts`:

  ```ts
  export const SkipReason = z.enum([
    "Missing collection log",
    "Missing Temple stats",
    "Unlinked",
    "Ambiguous",
    "Non-standard structure",
    "Not in Discord server",
    "Missing WikiSync",
    "Staff / non-standard rank",
    "Error",
  ]);
  export interface AutoRankRow {
    rsn: string; // Temple capitalised name if available, else Temple key
    discordId?: string;
    discordName?: string; // User.name
    currentRank?: Rank;
    calculatedRank?: Rank; // only when skipReason is undefined
    totalPoints?: number;
    isRankUp?: boolean;
    skipReason?: SkipReason;
  }
  export interface MatchedAccount {
    name: string;
    joinDate: Date;
    rank: Rank | null;
    discordId: string;
    discordName: string;
    draftRankStructure: RankStructure | null;
  }
  export function normaliseRsn(rsn: string): string; // lowercase, [_-] → space, trim, collapse spaces
  export async function resolveAutoRankRows(deps: {
    temple: TempleGroupData;
    accounts: MatchedAccount[];
    discordRoles: Map<string, Set<string>>;
    fetchWikiSync: (rsn: string) => Promise<WikiSyncResponse | null>;
    notableItems: [string, ItemCategory][];
  }): Promise<AutoRankRow[]>;
  export async function buildAutoRankReport(): Promise<AutoRankRow[]>;
  ```

  `resolveAutoRankRows` checks these in order, and the first that applies wins:
  1. not in the collection log → `Missing collection log`
  2. 0 accounts → `Unlinked`
  3. 2 or more accounts → `Ambiguous`
  4. `draftRankStructure` is set and is not `"Standard"` → `Non-standard structure`
  5. `currentRank` is set and is not a `StandardRank` → `Staff / non-standard rank`
  6. not in `discordRoles` → `Not in Discord server`
  7. WikiSync is null → `Missing WikiSync`
  8. `buildVerifiedRankInput` fails → `Missing Temple stats`
  9. otherwise calculate → `isRankUp`

  WikiSync is fetched only for members that reach step 7, via `mapWithConcurrency(..., 10, ...)`. Any throw for a member becomes `Error`.

  `buildAutoRankReport` is the thin wiring:
  - `fetchTempleGroupData()` and `fetchGuildMemberRoles()` in parallel
  - `withRequestContext` + `em.find(OSRSAccount, { name: { $in: rsns } }, { populate: ["user", "draftRankSubmission"] })`, mapped to `MatchedAccount`
  - `fetchItemDropRates` → `buildNotableItemList`
  - `resolveAutoRankRows` with `getWikiSyncData`

  It has no tests of its own; Task 7 verifies it in the browser.

- [ ] **Step 1: Write the `mapWithConcurrency` tests.**
  - `it("never runs more than limit at once")`: track the number in flight with deferred promises.
  - `it("preserves input order")`.
- [ ] **Step 2:** Run the spec. Expected: FAIL. Implement. Run again. Expected: PASS.
- [ ] **Step 3: Write the `resolveAutoRankRows` tests** with in-memory deps built from the Task 3 fixtures. Write one `it` per skip reason in the order above, each asserting `skipReason` and `calculatedRank === undefined`, plus:
  - `it("matches accounts regardless of case, spaces, underscores and hyphens")`: Temple `"iron_tyson"` with DB `"Iron Tyson"` should match.
  - `it("treats no draft as Standard")`.
  - `it("only fetches WikiSync for members that reach that check")`: `fetchWikiSync` is a `jest.fn`, and you assert the RSNs it was called with.
  - `it("marks only the failing member as Error")`: `fetchWikiSync` rejects for one RSN, and the others still get ranks.
  - `it("calculates rank and isRankUp for an eligible member")`: assert `calculatedRank` equals `calculatePlayerRank(expectedInput, notableItems).rank` and `isRankUp` agrees with `isRankUp(currentRank, rank)`.
- [ ] **Step 4:** Run `yarn jest app/rank-calculator/auto-ranks/auto-rank-report.spec.ts`. Expected: FAIL.
- [ ] **Step 5:** Implement `normaliseRsn`, `resolveAutoRankRows` and `buildAutoRankReport`.
- [ ] **Step 6:** Run the spec and `yarn check-types`. Expected: PASS.
- [ ] **Step 7:** Commit with `git commit -m "feat: add auto-rank report pipeline"`.

### Task 7: The page

**Files:**

- Create: `app/rank-calculator/auto-ranks/page.tsx`
- Create: `app/rank-calculator/auto-ranks/auto-rank-table.tsx`
- Create: `app/rank-calculator/auto-ranks/sort-auto-rank-rows.ts` (+ `.spec.ts`)

**Interfaces:**

- Consumes: `buildAutoRankReport`, `AutoRankRow`, `SkipReason` (Task 6), `userCanModerateSubmission`, `getRankImageUrl`, `getRankName`, `formatNumber`.
- Produces:
  - `export function sortAutoRankRows(rows: AutoRankRow[]): AutoRankRow[]`. Order: rank-ups (by `totalPoints` descending), then other ranked rows (same order), then skipped rows grouped in `SkipReason.options` order, each group by `rsn`.
  - `export function summariseAutoRankRows(rows: AutoRankRow[]): Record<"Rank up" | "Ranked" | SkipReason, number>`.

- [ ] **Step 1: Write the tests.**
  - `it("orders rank-ups, then ranked, then skipped by reason")`.
  - `it("counts each outcome")`.
- [ ] **Step 2:** Run the spec. Expected: FAIL. Implement. Run again. Expected: PASS.
- [ ] **Step 3: Implement `page.tsx`.**
  - Use `export const instant = false` and `await connection()`, as in `view/[submissionId]/page.tsx`.
  - `const session = await auth()`. If `!userCanModerateSubmission(session?.user?.permissions)`, call `notFound()`.
  - The heading is "Auto-rank checker", followed by a `<Suspense fallback={…"Checking members…"}>` around an async child that awaits `buildAutoRankReport()`.
  - Render the summary line and an `AutoRankTable`, a Radix `Table`. Columns: RSN, Discord user, current rank, calculated rank (rank icon from `getRankImageUrl` + name), total points, rank up (badge), reason.
- [ ] **Step 4: Verify in the browser.** Run `yarn dev` and log in as a moderator. Open `https://localhost:3000/rank-calculator/auto-ranks` and confirm:
  - the page loads;
  - skipped rows show reasons;
  - no ranked row is missing a data source.

  Log in as a non-moderator and confirm a 404. Spot-check two ranked members against the rank calculator, opened via the normal route: points should match whenever their draft adds nothing beyond verified data.

- [ ] **Step 5: Check EHP/EHB parity.** For 3 members of different game modes, compare the page's input `ehp` / `ehb` with `player_stats.php?player=…&bosses=1`, using `Primary_ehp` / `Primary_ehb`. Any mismatch is a stop-and-report.
- [ ] **Step 6:** Run `yarn check-types` in `apps/web`, then `yarn lint` and `yarn knip` from the repo root. Expected: no new findings. Then commit with `git commit -m "feat: add auto-rank checker page"`.
