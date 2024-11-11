'use server';

import { StatusCodes } from 'http-status-codes';

export async function validatePlayerExists(playerName: string) {
  'use server';

  const response = await fetch(
    `https://secure.runescape.com/m=hiscore_oldschool/index_lite.json?player=${playerName}`,
  );

  if (
    [StatusCodes.TOO_MANY_REQUESTS, StatusCodes.INTERNAL_SERVER_ERROR].includes(
      response.status,
    )
  ) {
    // Bail early if the query is unhealthy, as this doesn't
    // mean the player name is non-existent
    throw new Error('Unable to query the OSRS player API');
  }

  return response.status === StatusCodes.OK;
}
