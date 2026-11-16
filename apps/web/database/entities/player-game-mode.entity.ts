import { defineEntity, p } from '@mikro-orm/core';
import type { GameMode } from '@/app/schemas/temple-api';

/**
 * The last known TempleOSRS game mode of each clan member,
 * used to detect game mode changes (e.g. a HCIM dying).
 */
const PlayerGameModeSchema = defineEntity({
  name: 'PlayerGameMode',
  tableName: 'player_game_mode',
  properties: {
    playerName: p.string().columnType('citext').primary(),
    gameMode: p.integer().$type<(typeof GameMode)[keyof typeof GameMode]>(),
  },
});

export class PlayerGameMode extends PlayerGameModeSchema.class {}

PlayerGameModeSchema.setClass(PlayerGameMode);
