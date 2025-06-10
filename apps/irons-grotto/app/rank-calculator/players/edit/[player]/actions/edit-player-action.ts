'use server';

import { z } from 'zod';
import { userOSRSAccountsKey, userRankSubmissionsKey } from '@/config/redis';
import { redis } from '@/redis';
import { authActionClient } from '@/app/safe-action';
import { returnValidationErrors } from 'next-safe-action';
import { Player, PlayerName } from '@/app/schemas/player';
import { Rank } from '@/config/enums';
import { fetchPlayerMeta } from '../../../../data-sources/fetch-player-meta';
import { fetchTemplePlayerStats } from '../../../../data-sources/fetch-temple-player-stats';
import { assertUniquePlayerRecord } from '../../../validation/assert-unique-player-record';
import { EditPlayerSchema } from './edit-player-schema';

export const editPlayerAction = authActionClient
  .metadata({ actionName: 'edit-player' })
  .schema(EditPlayerSchema)
  .bindArgsSchemas<
    [previousPlayerName: z.ZodString, currentRank: Zod.ZodOptional<typeof Rank>]
  >([PlayerName, Rank.optional()])
  .action(
    async ({
      parsedInput: { joinDate, playerName, isMobileOnly },
      bindArgsParsedInputs: [previousPlayerName, currentRank],
      ctx: { userId },
    }) => {
      if (previousPlayerName !== playerName) {
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
          rank: currentRank,
          isMobileOnly,
        },
      });

      await pipeline.exec();

      return { playerName };
    },
  );
