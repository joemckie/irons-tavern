import { z } from 'zod';

export const GameMode = z.nativeEnum({
  GroupIronman: 0,
  Ironman: 1,
  UltimateIronman: 2,
  HardcoreIronman: 3,
});

const BooleanNumber = z.union([z.literal(0), z.literal(1)]);

export const TempleOSRSGroupMemberInfo = z.object({
  data: z.object({
    memberlist: z.record(
      z.object({
        player: z.string(),
        player_name_with_capitalization: z.string().nullable(),
        country: z.string(),
        game_mode: GameMode,
        level_3: BooleanNumber,
        free_to_play: BooleanNumber,
        gim_mode: z.number().nullable(),
        leagues_iv_points: z.number().nullable(),
        on_hiscores: BooleanNumber,
        last_checked: z.string(),
        last_checked_unix_time: z.number(),
        last_changed_xp: z.string(),
        last_changed_xp_unix_time: z.number(),
        last_changed_kc: z.string().nullable(),
        last_changed_kc_unix_time: z.union([z.number(), z.literal(false)]),
      }),
    ),
  }),
});

export const TempleOSRSPlayerInfo = z.object({
  data: z.object({
    'Game mode': GameMode,
    'Datapoint Cooldown': z.union([z.literal('-'), z.number()]),
  }),
});

export interface GroupUpdateRequest {
  clan: '100';
  'clan-checkbox': 'on';
  'private-group-checkbox'?: 'on';
  name: string;
  members: string;
  leaders: string;
  id: string;
  key: string;
}

export const TempleOSRSPlayerStats = z.object({
  data: z.object({
    info: z.object({
      Username: z.string(),
      'Game mode': GameMode,
    }),
    Ehb: z.number().nonnegative(),
    Ehp: z.number().nonnegative(),
    Overall_level: z.number().nonnegative(),
    Im_ehp: z.number().nonnegative(),
    Im_ehb: z.number().nonnegative(),
    Uim_ehp: z.number().nonnegative(),
  }),
});

export type TempleOSRSPlayerStats = z.infer<typeof TempleOSRSPlayerStats>;

export interface PlayerStatsError {
  error: {
    Code: number;
    Message: string;
  };
}
