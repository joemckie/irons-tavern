import { constants } from '@/config/constants';
import { PlayerStats } from '@/types/temple-api';

export async function getTempleData(player: string) {
  try {
    const playerStatsQueryParams = new URLSearchParams({
      player,
      bosses: '1',
    });
    const playerStatsResponse = await fetch(
      `${constants.temple.baseUrl}/api/player_stats.php?${playerStatsQueryParams}`,
    );
    const playerStatsData: PlayerStats = await playerStatsResponse.json();

    return playerStatsData.data;
  } catch (e) {
    console.error(e);

    return null;
  }
}
