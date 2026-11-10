/**
 * One-off migration: copies the legacy Upstash Redis data into Postgres.
 *
 * Usage (from apps/web):
 *   yarn migrate-redis-to-postgres --dry-run   # read + validate + insert, then roll back
 *   yarn migrate-redis-to-postgres             # commit
 *
 * Environment:
 *   KV_REST_API_URL                 Upstash REST URL
 *   KV_REST_API_READ_ONLY_TOKEN     preferred - the script only ever reads from Redis
 *     (or KV_REST_API_TOKEN)
 *   DATABASE_URL                    target database (pending migrations are applied)
 *   DISCORD_TOKEN                   optional - used to look up user display names,
 *                                   which Redis never stored. Falls back to the Discord ID.
 *
 * Legacy key layout (see `config/redis.ts` prior to the Mikro ORM migration):
 *   user:{discordId}:osrs-accounts                     hash  lowercase rsn -> Player JSON
 *   user:{discordId}:draft-rank-submission:{rsn}       JSON  form data
 *   user:{discordId}:rank-submissions:{rsn}            list  of `rank-submission:{uuid}`
 *   rank-submission:{uuid}                             JSON  form data
 *   rank-submission:{uuid}:metadata                    hash
 *   rank-submission:{uuid}:diff                        hash
 *   player-game-modes                                  hash  lowercase rsn -> GameMode
 *   rank-up-messages                                   hash  `{discordId}:{rsn}` -> Rank
 *
 * The script reads and validates everything before touching Postgres, and refuses to
 * run against a database that already contains data.
 */
import { REST } from '@discordjs/rest';
import { Routes, type APIUser } from 'discord-api-types/v10';
import { z } from 'zod';
import { Utils, type EntityName } from '@mikro-orm/core';
import { initORM } from '@/database/db';
import { User } from '@/database/entities/user.entity';
import { OSRSAccount } from '@/database/entities/osrs-account';
import { DraftRankSubmission } from '@/database/entities/draft-rank-submission.entity';
import {
  RankSubmission,
  type RankSubmissionData,
} from '@/database/entities/rank-submission.entity';
import { PlayerGameMode } from '@/database/entities/player-game-mode.entity';
import { Rank } from '@/config/enums';
import {
  type AchievementDiaryMap,
  RankSubmissionDiff,
  RankSubmissionMetadata,
} from '@/app/schemas/rank-calculator';
import { DiaryLocation, DiaryTier } from '@/app/schemas/osrs';
import { GameMode } from '@/app/schemas/temple-api';

const isDryRun = process.argv.includes('--dry-run');

const env = z
  .object({
    KV_REST_API_URL: z.url(),
    KV_REST_API_READ_ONLY_TOKEN: z.string().min(1).optional(),
    KV_REST_API_TOKEN: z.string().min(1).optional(),
    DATABASE_URL: z.url(),
    DISCORD_TOKEN: z.string().min(1).optional(),
  })
  .refine((e) => e.KV_REST_API_READ_ONLY_TOKEN ?? e.KV_REST_API_TOKEN, {
    message: 'KV_REST_API_READ_ONLY_TOKEN or KV_REST_API_TOKEN is required',
  })
  .parse(process.env);

const redisToken = (env.KV_REST_API_READ_ONLY_TOKEN ?? env.KV_REST_API_TOKEN)!;

const errors: string[] = [];
const warnings: string[] = [];

// ---------------------------------------------------------------------------
// Minimal read-only Upstash REST client
// ---------------------------------------------------------------------------

type RedisCommand = string[];

