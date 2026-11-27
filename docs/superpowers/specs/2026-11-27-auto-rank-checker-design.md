# Auto-rank checker page — design

**Date:** 2026-11-27
**Status:** Approved

## Intent

Ranking currently happens manually: members open the rank calculator, submit, and a moderator approves (or the submission auto-approves). The end goal is a cron job that ranks members automatically. Before building that, moderators want a **visual page** that shows, for every member of the TempleOSRS group, the rank they would be given automatically — using exactly the same calculations and the same eligibility rules as automatic approval.

## Goals

- A moderator-only page listing every TempleOSRS group member with their calculated rank, or the reason one can't be given.
- Ranks computed **only from verifiable third-party data**, with the existing calculation chain unchanged.
- A reusable pipeline (data gathering → calculation → rank-up check) that the future cron job can call directly.

## Non-goals

- Applying ranks, assigning Discord roles, sending DMs, or creating submissions. The page only displays.
- Storing results. Nothing is persisted.
- Replacing or fixing `api/check-auto-rank` / `api/check-all-auto-ranks`. They stay untouched; the cron job will supersede them later.

## Anti-goals (failure even if it "works")

- **Showing a rank for a member who is missing any data source.** A rank is only shown when the member meets every data criterion of automatic approval (`isAutoApprovalAvailable` in `publish-rank-submission-action.ts`): Temple collection log, Temple player stats and WikiSync all present, and Standard rank structure.
- **Merging draft submission data into the calculation.** Drafts are self-reported and unverified. The only field read from a draft is `rankStructure`, and only to skip non-Standard members.
- Changing any points maths.
- Per-member Temple requests (the 6-second datapoint bottleneck). No `add_datapoint.php` refresh, no `player_stats.php`, no `player_collection_log.php`.

## Constraints

- Access: anyone with Discord `MANAGE_ROLES` (`userCanModerateSubmission(session.user.permissions)`). Login is already enforced for `/rank-calculator/*` by `proxy.ts`.
- Temple is rate-limited for datapoint endpoints; group endpoints are single requests.
- WikiSync has no group endpoint; it must be fetched per member (not Temple, so not subject to the 6s limit).
- The bot has the Server Members privileged intent enabled (application flag `GATEWAY_GUILD_MEMBERS_LIMITED`, verified 2026-11-27), so guild members can be listed in bulk.
- Discord has no "members with role" REST endpoint; roles come from the bulk member list.

## Approaches considered

1. **Live page, per-member streaming** using `fetchPlayerDetails` per row with a concurrency cap. Rejected: still one round of per-member Temple calls, and `fetchPlayerDetails` merges drafts and redirects.
2. **Browser-driven per-member checks** with progress/retry. Rejected for the same per-member cost and extra client code.
3. **Background job storing results.** This is the eventual cron shape; too much infrastructure for a first visual step.
4. **Chosen: bulk server-side pipeline.** Group-level Temple endpoints are the source of truth, matched to the DB in one query, Discord roles fetched in bulk, WikiSync per remaining member with a concurrency cap. The page renders the result on request. The pipeline is a plain module the cron job can reuse.

## Design

### Pipeline (`buildAutoRankReport()`), in order

1. **Gather Temple data (3 requests, in parallel)**
   - `GET {temple}/api/group_member_info.php?id={groupId}&details=1&skills=1&bosses=1`
   - `GET {temple}/api/collection-log/group_collection_log.php?group={groupId}&includecount=1&categories={categories}`
     where `{categories}` is the same filtered list the per-player call uses: `generateCollectionLogCategoryList()` from `fetch-temple-collection-log.ts` (export it), which covers the item-list categories plus `the_inferno` and `the_fight_caves`. Filtering only limits the `items` returned. `total_collections_available` and `total_collections_finished` are still the overall figures (checked 2026-11-27: 1738 and 917 with a two-category filter, the same as `all`).
     Source of truth for collection logs: only members present here have a verified log.
   - `GET {temple}/api/collection-log/items.php` — item ID → item name map (the group log returns IDs only; our item list matches on names via `normaliseEntityName`).
     New Zod schemas go in `app/schemas/temple-api.ts`. The existing `MemberInfo` schema needs `clog_synced`, `primary_ehp`, `primary_ehb`, `skills` and `bosses` as optional fields.

2. **Filter.** Start from members in the group collection log. Look up each in group member info by lowercased RSN. Members absent from the collection log are listed as `missing collection log`. Members without stats are listed as `missing Temple stats`.

3. **Match to the database (1 query).** `OSRSAccount` where `name` in the RSN list (`citext`, case-insensitive), populated with `user` and `draftRankSubmission`. Outcomes:
   - no account → `unlinked`
   - more than one account (different Discord users claiming the same RSN) → `ambiguous`
   - exactly one → continue

