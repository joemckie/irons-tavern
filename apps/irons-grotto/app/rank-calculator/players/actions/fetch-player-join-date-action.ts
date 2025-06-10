'use server';

import { actionClient } from '@/app/safe-action';
import { fetchPlayerMeta } from '@/app/rank-calculator/data-sources/fetch-player-meta';
import { z } from 'zod';

export const fetchPlayerJoinDateAction = actionClient
  .metadata({
    actionName: 'fetch-player-join-date',
  })
  .schema(z.string())
  .action(
    async ({ parsedInput: playerName }) =>
      (await fetchPlayerMeta(playerName))?.joinDate ?? null,
  );
