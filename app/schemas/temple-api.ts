import { z } from 'zod';

interface MemberInfo {
  player: string;
  player_name_with_capitalization: string;
  country: string;
  game_mode: number;
  level_3: 1 | 0;
  free_to_play: number;
  gim_mode: number | null;
  leagues_iv_points: number | null;
  on_hiscores: 1 | 0;
  last_checked: string;
  last_checked_unix_time: number;
  last_changed_xp: string;
  last_changed_xp_unix_time: number;
  last_changed_kc: string;
  last_changed_kc_unix_time: number;
}

interface PlayerInfo {
  'Game mode': 0 | 1 | 2 | 3;
  'Datapoint Cooldown': '-' | number;
}

export interface PlayerInfoResponse {
  data: PlayerInfo;
}

export interface GroupMemberInfoResponse {
  data: {
    memberlist: Record<string, MemberInfo>;
  };
}

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

export enum GameMode {
  GroupIronman = 0,
  Ironman = 1,
  UltimateIronman = 2,
  HardcoreIronman = 3,
}

export const TempleOSRSPlayerStats = z.object({
  data: z.object({
    info: z.object({
      Username: z.string(),
      'Game mode': z.nativeEnum({
        GroupIronman: 0,
        Ironman: 1,
        UltimateIronman: 2,
        HardcoreIronman: 3,
      }),
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
