import { z } from 'zod';

const MemberInfo = z.object({
  player: z.string(),
  game_mode: z.number().int(),
  on_hiscores: z.union([z.literal(1), z.literal(0)]),
  last_checked: z.string(),
  last_changed_xp: z.string(),
  last_changed_xp_unix_time: z.number().int(),
});

type MemberInfo = z.infer<typeof MemberInfo>;

interface PlayerInfo {
  'Game mode': 0 | 1 | 2 | 3;
  'Datapoint Cooldown': '-' | number;
}

export interface PlayerInfoResponse {
  data: PlayerInfo;
}

export const GroupMemberInfoResponse = z.object({
  data: z.object({
    memberlist: z.preprocess(
      (memberList) => {
        if (
          typeof memberList === 'object' &&
          memberList !== null &&
          '' in memberList
        ) {
          delete memberList[''];
        }

        return memberList;
      },
      z.record(z.string(), MemberInfo),
    ),
  }),
});

export type GroupMemberInfoResponse = z.infer<typeof GroupMemberInfoResponse>;

export interface GroupUpdateRequest {
  clan: '3';
  'clan-checkbox': 'on';
  'private-group-checkbox'?: 'on';
  name: string;
  members: string;
  leaders: string;
  id: string;
  key: string;
}

export const GameMode = {
  GroupIronman: 0,
  Ironman: 1,
  UltimateIronman: 2,
  HardcoreIronman: 3,
} as const;

export const TempleOSRSPlayerStats = z.object({
  data: z.object({
    info: z.object({
      Username: z.string(),
      'Game mode': z.nativeEnum(GameMode),
      Primary_ehb: z.enum(['Ehb', 'Im_ehb', 'Uim_ehb']),
      Primary_ehp: z.enum(['Ehp', 'Im_ehp', 'Uim_ehp']),
    }),
    Overall_level: z.number().nonnegative(),
    Ehb: z.number().nonnegative(),
    Ehp: z.number().nonnegative(),
    Im_ehb: z.number().nonnegative(),
    Im_ehp: z.number().nonnegative(),
    Uim_ehb: z.number().nonnegative(),
    Uim_ehp: z.number().nonnegative(),
    Collections: z.number().nonnegative(),
    'TzKal-Zuk': z.number().nonnegative(),
  }),
});

export type TempleOSRSPlayerStats = z.infer<typeof TempleOSRSPlayerStats>;

export interface PlayerStatsError {
  error: {
    Code: number;
    Message: string;
  };
}

const TempleOSRSCollectionLogItem = z.object({
  count: z.number().nonnegative(),
  id: z.number().nonnegative(),
  name: z.string().min(1),
});

export const TempleOSRSPlayerCollectionLog = z.object({
  data: z.object({
    total_collections_available: z.number().nonnegative(),
    total_collections_finished: z.number().nonnegative(),
    items: z.array(TempleOSRSCollectionLogItem),
  }),
});

export type TempleOSRSPlayerCollectionLog = z.infer<
  typeof TempleOSRSPlayerCollectionLog
>;

/**
 * Categories available from the TempleOSRS API.
 *
 * https://templeosrs.com/api/collection-log/category_parameters.php
 */
export const TempleOSRSCollectionLogCategory = z.enum([
  'all',
  'bosses',
  'raids',
  'clues',
  'minigames',
  'other',
  'abyssal_sire',
  'alchemical_hydra',
  'amoxliatl',
  'araxxor',
  'barrows_chests',
  'bryophyta',
  'callisto_and_artio',
  'cerberus',
  'chaos_elemental',
  'chaos_fanatic',
  'commander_zilyana',
  'corporeal_beast',
  'crazy_archaeologist',
  'dagannoth_kings',
  'deranged_archaeologist',
  'doom_of_mokhaiotl',
  'duke_sucellus',
  'the_fight_caves',
  'fortis_colosseum',
  'the_gauntlet',
  'general_graardor',
  'giant_mole',
  'grotesque_guardians',
  'hespori',
  'hueycoatl',
  'the_inferno',
  'kalphite_queen',
  'king_black_dragon',
  'kraken',
  'kree_arra',
  'kril_tsutsaroth',
  'the_leviathan',
  'moons_of_peril',
  'nex',
  'the_nightmare',
  'obor',
  'phantom_muspah',
  'royal_titans',
  'sarachnis',
  'scorpia',
  'scurrius',
  'skotizo',
  'tempoross',
  'thermonuclear_smoke_devil',
  'vardorvis',
  'venenatis_and_spindel',
  'vetion_and_calvarion',
  'vorkath',
  'the_whisperer',
  'wintertodt',
  'yama',
  'zalcano',
  'zulrah',
  'chambers_of_xeric',
  'theatre_of_blood',
  'tombs_of_amascut',
  'beginner_treasure_trails',
  'easy_treasure_trails',
  'medium_treasure_trails',
  'hard_treasure_trails',
  'elite_treasure_trails',
  'master_treasure_trails',
  'gilded',
  'third_age',
  'mimic',
  'shared_treasure_trail_rewards',
  'scroll_cases',
  'barbarian_assault',
  'brimhaven_agility_arena',
  'castle_wars',
  'fishing_trawler',
  'giants_foundry',
  'gnome_restaurant',
  'guardians_of_the_rift',
  'hallowed_sepulchre',
  'last_man_standing',
  'magic_training_arena',
  'mahogany_homes',
  'pest_control',
  'mastering_mixology',
  'rogues_den',
  'shades_of_mortton',
  'soul_wars',
  'temple_trekking',
  'tithe_farm',
  'trouble_brewing',
  'vale_totems',
  'volcanic_mine',
  'aerial_fishing',
  'all_pets',
  'camdozaal',
  'champions_challenge',
  'chaos_druids',
  'chompy_bird_hunting',
  'colossal_wyrm_agility',
  'creature_creation',
  'cyclopes',
  'forestry',
  'fossil_island_notes',
  'gloughs_experiments',
  'hunter_guild',
  'monkey_backpacks',
  'motherlode_mine',
  'my_notes',
  'random_events',
  'revenants',
  'rooftop_agility',
  'shayzien_armour',
  'shooting_stars',
  'skilling_pets',
  'slayer',
  'tormented_demons',
  'tzhaar',
  'miscellaneous',
]);

export type TempleOSRSCollectionLogCategory = z.infer<
  typeof TempleOSRSCollectionLogCategory
>;

export const TempleOSRSConstants = z.object({
  data: z.object({
    MAX_COLLECTION_LOGS: z.number().nonnegative(),
  }),
});

export type TempleOSRSConstants = z.infer<typeof TempleOSRSConstants>;