async function redisPipeline(commands: RedisCommand[]): Promise<unknown[]> {
  const results: unknown[] = [];

  for (let i = 0; i < commands.length; i += 100) {
    const batch = commands.slice(i, i + 100);
    const response = await fetch(`${env.KV_REST_API_URL}/pipeline`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${redisToken}` },
      body: JSON.stringify(batch),
    });

    if (!response.ok) {
      throw new Error(
        `Redis request failed (${response.status}): ${await response.text()}`,
      );
    }

    const body = (await response.json()) as (
      { result: unknown } | { error: string }
    )[];

    body.forEach((item, index) => {
      if ('error' in item) {
        throw new Error(
          `Redis command "${batch[index].join(' ')}" failed: ${item.error}`,
        );
      }

      results.push(item.result);
    });
  }

  return results;
}

async function scanKeys(pattern: string): Promise<string[]> {
  const keys = new Set<string>();
  let cursor = '0';

  do {
    const [[nextCursor, batch]] = (await redisPipeline([
      ['SCAN', cursor, 'MATCH', pattern, 'COUNT', '1000'],
    ])) as [[string | number, string[]]];

    cursor = String(nextCursor);
    batch.forEach((key) => keys.add(key));
  } while (cursor !== '0');

  return [...keys].sort();
}

function toRecord(flat: unknown): Record<string, string> {
  const entries = flat as string[] | null;
  const record: Record<string, string> = {};

  for (let i = 0; entries && i < entries.length; i += 2) {
    record[entries[i]] = entries[i + 1]!;
  }

  return record;
}

async function hgetallMany(keys: string[]) {
  const results = await redisPipeline(keys.map((key) => ['HGETALL', key]));

  return results.map(toRecord);
}

async function jsonGetMany(keys: string[]) {
  const results = await redisPipeline(keys.map((key) => ['JSON.GET', key]));

  return results.map((result) =>
    typeof result === 'string' ? (JSON.parse(result) as unknown) : null,
  );
}

/**
 * Mirrors @upstash/redis's automatic deserialisation: non-string values were
 * written with JSON.stringify, strings were written verbatim.
 * Numbers that don't survive a round trip (e.g. Discord snowflakes) stay as strings.
 */
function deserialise(raw: string): unknown {
  try {
    const parsed = JSON.parse(raw) as unknown;

    if (typeof parsed === 'number' && String(parsed) !== raw) {
      return raw;
    }

    return parsed;
  } catch {
    return raw;
  }
}

function formatZodError(error: z.ZodError) {
  return error.issues
    .map((issue) => {
      // Enum errors list every option, which is unreadable for e.g. Rank
      const message =
        issue.message.length > 80
          ? `${issue.message.slice(0, 80)}...`
          : issue.message;

      return `${issue.path.join('.') || '(root)'}: ${message}`;
    })
    .join('; ');
}

// ---------------------------------------------------------------------------
// Readers
// ---------------------------------------------------------------------------

const LegacyPlayer = z.object({
  rsn: z.string().min(1),
  joinDate: z.coerce.date(),
  rank: Rank.nullish(),
  isMobileOnly: z.boolean().default(false),
  isNameInvalid: z.boolean().optional(),
});

type LegacyPlayer = z.infer<typeof LegacyPlayer>;

/** `${discordId}:${lowercase rsn}` - the identity used by every legacy key */
type AccountKey = `${string}:${string}`;

function accountKey(discordId: string, playerName: string): AccountKey {
  return `${discordId}:${playerName.toLowerCase()}`;
}

async function readAccounts() {
  const keys = await scanKeys('user:*:osrs-accounts');
  const hashes = await hgetallMany(keys);
  const accounts = new Map<AccountKey, LegacyPlayer & { discordId: string }>();

  keys.forEach((key, index) => {
    const [, discordId] = /^user:(\d+):osrs-accounts$/.exec(key) ?? [];

    if (!discordId) {
      warnings.push(`Skipping unrecognised key ${key}`);
      return;
    }

    for (const [field, raw] of Object.entries(hashes[index])) {
      const result = LegacyPlayer.safeParse(deserialise(raw));

      if (!result.success) {
        errors.push(`${key} -> ${field}: ${formatZodError(result.error)}`);
        continue;
      }

      accounts.set(accountKey(discordId, field), {
        ...result.data,
        discordId,
      });
    }
  });

  return accounts;
}

async function readRankUpMessages() {
  const hash = toRecord(
    (await redisPipeline([['HGETALL', 'rank-up-messages']]))[0],
  );
  const messages = new Map<AccountKey, Rank>();

  for (const [field, raw] of Object.entries(hash)) {
    const [, discordId, playerName] = /^(\d+):(.+)$/.exec(field) ?? [];
    const rank = Rank.safeParse(raw);

    if (!discordId || !playerName || !rank.success) {
      errors.push(`rank-up-messages -> ${field}: invalid entry "${raw}"`);
      continue;
    }

    messages.set(accountKey(discordId, playerName), rank.data);
  }

  return messages;
}

async function readDrafts() {
  const keys = await scanKeys('user:*:draft-rank-submission:*');
  const documents = await jsonGetMany(keys);
  const drafts = new Map<AccountKey, RankSubmissionData>();

  keys.forEach((key, index) => {
    const [, discordId, playerName] =
      /^user:(\d+):draft-rank-submission:(.+)$/.exec(key) ?? [];
    const data = documents[index];

    if (!discordId || !playerName) {
      warnings.push(`Skipping unrecognised key ${key}`);
      return;
    }

    if (!data || typeof data !== 'object') {
      errors.push(`${key}: expected a JSON object`);
      return;
    }

    drafts.set(accountKey(discordId, playerName), data as RankSubmissionData);
  });

  return drafts;
}

/** Maps submission IDs to the account whose submission list they appeared in */
async function readSubmissionOwners() {
  const keys = await scanKeys('user:*:rank-submissions:*');
  const lists = (await redisPipeline(
    keys.map((key) => ['LRANGE', key, '0', '-1']),
  )) as string[][];
  const owners = new Map<string, AccountKey>();

  keys.forEach((key, index) => {
    const [, discordId, playerName] =
      /^user:(\d+):rank-submissions:(.+)$/.exec(key) ?? [];

    if (!discordId || !playerName) {
      warnings.push(`Skipping unrecognised key ${key}`);
      return;
    }

    for (const entry of lists[index]) {
      const [, submissionId] = /^rank-submission:(.+)$/.exec(entry) ?? [];

      if (!submissionId) {
        errors.push(`${key}: unrecognised entry "${entry}"`);
        continue;
      }

      const owner = accountKey(discordId, playerName);
      const existingOwner = owners.get(submissionId);

      if (existingOwner && existingOwner !== owner) {
        warnings.push(
          `Submission ${submissionId} is listed under both ${existingOwner} and ${owner}; using ${existingOwner}`,
        );
        continue;
      }

      owners.set(submissionId, owner);
    }
  });

  return owners;
}

const LegacySubmissionMetadata = RankSubmissionMetadata.extend({
  submittedAt: z.coerce.date(),
});

/** Discord snowflakes encode their creation time in the top 42 bits */
function snowflakeToDate(snowflake: string | undefined) {
  if (!snowflake || !/^\d+$/.test(snowflake)) {
    return undefined;
  }

  const discordEpoch = BigInt('1420070400000');

  return new Date(Number((BigInt(snowflake) >> BigInt(22)) + discordEpoch));
}

function parseMetadata(
  hash: Record<string, string>,
  ownerDiscordId: string | undefined,
) {
  const nullableString = (raw: string | undefined) =>
    raw === undefined || raw === 'null' ? null : raw;
  // Flags added after the first submissions were made won't exist on older records
  const flag = (raw: string | undefined) =>
    raw === undefined ? false : deserialise(raw);

  return LegacySubmissionMetadata.safeParse({
    status: hash.status,
    // IDs are kept verbatim - parsing them as numbers loses precision
    discordMessageId: hash.discordMessageId,
    // The earliest submissions didn't record who submitted them or when, so fall back to
    // the owner of the submission list it's in, and the time the Discord message was posted
    submittedBy: hash.submittedBy ?? ownerDiscordId,
    submittedAt: hash.submittedAt
      ? deserialise(hash.submittedAt)
      : snowflakeToDate(hash.discordMessageId),
    actionedBy: nullableString(hash.actionedBy),
    hasTemplePlayerStats: flag(hash.hasTemplePlayerStats),
    hasTempleCollectionLog: flag(hash.hasTempleCollectionLog),
    isTempleCollectionLogOutdated: flag(hash.isTempleCollectionLogOutdated),
    hasWikiSyncData: flag(hash.hasWikiSyncData),
    // Only set on approval
    automaticApproval:
      hash.automaticApproval === undefined
        ? null
        : deserialise(hash.automaticApproval),
  });
}

const LegacySubmissionDiff = RankSubmissionDiff.extend({
  // Only the diaries with a discrepancy are recorded, not the full map,
  // even though the entity types it as a full map
  achievementDiaries: z
    .partialRecord(DiaryLocation, DiaryTier)
    .nullable()
    .pipe(z.custom<AchievementDiaryMap | null>()),
});

function parseDiff(hash: Record<string, string>) {
  // Fields added after the first submissions were made won't exist on older records
  return LegacySubmissionDiff.safeParse(
    Object.fromEntries(
      RankSubmissionDiff.keyof().options.map((field) => {
        const raw = hash[field];

        return [field, raw === undefined ? null : deserialise(raw)];
      }),
    ),
  );
}

async function readSubmissions(submissionOwners: Map<string, AccountKey>) {
  const submissionIds = (await scanKeys('rank-submission:*'))
    .map((key) => /^rank-submission:([^:]+)$/.exec(key)?.[1])
    .filter((id) => id !== undefined);

  const [documents, metadataHashes, diffHashes] = await Promise.all([
    jsonGetMany(submissionIds.map((id) => `rank-submission:${id}`)),
    hgetallMany(submissionIds.map((id) => `rank-submission:${id}:metadata`)),
    hgetallMany(submissionIds.map((id) => `rank-submission:${id}:diff`)),
  ]);

  return submissionIds.flatMap((id, index) => {
    const key = `rank-submission:${id}`;
    const data = documents[index];
    const metadataHash = metadataHashes[index];

    // Left behind by publishes that never completed: no status, submitter or
    // Discord message, and the old app couldn't display them either
    if (!Object.keys(metadataHash).length) {
      const { data: playerName = 'unknown player' } = z
        .object({ playerName: z.string() })
        .transform(({ playerName: name }) => name)
        .safeParse(data);

      warnings.push(
        `Dropping ${key} (${playerName}): no metadata, so the submission was never completed`,
      );

      return [];
    }

    const metadata = parseMetadata(
      metadataHash,
      submissionOwners.get(id)?.split(':')[0],
    );
    const diff = parseDiff(diffHashes[index]);

    if (!z.uuid().safeParse(id).success) {
      errors.push(`${key}: ID is not a UUID`);
    }

    if (!data || typeof data !== 'object') {
      errors.push(`${key}: expected a JSON object`);
    }

    if (!metadata.success) {
      errors.push(`${key}:metadata: ${formatZodError(metadata.error)}`);
    }

    if (!diff.success) {
      errors.push(`${key}:diff: ${formatZodError(diff.error)}`);
    }

    if (!data || !metadata.success || !diff.success) {
      return [];
    }

    return [
      {
        id,
        data: data as RankSubmissionData,
        metadata: metadata.data,
        diff: diff.data,
      },
    ];
  });
}

async function readPlayerGameModes() {
  const hash = toRecord(
    (await redisPipeline([['HGETALL', 'player-game-modes']]))[0],
  );
  const GameModeValue = z.coerce
    .number()
    .pipe(z.union(Object.values(GameMode).map((value) => z.literal(value))));

  return Object.entries(hash).flatMap(([playerName, raw]) => {
    const result = GameModeValue.safeParse(raw);

    if (!result.success) {
      errors.push(
        `player-game-modes -> ${playerName}: invalid game mode "${raw}"`,
      );
      return [];
    }

    return [{ playerName, gameMode: result.data }];
  });
}

/**
 * Redis never stored user names, so look them up the same way Auth.js derives
 * `session.user.name` for Discord (global name, falling back to username).
 */
async function fetchUserNames(discordIds: string[]) {
  const names = new Map<string, string>();

  if (!env.DISCORD_TOKEN) {
    warnings.push(
      'DISCORD_TOKEN not set; user names will be set to their Discord ID until they next add an account',
    );

    return names;
  }

  const discord = new REST().setToken(env.DISCORD_TOKEN);

  for (const discordId of discordIds) {
    try {
      const user = (await discord.get(Routes.user(discordId))) as APIUser;

      names.set(discordId, user.global_name ?? user.username);
    } catch (error) {
      warnings.push(
        `Unable to fetch Discord user ${discordId} (${(error as Error).message}); using their ID as their name`,
      );
    }
  }

  return names;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

class DryRunRollback extends Error {}

function printList(title: string, items: string[]) {
  if (items.length) {
    console.log(`\n${title} (${items.length}):`);
    items.forEach((item) => console.log(`  - ${item}`));
  }
}

async function main() {
  console.log(`Reading from Redis at ${new URL(env.KV_REST_API_URL).host}...`);

  const submissionOwnersPromise = readSubmissionOwners();
  const [
    accounts,
    rankUpMessages,
    drafts,
    submissionOwners,
    submissions,
    gameModes,
  ] = await Promise.all([
    readAccounts(),
    readRankUpMessages(),
    readDrafts(),
    submissionOwnersPromise,
    submissionOwnersPromise.then(readSubmissions),
    readPlayerGameModes(),
  ]);

  if (errors.length) {
    printList('Invalid records - nothing has been written', errors);
    printList('Warnings', warnings);
    process.exitCode = 1;
    return;
  }

  const discordIds = [
    ...new Set([...accounts.values()].map((a) => a.discordId)),
  ];
  const userNames = await fetchUserNames(discordIds);

  const { orm } = await initORM({ debug: false });

  try {
    const counts = await orm.em.fork().transactional(async (em) => {
      const populated: [string, number][] = [];

      for (const entity of [
        User,
        OSRSAccount,
        DraftRankSubmission,
        RankSubmission,
        PlayerGameMode,
      ] as EntityName<object>[]) {
        const count = await em.count(entity);

        if (count > 0) {
          populated.push([Utils.className(entity), count]);
        }
      }

      if (populated.length) {
        throw new Error(
          `Refusing to migrate into a non-empty database: ${populated
            .map(([name, count]) => `${name} (${count})`)
            .join(', ')}`,
        );
      }

      const users = new Map(
        discordIds.map((discordId) => [
          discordId,
          em.create(User, {
            discordId,
            name: userNames.get(discordId) ?? discordId,
          }),
        ]),
      );

      const osrsAccounts = new Map<AccountKey, OSRSAccount>();

      for (const [key, player] of accounts) {
        osrsAccounts.set(
          key,
          em.create(OSRSAccount, {
            user: users.get(player.discordId)!,
            name: player.rsn,
            joinDate: player.joinDate,
            rank: player.rank ?? null,
            isMobileOnly: player.isMobileOnly,
            isNameInvalid: player.isNameInvalid ?? false,
            lastNotifiedRank: rankUpMessages.get(key) ?? null,
          }),
        );
      }

      for (const key of rankUpMessages.keys()) {
        if (!osrsAccounts.has(key)) {
          warnings.push(
            `Dropping rank-up message for ${key}: account no longer exists`,
          );
        }
      }

      let draftCount = 0;

      for (const [key, data] of drafts) {
        const osrsAccount = osrsAccounts.get(key);

        if (!osrsAccount) {
          warnings.push(
            `Dropping draft submission for ${key}: account no longer exists (deleted or renamed)`,
          );
          continue;
        }

        em.create(DraftRankSubmission, { osrsAccount, data });
        draftCount += 1;
      }

      let orphanedSubmissionCount = 0;
      let relinkedSubmissionCount = 0;

      for (const submission of submissions) {
        const owner = submissionOwners.get(submission.id);
        let osrsAccount = owner ? osrsAccounts.get(owner) : undefined;

        // Deleting an account removed its submission list, so a deleted and re-added
        // account lost its history. Recover it from the submitter and player name.
        if (!osrsAccount) {
          osrsAccount = osrsAccounts.get(
            accountKey(
              submission.metadata.submittedBy,
              submission.data.playerName,
            ),
          );

          if (osrsAccount) {
            relinkedSubmissionCount += 1;
          }
        }

        // Matches the new schema's behaviour of keeping submissions for deleted accounts
        if (!osrsAccount) {
          orphanedSubmissionCount += 1;
        }

        em.create(RankSubmission, {
          ...submission,
          osrsAccount: osrsAccount ?? null,
        });
      }

      for (const { playerName, gameMode } of gameModes) {
        em.create(PlayerGameMode, { playerName, gameMode });
      }

      await em.flush();

      const result = {
        users: users.size,
        osrsAccounts: osrsAccounts.size,
        lastNotifiedRanks: [...osrsAccounts.values()].filter(
          (account) => account.lastNotifiedRank,
        ).length,
        draftRankSubmissions: draftCount,
        rankSubmissions: submissions.length,
        'rankSubmissions (relinked by submitter + name)':
          relinkedSubmissionCount,
        'rankSubmissions (no account)': orphanedSubmissionCount,
        playerGameModes: gameModes.length,
      };

      if (isDryRun) {
        throw Object.assign(new DryRunRollback(), { result });
      }

      return result;
    });

    printList('Warnings', warnings);
    console.log('\nMigrated:');
    console.table(counts);
  } catch (error) {
    if (!(error instanceof DryRunRollback)) {
      throw error;
    }

    printList('Warnings', warnings);
    console.log('\nDry run - would migrate (rolled back):');
    console.table((error as DryRunRollback & { result: unknown }).result);
  } finally {
    await orm.close();
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
