'use server';

import { StatusCodes } from 'http-status-codes';

export async function validatePlayerExists(playerName: string) {
  'use server';

  try {
    const response = await fetch(
      `https://secure.runescape.com/m=hiscore_oldschool/index_lite.json?player=${playerName}`,
    );

    return response.status !== Number(StatusCodes.NOT_FOUND);
  } catch {
    // Bail early if the query is unhealthy, as this doesn't
    // mean the player name is non-existent
    return true;
  }
}
