'use server';

import { auth, redis } from '@/auth';
import { RedisKeyNamespace } from '@/config/redis';
import { revalidatePath } from 'next/cache';
import * as Sentry from '@sentry/nextjs';
import { Player } from '@/types/player';
import { fetchTemplePlayerStats } from './temple-osrs';
import { fetchPlayerMeta } from './fetch-player-meta';

export async function validatePlayerName(playerName: string) {
  try {
    const response = await fetch(
      `https://secure.runescape.com/m=hiscore_oldschool/index_lite.json?player=${playerName}`,
    );

    return response.status === 200;
  } catch {
    return false;
  }
}

export async function assertUniquePlayerRecord(playerName: string) {
  const session = await auth();

  if (!session?.user) {
    return false;
  }

  try {
    const [record] = await redis.json.type(
      `${RedisKeyNamespace.Accounts}:${session.user.id}`,
      `$.['${playerName.toLowerCase()}']`,
    );

    return typeof record === 'undefined';
  } catch (error) {
    Sentry.captureException(error);

    return false;
  }
}

export async function fetchPlayerAccounts() {
  const session = await auth();

  if (!session?.user) {
    return {};
  }

  const accounts = await redis.json.get<Record<string, Player>>(
    `${RedisKeyNamespace.Accounts}:${session.user.id}`,
  );

  return accounts ?? {};
}

export async function fetchPlayerJoinDate(playerName: string) {
  const playerMeta = await fetchPlayerMeta(playerName);

  return playerMeta?.joinDate ?? null;
}

export async function savePlayerAccount(playerName: string, joinDate: Date) {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  try {
    const isPlayerNameValid = await validatePlayerName(playerName);

    if (!isPlayerNameValid) {
      throw new Error('Invalid player name');
    }

    const isPlayerNameUnique = await assertUniquePlayerRecord(playerName);

    if (!isPlayerNameUnique) {
      throw new Error('Account already exists on profile');
    }

    const [playerMeta, playerStats] = await Promise.all([
      fetchPlayerMeta(playerName),
      fetchTemplePlayerStats(playerName, false),
    ]);

    const maybeFormattedPlayerName =
      playerMeta?.rsn ?? playerStats?.info.Username ?? playerName;

    const data = {
      joinDate,
      rsn: maybeFormattedPlayerName,
    } satisfies Player;

    const result = await redis.json.set(
      `${RedisKeyNamespace.Accounts}:${session.user.id}`,
      `$.['${maybeFormattedPlayerName.toLowerCase()}']`,
      data,
      { nx: true },
    );

    if (!result) {
      throw new Error('Error creating player account record');
    }

    return result;
  } catch (error) {
    Sentry.captureException(error);

    return null;
  }
}

export async function deletePlayerAccount(playerName: string) {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  try {
    const result = await redis.json.del(
      `${RedisKeyNamespace.Accounts}:${session.user.id}`,
      `$.['${playerName}']`,
    );

    if (result) {
      revalidatePath('/rank-calculator/players');
    }

    return result;
  } catch (error) {
    Sentry.captureException(error);

    return null;
  }
}
