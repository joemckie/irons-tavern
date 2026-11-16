'use server';

import { z } from 'zod';
import { authActionClient } from '@/app/safe-action';
import { returnValidationErrors } from 'next-safe-action';
import { PlayerName } from '@/app/schemas/player';
import { ActionError } from '@/app/action-error';
import { initORM } from '@/database/db';
import { OSRSAccount } from '@/database/entities/osrs-account';
import { fetchPlayerMeta } from '../../../../data-sources/fetch-player-meta';
import { fetchTemplePlayerStats } from '../../../../data-sources/fetch-temple-player-stats';
import { assertUniquePlayerRecord } from '../../../validation/assert-unique-player-record';
import { EditPlayerSchema } from './edit-player-schema';

export const editPlayerAction = authActionClient
  .metadata({ actionName: 'edit-player' })
  .inputSchema(EditPlayerSchema)
  .bindArgsSchemas<[previousPlayerName: z.ZodString]>([PlayerName])
  .action(
    async ({
      parsedInput: { joinDate, playerName, isMobileOnly },
      bindArgsParsedInputs: [previousPlayerName],
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

      const { em } = await initORM();
      const account = await em.findOne(OSRSAccount, {
        user: userId,
        name: previousPlayerName,
      });

      if (!account) {
        throw new ActionError('Unable to find player record');
      }

      em.assign(account, {
        name: maybeFormattedPlayerName,
        joinDate,
        isMobileOnly,
        isNameInvalid: false,
      });

      await em.flush();

      return { playerName };
    },
  );
