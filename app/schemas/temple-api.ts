import { mapKeys } from 'lodash';
import { z } from 'zod';

export function normalisePlayerName(player: string) {
  return player.replaceAll(/(-|_)/g, ' ').toLowerCase();
}

export const GameMode = z.nativeEnum({
  GroupIronman: 0,
  Ironman: 1,
  UltimateIronman: 2,
  HardcoreIronman: 3,
});

const BooleanNumber = z.union([z.literal(0), z.literal(1)]);

export const TempleOSRSGroupMemberInfo = z.object({
  data: z.object({
    memberlist: z
      .record(
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
      )
      .transform((record) =>
        mapKeys(record, (_, key) => normalisePlayerName(key)),
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
    Collections: z.number().nonnegative(),
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

export const TempleOSRSCollectionLogCategory = z.enum([
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
  'zalcano',
  'zulrah',
  'beginner_treasure_trails',
  'easy_treasure_trails',
  'medium_treasure_trails',
  'hard_treasure_trails',
  'elite_treasure_trails',
  'master_treasure_trails',
  'hard_treasure_trails_rare',
  'elite_treasure_trails_rare',
  'master_treasure_trails_rare',
  'shared_treasure_trail_rewards',
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
  'chambers_of_xeric',
  'theatre_of_blood',
  'tombs_of_amascut',
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
