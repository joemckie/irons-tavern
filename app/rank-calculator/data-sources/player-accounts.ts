import { auth } from '@/auth';
import { userOsrsAccountsKey } from '@/config/redis';
import { redis } from '@/redis';
import * as Sentry from '@sentry/nextjs';
import { Player } from '@/types/player';
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

  if (!session?.user?.id) {
    return false;
  }

  try {
    const count = await redis.hexists(
      userOsrsAccountsKey(session.user.id),
      playerName.toLowerCase(),
    );

    return count === 0;
  } catch (error) {
    Sentry.captureException(error);

    return false;
  }
}

export async function fetchPlayerAccounts() {
  const session = await auth();

  if (!session?.user?.id) {
    return {};
  }

  const accounts = await redis.hgetall<Record<string, Player>>(
    userOsrsAccountsKey(session.user.id),
  );

  return accounts ?? {};
}

export async function fetchPlayerJoinDate(playerName: string) {
  const playerMeta = await fetchPlayerMeta(playerName);

  return playerMeta?.joinDate ?? null;
}
