'use server';

import { UniqueConstraintViolationException } from '@mikro-orm/core';
import { authActionClient } from '@/app/safe-action';
import { returnValidationErrors } from 'next-safe-action';
import { ActionError } from '@/app/action-error';
import { initORM } from '@/database/db';
import { OSRSAccount } from '@/database/entities/osrs-account';
import { User } from '@/database/entities/user.entity';
import { fetchPlayerMeta } from '../../../data-sources/fetch-player-meta';
import { fetchTemplePlayerStats } from '../../../data-sources/fetch-temple-player-stats';
import { assertUniquePlayerRecord } from '../../validation/assert-unique-player-record';
import { AddPlayerSchema } from './add-player-schema';

export const addPlayerAction = authActionClient
  .metadata({ actionName: 'add-player-to-account' })
  .inputSchema(AddPlayerSchema)
  .action(
    async ({
      parsedInput: { joinDate, playerName, isMobileOnly },
      ctx: { userId, userName },
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

      const { em } = await initORM();

      try {
        const user = await em.upsert(User, {
          discordId: userId,
          name: userName,
        });

        em.create(OSRSAccount, {
          user,
          name: maybeFormattedPlayerName,
          joinDate,
          isMobileOnly,
        });

        await em.flush();
      } catch (error) {
        if (error instanceof UniqueConstraintViolationException) {
          throw new ActionError('You have already registered this account');
        }

        throw error;
      }

      return { playerName };
    },
  );
