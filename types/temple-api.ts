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
