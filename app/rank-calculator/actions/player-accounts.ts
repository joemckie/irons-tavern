'use server';

import { auth, redis } from '@/auth';
import { RedisKeyNamespace } from '@/config/redis';
import { revalidatePath } from 'next/cache';
import * as Sentry from '@sentry/nextjs';
import { fetchTemplePlayerStats } from './temple-osrs';

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

export async function fetchPlayerAccounts() {
  const session = await auth();

  if (!session?.user) {
    return [];
  }

  const accounts = await redis.json.get<Record<string, unknown>>(
    `${RedisKeyNamespace.Submissions}:${session.user.id}`,
  );

  return accounts ?? [];
}

export async function savePlayerAccount(playerName: string) {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  try {
    const isPlayerNameValid = await validatePlayerName(playerName);

    if (!isPlayerNameValid) {
      throw new Error('Invalid player name');
    }

    const playerStats = await fetchTemplePlayerStats(playerName, false);
    const maybeFormattedPlayerName = playerStats?.info.Username ?? playerName;
    const result = await redis.json.set(
      `${RedisKeyNamespace.Submissions}:${session.user.id}`,
      `$.['${maybeFormattedPlayerName}']`,
      {},
      { nx: true },
    );

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
      `${RedisKeyNamespace.Submissions}:${session.user.id}`,
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
