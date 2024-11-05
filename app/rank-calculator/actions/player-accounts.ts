'use server';

import { auth } from '@/auth';
import { userOsrsAccountsKey } from '@/config/redis';
import { revalidatePath } from 'next/cache';
import * as Sentry from '@sentry/nextjs';
import { Player } from '@/types/player';
import { redis } from '@/redis';
import { fetchTemplePlayerStats } from '../data-sources/temple-osrs';
import { fetchPlayerMeta } from '../data-sources/fetch-player-meta';
import {
  assertUniquePlayerRecord,
  validatePlayerName,
} from '../data-sources/player-accounts';

export async function savePlayerAccount(playerName: string, joinDate: Date) {
  const session = await auth();

  if (!session?.user?.id) {
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

    const result = await redis.hsetnx(
      userOsrsAccountsKey(session.user.id),
      maybeFormattedPlayerName.toLowerCase(),
      data,
    );

    if (!result) {
      throw new Error('Error creating player account record');
    }

    return result;
  } catch (error) {
    console.error(error);
    Sentry.captureException(error);

    return null;
  }
}

export async function deletePlayerAccount(playerName: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  try {
    const result = await redis.hdel(
      userOsrsAccountsKey(session.user.id),
      playerName.toLowerCase(),
    );

    if (result) {
      revalidatePath('/rank-calculator');
    }

    return result;
  } catch (error) {
    Sentry.captureException(error);

    return null;
  }
}
