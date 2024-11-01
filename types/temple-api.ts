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

export enum GameMode {
  GroupIronman = 0,
  Ironman = 1,
  UltimateIronman = 2,
  HardcoreIronman = 3,
}

export interface PlayerStats {
  info: {
    Username: string;
    Country: string;
    'Game mode': GameMode;
    GIM: number;
    'Cb-3': number;
    F2p: number;
    Banned: number;
    Disqualified: number;
    'Clan preference': string | null;
    'Last checked': string;
    'Last checked unix': number;
  };
  date: string;
  Overall: number;
  Overall_rank: number;
  Overall_level: number;
  Overall_ehp: number;
  Attack: number;
  Attack_rank: number;
  Attack_level: number;
  Attack_ehp: number;
  Defence: number;
  Defence_rank: number;
  Defence_level: number;
  Defence_ehp: number;
  Strength: number;
  Strength_rank: number;
  Strength_level: number;
  Strength_ehp: number;
  Hitpoints: number;
  Hitpoints_rank: number;
  Hitpoints_level: number;
  Hitpoints_ehp: number;
  Ranged: number;
  Ranged_rank: number;
  Ranged_level: number;
  Ranged_ehp: number;
  Prayer: number;
  Prayer_rank: number;
  Prayer_level: number;
  Prayer_ehp: number;
  Magic: number;
  Magic_rank: number;
  Magic_level: number;
  Magic_ehp: number;
  Cooking: number;
  Cooking_rank: number;
  Cooking_level: number;
  Cooking_ehp: number;
  Woodcutting: number;
  Woodcutting_rank: number;
  Woodcutting_level: number;
  Woodcutting_ehp: number;
  Fletching: number;
  Fletching_rank: number;
  Fletching_level: number;
  Fletching_ehp: number;
  Fishing: number;
  Fishing_rank: number;
  Fishing_level: number;
  Fishing_ehp: number;
  Firemaking: number;
  Firemaking_rank: number;
  Firemaking_level: number;
  Firemaking_ehp: number;
  Crafting: number;
  Crafting_rank: number;
  Crafting_level: number;
  Crafting_ehp: number;
  Smithing: number;
  Smithing_rank: number;
  Smithing_level: number;
  Smithing_ehp: number;
  Mining: number;
  Mining_rank: number;
  Mining_level: number;
  Mining_ehp: number;
  Herblore: number;
  Herblore_rank: number;
  Herblore_level: number;
  Herblore_ehp: number;
  Agility: number;
  Agility_rank: number;
  Agility_level: number;
  Agility_ehp: number;
  Thieving: number;
  Thieving_rank: number;
  Thieving_level: number;
  Thieving_ehp: number;
  Slayer: number;
  Slayer_rank: number;
  Slayer_level: number;
  Slayer_ehp: number;
  Farming: number;
  Farming_rank: number;
  Farming_level: number;
  Farming_ehp: number;
  Runecraft: number;
  Runecraft_rank: number;
  Runecraft_level: number;
  Runecraft_ehp: number;
  Hunter: number;
  Hunter_rank: number;
  Hunter_level: number;
  Hunter_ehp: number;
  Construction: number;
  Construction_rank: number;
  Construction_level: number;
  Construction_ehp: number;
  Ehp: number;
  Ehp_rank: number;
  Im_ehp: number;
  Lvl3_ehp: number;
  F2p_ehp: number;
  Uim_ehp: number;
  Gim_ehp: number;
  Clue_all: number;
  Clue_beginner: number;
  Clue_easy: number;
  Clue_medium: number;
  Clue_hard: number;
  Clue_elite: number;
  Clue_master: number;
  LMS: number;
  'Abyssal Sire': number;
  'Abyssal Sire_ehb': number;
  'Alchemical Hydra': number;
  'Alchemical Hydra_ehb': number;
  'Barrows Chests': number;
  Bryophyta: number;
  Callisto: number;
  Callisto_ehb: number;
  Cerberus: number;
  Cerberus_ehb: number;
  'Chambers of Xeric': number;
  'Chambers of Xeric_ehb': number;
  'Chambers of Xeric Challenge Mode': number;
  'Chambers of Xeric Challenge Mode_ehb': number;
  'Chaos Elemental': number;
  'Chaos Elemental_ehb': number;
  'Chaos Fanatic': number;
  'Chaos Fanatic_ehb': number;
  'Commander Zilyana': number;
  'Commander Zilyana_ehb': number;
  'Corporeal Beast': number;
  'Corporeal Beast_ehb': number;
  'Crazy Archaeologist': number;
  'Dagannoth Prime': number;
  'Dagannoth Prime_ehb': number;
  'Dagannoth Rex': number;
  'Dagannoth Rex_ehb': number;
  'Dagannoth Supreme': number;
  'Dagannoth Supreme_ehb': number;
  'Deranged Archaeologist': number;
  'General Graardor': number;
  'General Graardor_ehb': number;
  'Giant Mole': number;
  'Giant Mole_ehb': number;
  'Grotesque Guardians': number;
  'Grotesque Guardians_ehb': number;
  Hespori: number;
  'Kalphite Queen': number;
  'Kalphite Queen_ehb': number;
  'King Black Dragon': number;
  'King Black Dragon_ehb': number;
  Kraken: number;
  Kraken_ehb: number;
  KreeArra: number;
  KreeArra_ehb: number;
  'Kril Tsutsaroth': number;
  'Kril Tsutsaroth_ehb': number;
  Mimic: number;
  Obor: number;
  Sarachnis: number;
  Sarachnis_ehb: number;
  Scorpia: number;
  Scorpia_ehb: number;
  Skotizo: number;
  Skotizo_ehb: number;
  'The Gauntlet': number;
  'The Gauntlet_ehb': number;
  'The Corrupted Gauntlet': number;
  'The Corrupted Gauntlet_ehb': number;
  'Theatre of Blood': number;
  'Theatre of Blood_ehb': number;
  'Thermonuclear Smoke Devil': number;
  'Thermonuclear Smoke Devil_ehb': number;
  'TzKal-Zuk': number;
  'TzKal-Zuk_ehb': number;
  'TzTok-Jad': number;
  'TzTok-Jad_ehb': number;
  Venenatis: number;
  Venenatis_ehb: number;
  Vetion: number;
  Vetion_ehb: number;
  Vorkath: number;
  Vorkath_ehb: number;
  Wintertodt: number;
  Zalcano: number;
  Zulrah: number;
  Zulrah_ehb: number;
  'The Nightmare': number;
  'The Nightmare_ehb': number;
  'Soul Wars Zeal': number;
  Tempoross: number;
  'Theatre of Blood Challenge Mode': number;
  'Theatre of Blood Challenge Mode_ehb': number;
  'Bounty Hunter Hunter': number;
  'Bounty Hunter Rogue': number;
  'Phosanis Nightmare': number;
  'Phosanis Nightmare_ehb': number;
  Nex: number;
  Nex_ehb: number;
  Rift: number;
  'PvP Arena': number;
  'Tombs of Amascut': number;
  'Tombs of Amascut_ehb': number;
  'Tombs of Amascut Expert': number;
  'Tombs of Amascut Expert_ehb': number;
  'Phantom Muspah': number;
  'Phantom Muspah_ehb': number;
  Artio: number;
  Artio_ehb: number;
  Calvarion: number;
  Calvarion_ehb: number;
  Spindel: number;
  Spindel_ehb: number;
  'Duke Sucellus': number;
  'Duke Sucellus_ehb': number;
  'The Leviathan': number;
  'The Leviathan_ehb': number;
  'The Whisperer': number;
  'The Whisperer_ehb': number;
  Vardorvis: number;
  Vardorvis_ehb: number;
  Scurrius: number;
  Scurrius_ehb: number;
  'Colosseum Glory': number;
  'Lunar Chests': number;
  'Lunar Chests_ehb': number;
  'Sol Heredit': number;
  'Sol Heredit_ehb': number;
  Araxxor: number;
  Araxxor_ehb: number;
  Hueycoatl: number;
  Hueycoatl_ehb: number;
  Amoxliatl: number;
  Amoxliatl_ehb: number;
  Ehb: number;
  Im_ehb: number;
}

export interface PlayerStatsResponse {
  data: PlayerStats;
}

export interface PlayerStatsError {
  error: {
    Code: number;
    Message: string;
  };
}
