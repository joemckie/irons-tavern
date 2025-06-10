'use server';

import { userOSRSAccountsKey } from '@/config/redis';
import { redis } from '@/redis';
import { authActionClient } from '@/app/safe-action';
import { returnValidationErrors } from 'next-safe-action';
import * as Sentry from '@sentry/nextjs';
import { Player } from '@/app/schemas/player';
import { ActionError } from '@/app/action-error';
import { fetchPlayerMeta } from '../../../data-sources/fetch-player-meta';
import { fetchTemplePlayerStats } from '../../../data-sources/fetch-temple-player-stats';
import { AddPlayerSchema } from './add-player-schema';

async function assertUniquePlayerRecord(userId: string, playerName: string) {
  if (!userId) {
    return false;
  }

  try {
    const count = await redis.hexists(
      userOSRSAccountsKey(userId),
      playerName.toLowerCase(),
    );

    return count === 0;
  } catch (error) {
    Sentry.captureException(error);

    return false;
  }
}

export const addPlayerAction = authActionClient
  .metadata({ actionName: 'add-player-to-account' })
  .schema(AddPlayerSchema)
  .action(
    async ({
      parsedInput: { joinDate, playerName, isMobileOnly },
      ctx: { userId },
    }) => {
      const isUsernameUnique = await assertUniquePlayerRecord(
        userId,
        playerName,
      );

      if (!isUsernameUnique) {
        returnValidationErrors(AddPlayerSchema, {
          playerName: { _errors: ['You have already registered this account'] },
        });
      }

      const [playerMeta, playerStats] = await Promise.all([
        fetchPlayerMeta(playerName),
        fetchTemplePlayerStats(playerName, false),
      ]);

      const maybeFormattedPlayerName =
        playerMeta?.rsn ?? playerStats?.info.Username ?? playerName;

      const result = await redis.hsetnx<Player>(
        userOSRSAccountsKey(userId),
        maybeFormattedPlayerName.toLowerCase(),
        { joinDate, rsn: maybeFormattedPlayerName, isMobileOnly },
      );

      if (!result) {
        throw new ActionError('Error creating player account record');
      }

      return { playerName };
    },
  );
