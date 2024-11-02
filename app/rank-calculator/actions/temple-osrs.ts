'use server';

import { constants } from '@/config/constants';
import { PlayerStatsError, PlayerStatsResponse } from '@/types/temple-api';
import { captureException } from '@sentry/nextjs';

function isPlayerStatsError(
  playerStatsResponse: PlayerStatsResponse | PlayerStatsError,
): playerStatsResponse is PlayerStatsError {
  return (playerStatsResponse as PlayerStatsError).error !== undefined;
}

export async function fetchTemplePlayerStats(player: string, bosses: boolean) {
  try {
    const playerStatsQueryParams = new URLSearchParams({
      player,
      bosses: Number(bosses).toString(),
    });
    const playerStatsResponse = await fetch(
      `${constants.temple.baseUrl}/api/player_stats.php?${playerStatsQueryParams}`,
    );
    const playerStatsData: PlayerStatsResponse | PlayerStatsError =
      await playerStatsResponse.json();

    return isPlayerStatsError(playerStatsData) ? null : playerStatsData.data;
  } catch (error) {
    captureExceptionr(error);

    return null;
  }
}
