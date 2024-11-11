'use server';

import { z } from 'zod';
import { userOSRSAccountsKey, userRankSubmissionsKey } from '@/config/redis';
import { redis } from '@/redis';
import { authActionClient } from '@/app/safe-action';
import { returnValidationErrors } from 'next-safe-action';
import { Player, PlayerName } from '@/app/schemas/player';
import { fetchPlayerMeta } from '../../../../data-sources/fetch-player-meta';
import { fetchTemplePlayerStats } from '../../../../data-sources/temple-osrs';
import { EditPlayerSchema } from './edit-player-schema';
import { assertUniquePlayerRecord } from '../../../validation/assert-unique-player-record';

export const editPlayerAction = authActionClient
  .metadata({
    actionName: 'edit-player',
  })
  .schema(EditPlayerSchema)
  .bindArgsSchemas<[previousPlayerName: z.ZodString]>([PlayerName])
  .action(
    async ({
      parsedInput: { joinDate, playerName },
      bindArgsParsedInputs: [previousPlayerName],
      ctx: { userId },
    }) => {
      const isUsernameUnique = await assertUniquePlayerRecord(
        userId,
        playerName,
      );

      if (!isUsernameUnique) {
        returnValidationErrors(EditPlayerSchema, {
          playerName: {
            _errors: ['You have already registered this account'],
          },
        });
      }

      const [playerMeta, playerStats] = await Promise.all([
        fetchPlayerMeta(playerName),
        fetchTemplePlayerStats(playerName, false),
      ]);

      const maybeFormattedPlayerName =
        playerMeta?.rsn ?? playerStats?.info.Username ?? playerName;

      const hasPlayerNameChanged =
        playerName.toLowerCase() !== previousPlayerName.toLowerCase();

      const pipeline = redis.multi();

      if (hasPlayerNameChanged) {
        // Delete the previous player record
        pipeline.hdel(
          userOSRSAccountsKey(userId),
          previousPlayerName.toLowerCase(),
        );

        const rankSubmissionsKeyExists = await redis.exists(
          userRankSubmissionsKey(userId, previousPlayerName.toLowerCase()),
        );

        // If it exists, change the rank submissions key to match the new player name
        if (rankSubmissionsKeyExists) {
          pipeline.renamenx(
            userRankSubmissionsKey(userId, previousPlayerName.toLowerCase()),
            userRankSubmissionsKey(userId, playerName.toLowerCase()),
          );
        }
      }

      // Set the new player record
      pipeline.hset<Player>(userOSRSAccountsKey(userId), {
        [maybeFormattedPlayerName.toLowerCase()]: {
          joinDate,
          rsn: maybeFormattedPlayerName,
        },
      });

      await pipeline.exec();

      return {
        playerName,
      };
    },
  );
