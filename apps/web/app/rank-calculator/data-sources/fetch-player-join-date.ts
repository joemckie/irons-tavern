'use server';

import { fetchPlayerMeta } from './fetch-player-meta';

export async function fetchPlayerJoinDate(playerName: string) {
  const playerMeta = await fetchPlayerMeta(playerName);

  return playerMeta?.joinDate ?? null;
}
