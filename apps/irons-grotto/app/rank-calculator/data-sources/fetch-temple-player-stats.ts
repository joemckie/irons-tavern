'use server';

import { clientConstants } from '@/config/constants.client';
import { TempleOSRSPlayerStats } from '@/app/schemas/temple-api';
import * as Sentry from '@sentry/nextjs';

export async function fetchTemplePlayerStats(player: string, bosses: boolean) {
  try {
    const playerStatsQueryParams = new URLSearchParams({
      player,
      bosses: Number(bosses).toString(),
    });
    const playerStatsResponse = await fetch(
      `${clientConstants.temple.baseUrl}/api/player_stats.php?${playerStatsQueryParams}`,
    );

    return TempleOSRSPlayerStats.parse(await playerStatsResponse.json()).data;
  } catch {
    Sentry.captureMessage('TempleOSRS player stats not found', 'info');

    return null;
  }
}