4. **Rank structure.** If the account has a draft and `draft.data.rankStructure !== "Standard"`, list as `non-standard structure`. No draft means Standard (the same default `fetchPlayerDetails` uses).

5. **Enrich.**
   - Discord roles: page through `GET /guilds/{guildId}/members?limit=1000&after={lastId}` once, build `Map<discordId, Set<roleId>>`. If a user isn't in the guild → `not in Discord server`.
   - WikiSync: `getWikiSyncData(rsn)` for each remaining member, about 10 concurrently. Null → `missing WikiSync`.

6. **Build the calculator input from verified data only.** This mirrors what `fetchPlayerDetails` derives, with no draft merge:
   - `collectionLogTotal` = group log `total_collections_available`
   - `collectionLogCount` = `max(member.total_collections_finished, bosses.Collections ?? 0)`
   - acquired collection log items: `{ normaliseEntityName(itemNames[id]): count }` → `CollectionLogAcquiredItemMap`, then `isItemAcquired` with WikiSync quests and combat achievements, plus music cape from WikiSync music tracks (holiday tracks excluded)
   - `totalLevel` = `skills.Overall_level`
   - `ehp` = `skills[primary_ehp]`, `ehb` = `bosses[primary_ehb]`, rounded (see "Left to the builder" for key naming)
   - achievement diaries, combat achievement tier, Blood Torva, Dizana's quiver and diary cape: from WikiSync, using the same helpers as `fetchPlayerDetails`
   - TzHaar cape: Infernal if `bosses["TzKal-Zuk"] > 0`, else Fire if CA 147, else None
   - max cape: `totalLevel === maximumTotalLevel`
   - `joinDate` = `OSRSAccount.joinDate` (not Temple's `join_date`)
   - bonus multipliers: `calculateTavernDiaryTierMultipliers(roles)`, notable items multiplier 0
   - `rankStructure` = `"Standard"`

   Reuse the existing helpers (`parseAchievementDiaries`, `calculateCombatAchievementTier`, `isAchievementDiaryCapeAchieved`, `isItemAcquired`, …) instead of reimplementing them. Extract shared pieces from `fetchPlayerDetails` where that's needed to avoid duplication, without changing its behaviour.

7. **Calculate.** Extract the points chain from `api/check-auto-rank/route.ts` (scaling → collection log → notable items → skilling → combat → total → `calculateRank`) into a pure `calculatePlayerRank(input, notableItems)` returning `{ rank, totalPoints }`. The maths stays identical. `fetchItemDropRates` and `buildNotableItemList` are called once per run, not per member. `check-auto-rank` is left as is (it may optionally be switched to the new function only if that is a pure refactor).

8. **Compare.** Bring `isRankUp` (and its spec) over from branch `feat/auto-ranking` (`app/rank-calculator/utils/is-rank-up.ts`), adapted to current formatting. `isRankUp` throws on non-standard ranks. If `OSRSAccount.rank` is not a `StandardRank`, list as `staff / non-standard rank` with no rank-up flag.

Each member yields one row: `{ rsn, discordUser?, currentRank?, calculatedRank?, totalPoints?, isRankUp?, skipReason? }`. `calculatedRank` is only set when there is no `skipReason`. A failure in one member (for example a WikiSync error) becomes that member's `skipReason` and never fails the whole page.

### Page

- Route: `app/rank-calculator/auto-ranks/page.tsx` (server component).
- Access: read the session with `auth()`. If `!userCanModerateSubmission(session.user.permissions)`, call `notFound()` or `forbidden()`, matching whatever the codebase already does.
- Wrap the report in `<Suspense>` with a loading state. Nothing is cached or stored, and each visit recomputes.
- Table columns: RSN, Discord user, current rank, calculated rank (with rank image via `getRankImageUrl`), total points, rank-up indicator, reason (for skipped rows). Rank-ups first, then other ranked rows, then skipped rows grouped by reason. A summary line with counts per outcome.
- Follow the existing rank-calculator styling (Radix Themes and Tailwind).

## Left to the builder

- **EHP/EHB key naming.** Group member info uses different keys from `player_stats.php`. `primary_ehp` values seen: `Ehp`, `Ehp_im`, `Uim_ehp`, `lvl3_ehp`, `F2p_im_ehp`. `primary_ehb` values seen: `Ehb`, `Ehb_im`, `Ehb_uim`, `Ehb_1def`. EHP keys live under `skills`, EHB keys under `bosses`. `player_stats.php` uses `Ehp` / `Im_ehp` / `Uim_ehp`. Index by the `primary_*` value directly. Spot-check a few members against `player_stats.php` to confirm the numbers match. Treat a missing key as `missing Temple stats`.
- Module layout and naming, the concurrency helper (a small internal one or an existing dependency), and page component structure.
- Tests: unit tests for `calculatePlayerRank` (parity with the old inline chain), the bulk-data → calculator-input mapping (fixture-based), the skip-reason logic, and `isRankUp`.
