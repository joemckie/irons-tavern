import {
  PlayerStatsError,
  TempleOSRSPlayerStats,
} from '@/app/schemas/temple-api';

export const emptyResponseFixture = {
  error: {
    Code: 402,
    Message: 'User not found in database',
  },
} satisfies PlayerStatsError;

export const earlyGamePlayerFixture = {
  data: {
    info: {
      Username: 'Riftletics',
      Country: '-',
      'Game mode': 1,
      GIM: 0,
      'Cb-3': 0,
      F2p: 0,
      Banned: 0,
      Disqualified: 0,
      'Clan preference': null,
      'Last checked': '2024-10-24 06:19:42',
      'Last checked unix': 1729750782,
    },
    date: '2024-10-24 06:19:42',
    Overall: 44366276,
    Overall_rank: 161840,
    Overall_level: 1588,
    Overall_ehp: 366.7889210878861,
    Attack: 471632,
    Attack_rank: 214452,
    Attack_level: 65,
    Attack_ehp: 0,
    Defence: 653158,
    Defence_rank: 195729,
    Defence_level: 68,
    Defence_ehp: 0,
    Strength: 811379,
    Strength_rank: 212492,
    Strength_level: 70,
    Strength_ehp: 0.2175999649999539,
    Hitpoints: 1047652,
    Hitpoints_rank: 198665,
    Hitpoints_level: 73,
    Hitpoints_ehp: 0.00523826,
    Ranged: 372743,
    Ranged_rank: 230856,
    Ranged_level: 63,
    Ranged_ehp: 12.26969581542145,
    Prayer: 300123,
    Prayer_rank: 159538,
    Prayer_level: 60,
    Prayer_ehp: 1.7091287015945331,
    Magic: 1511697,
    Magic_rank: 158927,
    Magic_level: 77,
    Magic_ehp: 0.007558485,
    Cooking: 417180,
    Cooking_rank: 254698,
    Cooking_level: 64,
    Cooking_ehp: 1.5390974977706908,
    Woodcutting: 943146,
    Woodcutting_rank: 181416,
    Woodcutting_level: 72,
    Woodcutting_ehp: 5.858659785695254,
    Fletching: 318370,
    Fletching_rank: 252823,
    Fletching_level: 61,
    Fletching_ehp: 0.20793547122983477,
    Fishing: 342362,
    Fishing_rank: 311464,
    Fishing_level: 62,
    Fishing_ehp: 10.83638511904762,
    Firemaking: 13093683,
    Firemaking_rank: 68336,
    Firemaking_level: 99,
    Firemaking_ehp: 41.560317785515714,
    Crafting: 1836662,
    Crafting_rank: 117629,
    Crafting_level: 79,
    Crafting_ehp: 11.000851223021582,
    Smithing: 532316,
    Smithing_rank: 158161,
    Smithing_level: 66,
    Smithing_ehp: 4.581062148962149,
    Mining: 2245960,
    Mining_rank: 107981,
    Mining_level: 81,
    Mining_ehp: 74.44782533081396,
    Herblore: 161310,
    Herblore_rank: 192065,
    Herblore_level: 54,
    Herblore_ehp: 2.2978632478632477,
    Agility: 435538,
    Agility_rank: 260705,
    Agility_level: 64,
    Agility_ehp: 6.275763688760807,
    Thieving: 467937,
    Thieving_rank: 192078,
    Thieving_level: 65,
    Thieving_ehp: 4.575097565650623,
    Slayer: 123052,
    Slayer_rank: 222607,
    Slayer_level: 51,
    Slayer_ehp: 20.049625597583752,
    Farming: 124791,
    Farming_rank: 215074,
    Farming_level: 52,
    Farming_ehp: 0.249582,
    Runecraft: 14920028,
    Runecraft_rank: 3051,
    Runecraft_level: 99,
    Runecraft_ehp: 154.42205346108943,
    Hunter: 249768,
    Hunter_rank: 224481,
    Hunter_level: 59,
    Hunter_ehp: 1.4936366045321638,
    Construction: 2985789,
    Construction_rank: 44455,
    Construction_level: 84,
    Construction_ehp: 13.183943333333334,
    Ehp: 160.9449,
    Ehp_rank: 100000,
    Im_ehp: 367.7889,
    Lvl3_ehp: 0,
    F2p_ehp: 0,
    Uim_ehp: 0,
    Gim_ehp: 0,
    Clue_all: 3,
    Clue_beginner: 2,
    Clue_easy: 1,
    Clue_medium: 0,
    Clue_hard: 0,
    Clue_elite: 0,
    Clue_master: 0,
    LMS: 552,
    'Abyssal Sire': 0,
    'Abyssal Sire_ehb': 0,
    'Alchemical Hydra': 0,
    'Alchemical Hydra_ehb': 0,
    'Barrows Chests': 0,
    Bryophyta: 0,
    Callisto: 8,
    Callisto_ehb: 0.09411764705882353,
    Cerberus: 0,
    Cerberus_ehb: 0,
    'Chambers of Xeric': 0,
    'Chambers of Xeric_ehb': 0,
    'Chambers of Xeric Challenge Mode': 0,
    'Chambers of Xeric Challenge Mode_ehb': 0,
    'Chaos Elemental': 0,
    'Chaos Elemental_ehb': 0,
    'Chaos Fanatic': 0,
    'Chaos Fanatic_ehb': 0,
    'Commander Zilyana': 0,
    'Commander Zilyana_ehb': 0,
    'Corporeal Beast': 0,
    'Corporeal Beast_ehb': 0,
    'Crazy Archaeologist': 48,
    'Dagannoth Prime': 0,
    'Dagannoth Prime_ehb': 0,
    'Dagannoth Rex': 0,
    'Dagannoth Rex_ehb': 0,
    'Dagannoth Supreme': 0,
    'Dagannoth Supreme_ehb': 0,
    'Deranged Archaeologist': 0,
    'General Graardor': 0,
    'General Graardor_ehb': 0,
    'Giant Mole': 0,
    'Giant Mole_ehb': 0,
    'Grotesque Guardians': 0,
    'Grotesque Guardians_ehb': 0,
    Hespori: 0,
    'Kalphite Queen': 0,
    'Kalphite Queen_ehb': 0,
    'King Black Dragon': 0,
    'King Black Dragon_ehb': 0,
    Kraken: 0,
    Kraken_ehb: 0,
    KreeArra: 0,
    KreeArra_ehb: 0,
    'Kril Tsutsaroth': 0,
    'Kril Tsutsaroth_ehb': 0,
    Mimic: 0,
    Obor: 0,
    Sarachnis: 0,
    Sarachnis_ehb: 0,
    Scorpia: 0,
    Scorpia_ehb: 0,
    Skotizo: 0,
    Skotizo_ehb: 0,
    'The Gauntlet': 0,
    'The Gauntlet_ehb': 0,
    'The Corrupted Gauntlet': 0,
    'The Corrupted Gauntlet_ehb': 0,
    'Theatre of Blood': 0,
    'Theatre of Blood_ehb': 0,
    'Thermonuclear Smoke Devil': 0,
    'Thermonuclear Smoke Devil_ehb': 0,
    'TzKal-Zuk': 0,
    'TzKal-Zuk_ehb': 0,
    'TzTok-Jad': 0,
    'TzTok-Jad_ehb': 0,
    Venenatis: 0,
    Venenatis_ehb: 0,
    Vetion: 0,
    Vetion_ehb: 0,
    Vorkath: 0,
    Vorkath_ehb: 0,
    Wintertodt: 457,
    Zalcano: 0,
    Zulrah: 0,
    Zulrah_ehb: 0,
    'The Nightmare': 0,
    'The Nightmare_ehb': 0,
    'Soul Wars Zeal': 215,
    Tempoross: 64,
    'Theatre of Blood Challenge Mode': 0,
    'Theatre of Blood Challenge Mode_ehb': 0,
    'Bounty Hunter Hunter': 0,
    'Bounty Hunter Rogue': 0,
    'Phosanis Nightmare': 0,
    'Phosanis Nightmare_ehb': 0,
    Nex: 0,
    Nex_ehb: 0,
    Rift: 1422,
    'PvP Arena': 0,
    'Tombs of Amascut': 0,
    'Tombs of Amascut_ehb': 0,
    'Tombs of Amascut Expert': 0,
    'Tombs of Amascut Expert_ehb': 0,
    'Phantom Muspah': 0,
    'Phantom Muspah_ehb': 0,
    Artio: 0,
    Artio_ehb: 0,
    Calvarion: 0,
    Calvarion_ehb: 0,
    Spindel: 0,
    Spindel_ehb: 0,
    'Duke Sucellus': 0,
    'Duke Sucellus_ehb': 0,
    'The Leviathan': 0,
    'The Leviathan_ehb': 0,
    'The Whisperer': 0,
    'The Whisperer_ehb': 0,
    Vardorvis: 0,
    Vardorvis_ehb: 0,
    Scurrius: 17,
    Scurrius_ehb: 0.2,
    'Colosseum Glory': 0,
    'Lunar Chests': 0,
    'Lunar Chests_ehb': 0,
    'Sol Heredit': 0,
    'Sol Heredit_ehb': 0,
    Araxxor: 0,
    Araxxor_ehb: 0,
    Hueycoatl: 0,
    Hueycoatl_ehb: 0,
    Amoxliatl: 0,
    Amoxliatl_ehb: 0,
    Ehb: 0.2941,
    Im_ehb: 1.0174,
    Collections: 119,
  },
} as TempleOSRSPlayerStats;

export const midGamePlayerFixture = {
  data: {
    info: {
      Username: 'Cousinofkos',
      Country: '-',
      'Game mode': 1,
      GIM: 0,
      'Cb-3': 0,
      F2p: 0,
      Banned: 0,
      Disqualified: 0,
      'Clan preference': null,
      'Last checked': '2024-10-19 22:39:40',
      'Last checked unix': 1729377580,
    },
    date: '2024-10-19 22:39:40',
    Overall: 327614070,
    Overall_rank: 23996,
    Overall_level: 2174,
    Overall_ehp: 1143.9361952723714,
    Attack: 14969430,
    Attack_rank: 25394,
    Attack_level: 99,
    Attack_ehp: 80.3081008583691,
    Defence: 13875225,
    Defence_rank: 27070,
    Defence_level: 99,
    Defence_ehp: 18.078469055374594,
    Strength: 27216611,
    Strength_rank: 15461,
    Strength_level: 99,
    Strength_ehp: 0.2175999649999539,
    Hitpoints: 44695731,
    Hitpoints_rank: 13976,
    Hitpoints_level: 99,
    Hitpoints_ehp: 0.223478655,
    Ranged: 47874938,
    Ranged_rank: 11940,
    Ranged_level: 99,
    Ranged_ehp: 45.888616856816775,
    Prayer: 13149262,
    Prayer_rank: 8709,
    Prayer_level: 99,
    Prayer_ehp: 74.8819020501139,
    Magic: 24944721,
    Magic_rank: 13241,
    Magic_level: 99,
    Magic_ehp: 0.124723605,
    Cooking: 6160576,
    Cooking_rank: 60139,
    Cooking_level: 91,
    Cooking_ehp: 16.369033986158684,
    Woodcutting: 4013315,
    Woodcutting_rank: 65056,
    Woodcutting_level: 87,
    Woodcutting_ehp: 23.123598795469846,
    Fletching: 6319650,
    Fletching_rank: 35202,
    Fletching_level: 91,
    Fletching_ehp: 4.127522696100843,
    Fishing: 5917056,
    Fishing_rank: 56405,
    Fishing_level: 91,
    Fishing_ehp: 52.93275055380661,
    Firemaking: 5374381,
    Firemaking_rank: 179373,
    Firemaking_level: 90,
    Firemaking_ehp: 19.92033064692366,
    Crafting: 13298386,
    Crafting_rank: 20988,
    Crafting_level: 99,
    Crafting_ehp: 44.94203075644105,
    Smithing: 4871012,
    Smithing_rank: 33540,
    Smithing_level: 89,
    Smithing_ehp: 18.354700244200245,
    Mining: 6732368,
    Mining_rank: 48154,
    Mining_level: 92,
    Mining_ehp: 131.14027111888353,
    Herblore: 10312182,
    Herblore_rank: 20523,
    Herblore_level: 96,
    Herblore_ehp: 146.8971794871795,
    Agility: 3319677,
    Agility_rank: 50715,
    Agility_level: 85,
    Agility_ehp: 46.63225433689326,
    Thieving: 14132471,
    Thieving_rank: 21594,
    Thieving_level: 99,
    Thieving_ehp: 52.057407772329455,
    Slayer: 22365338,
    Slayer_rank: 6262,
    Slayer_level: 99,
    Slayer_ehp: 221.51441742242105,
    Farming: 16576929,
    Farming_rank: 21324,
    Farming_level: 99,
    Farming_ehp: 11.455679203798937,
    Runecraft: 3610464,
    Runecraft_rank: 37291,
    Runecraft_level: 86,
    Runecraft_ehp: 51.23538340100821,
    Hunter: 4739189,
    Hunter_rank: 46272,
    Hunter_level: 88,
    Hunter_ehp: 28.080451654928854,
    Construction: 13145158,
    Construction_rank: 9607,
    Construction_level: 99,
    Construction_ehp: 55.43029215015322,
    Ehp: 654.693,
    Ehp_rank: 100000,
    Im_ehp: 1143.9361,
    Lvl3_ehp: 0,
    F2p_ehp: 0,
    Uim_ehp: 0,
    Gim_ehp: 0,
    Clue_all: 1701,
    Clue_beginner: 23,
    Clue_easy: 856,
    Clue_medium: 500,
    Clue_hard: 232,
    Clue_elite: 46,
    Clue_master: 44,
    LMS: 0,
    'Abyssal Sire': 390,
    'Abyssal Sire_ehb': 8.666666666666666,
    'Alchemical Hydra': 2724,
    'Alchemical Hydra_ehb': 90.8,
    'Barrows Chests': 894,
    Bryophyta: 33,
    Callisto: 23,
    Callisto_ehb: 0.27058823529411763,
    Cerberus: 108,
    Cerberus_ehb: 1.6615384615384616,
    'Chambers of Xeric': 56,
    'Chambers of Xeric_ehb': 16,
    'Chambers of Xeric Challenge Mode': 0,
    'Chambers of Xeric Challenge Mode_ehb': 0,
    'Chaos Elemental': 25,
    'Chaos Elemental_ehb': 0.20833333333333334,
    'Chaos Fanatic': 25,
    'Chaos Fanatic_ehb': 0.25,
    'Commander Zilyana': 184,
    'Commander Zilyana_ehb': 3.1724137931034484,
    'Corporeal Beast': 0,
    'Corporeal Beast_ehb': 0,
    'Crazy Archaeologist': 191,
    'Dagannoth Prime': 303,
    'Dagannoth Prime_ehb': 2.8857142857142857,
    'Dagannoth Rex': 461,
    'Dagannoth Rex_ehb': 4.390476190476191,
    'Dagannoth Supreme': 297,
    'Dagannoth Supreme_ehb': 2.8285714285714287,
    'Deranged Archaeologist': 25,
    'General Graardor': 236,
    'General Graardor_ehb': 4.068965517241379,
    'Giant Mole': 97,
    'Giant Mole_ehb': 0.776,
    'Grotesque Guardians': 28,
    'Grotesque Guardians_ehb': 0.7567567567567568,
    Hespori: 209,
    'Kalphite Queen': 89,
    'Kalphite Queen_ehb': 1.6181818181818182,
    'King Black Dragon': 37,
    'King Black Dragon_ehb': 0.2846153846153846,
    Kraken: 968,
    Kraken_ehb: 9.68,
    KreeArra: 571,
    KreeArra_ehb: 14.275,
    'Kril Tsutsaroth': 452,
    'Kril Tsutsaroth_ehb': 6.953846153846154,
    Mimic: 1,
    Obor: 7,
    Sarachnis: 25,
    Sarachnis_ehb: 0.3125,
    Scorpia: 61,
    Scorpia_ehb: 0.46923076923076923,
    Skotizo: 36,
    Skotizo_ehb: 0.8,
    'The Gauntlet': 27,
    'The Gauntlet_ehb': 2.7,
    'The Corrupted Gauntlet': 253,
    'The Corrupted Gauntlet_ehb': 36.142857142857146,
    'Theatre of Blood': 0,
    'Theatre of Blood_ehb': 0,
    'Thermonuclear Smoke Devil': 350,
    'Thermonuclear Smoke Devil_ehb': 2.3333333333333335,
    'TzKal-Zuk': 0,
    'TzKal-Zuk_ehb': 0,
    'TzTok-Jad': 0,
    'TzTok-Jad_ehb': 0,
    Venenatis: 369,
    Venenatis_ehb: 9.225,
    Vetion: 35,
    Vetion_ehb: 0.7,
    Vorkath: 57,
    Vorkath_ehb: 1.6764705882352942,
    Wintertodt: 216,
    Zalcano: 211,
    Zulrah: 650,
    Zulrah_ehb: 14.772727272727273,
    'The Nightmare': 6,
    'The Nightmare_ehb': 0.42857142857142855,
    'Soul Wars Zeal': 0,
    Tempoross: 77,
    'Theatre of Blood Challenge Mode': 0,
    'Theatre of Blood Challenge Mode_ehb': 0,
    'Bounty Hunter Hunter': 0,
    'Bounty Hunter Rogue': 0,
    'Phosanis Nightmare': 0,
    'Phosanis Nightmare_ehb': 0,
    Nex: 35,
    Nex_ehb: 2.6923076923076925,
    Rift: 343,
    'PvP Arena': 0,
    'Tombs of Amascut': 105,
    'Tombs of Amascut_ehb': 30,
    'Tombs of Amascut Expert': 129,
    'Tombs of Amascut Expert_ehb': 43,
    'Phantom Muspah': 361,
    'Phantom Muspah_ehb': 13.884615384615385,
    Artio: 406,
    Artio_ehb: 6.766666666666667,
    Calvarion: 2366,
    Calvarion_ehb: 43.018181818181816,
    Spindel: 686,
    Spindel_ehb: 12.472727272727273,
    'Duke Sucellus': 70,
    'Duke Sucellus_ehb': 2.3333333333333335,
    'The Leviathan': 0,
    'The Leviathan_ehb': 0,
    'The Whisperer': 0,
    'The Whisperer_ehb': 0,
    Vardorvis: 110,
    Vardorvis_ehb: 2.972972972972973,
    Scurrius: 25,
    Scurrius_ehb: 0.29411764705882354,
    'Colosseum Glory': 0,
    'Lunar Chests': 170,
    'Lunar Chests_ehb': 9.444444444444445,
    'Sol Heredit': 0,
    'Sol Heredit_ehb': 0,
    Araxxor: 115,
    Araxxor_ehb: 3.8333333333333335,
    Hueycoatl: 0,
    Hueycoatl_ehb: 0,
    Amoxliatl: 0,
    Amoxliatl_ehb: 0,
    Ehb: 409.821,
    Im_ehb: 524.4315,
    Collections: 701,
  },
} as TempleOSRSPlayerStats;

export const endGamePlayerFixture = {
  data: {
    info: {
      Username: 'Clogging',
      Country: '-',
      'Game mode': 1,
      GIM: 0,
      'Cb-3': 0,
      F2p: 0,
      Banned: 0,
      Disqualified: 0,
      'Clan preference': null,
      'Last checked': '2024-10-23 21:40:34',
      'Last checked unix': 1729719634,
    },
    date: '2024-10-23 21:40:34',
    Overall: 1079606722,
    Overall_rank: 584,
    Overall_level: 2277,
    Overall_ehp: 2776.498844222821,
    Attack: 53573769,
    Attack_rank: 993,
    Attack_level: 99,
    Attack_ehp: 0,
    Defence: 50801288,
    Defence_rank: 588,
    Defence_level: 99,
    Defence_ehp: 0,
    Strength: 155440307,
    Strength_rank: 590,
    Strength_level: 99,
    Strength_ehp: 0.2175999649999539,
    Hitpoints: 165092698,
    Hitpoints_rank: 523,
    Hitpoints_level: 99,
    Hitpoints_ehp: 0.82546349,
    Ranged: 164762400,
    Ranged_rank: 455,
    Ranged_level: 99,
    Ranged_ehp: 120.8020706797995,
    Prayer: 15925607,
    Prayer_rank: 1223,
    Prayer_level: 99,
    Prayer_ehp: 90.69252277904329,
    Magic: 67926484,
    Magic_rank: 754,
    Magic_level: 99,
    Magic_ehp: 0.33963242,
    Cooking: 40216147,
    Cooking_rank: 796,
    Cooking_level: 99,
    Cooking_ehp: 94.29663635287092,
    Woodcutting: 35028652,
    Woodcutting_rank: 1296,
    Woodcutting_level: 99,
    Woodcutting_ehp: 177.8840133258808,
    Fletching: 19978919,
    Fletching_rank: 1142,
    Fletching_level: 99,
    Fletching_ehp: 13.04873554960486,
    Fishing: 23560217,
    Fishing_rank: 1319,
    Fishing_level: 99,
    Fishing_ehp: 156.68175573930736,
    Firemaking: 16363218,
    Firemaking_rank: 11841,
    Firemaking_level: 99,
    Firemaking_ehp: 49.34677884767337,
    Crafting: 21343601,
    Crafting_rank: 1048,
    Crafting_level: 99,
    Crafting_ehp: 83.27083018474023,
    Smithing: 20574158,
    Smithing_rank: 389,
    Smithing_level: 99,
    Smithing_ehp: 67.11797369297369,
    Mining: 19290978,
    Mining_rank: 2162,
    Mining_level: 99,
    Mining_ehp: 242.80017258590138,
    Herblore: 29951341,
    Herblore_rank: 730,
    Herblore_level: 99,
    Herblore_ehp: 419.9818879576359,
    Agility: 16551967,
    Agility_rank: 1329,
    Agility_level: 99,
    Agility_ehp: 194.85608734888592,
    Thieving: 28090489,
    Thieving_rank: 2037,
    Thieving_level: 99,
    Thieving_ehp: 89.12065259442186,
    Slayer: 39309726,
    Slayer_rank: 1052,
    Slayer_level: 99,
    Slayer_ehp: 581.8482084113273,
    Farming: 33528610,
    Farming_rank: 3490,
    Farming_level: 99,
    Farming_ehp: 16.04602310696447,
    Runecraft: 17482767,
    Runecraft_rank: 1504,
    Runecraft_level: 99,
    Runecraft_ehp: 186.4162981552218,
    Hunter: 28088264,
    Hunter_rank: 1299,
    Hunter_level: 99,
    Hunter_ehp: 123.28604647479209,
    Construction: 16725115,
    Construction_rank: 536,
    Construction_level: 99,
    Construction_ehp: 67.61945456077632,
    Ehp: 1705.3543,
    Ehp_rank: 5259,
    Im_ehp: 2776.4988,
    Lvl3_ehp: 0,
    F2p_ehp: 0,
    Uim_ehp: 0,
    Gim_ehp: 0,
    Clue_all: 4781,
    Clue_beginner: 291,
    Clue_easy: 1413,
    Clue_medium: 903,
    Clue_hard: 1201,
    Clue_elite: 379,
    Clue_master: 594,
    LMS: 2809,
    'Abyssal Sire': 562,
    'Abyssal Sire_ehb': 12.488888888888889,
    'Alchemical Hydra': 1642,
    'Alchemical Hydra_ehb': 54.733333333333334,
    'Barrows Chests': 1242,
    Bryophyta: 428,
    Callisto: 579,
    Callisto_ehb: 6.811764705882353,
    Cerberus: 810,
    Cerberus_ehb: 12.461538461538462,
    'Chambers of Xeric': 1234,
    'Chambers of Xeric_ehb': 352.57142857142856,
    'Chambers of Xeric Challenge Mode': 113,
    'Chambers of Xeric Challenge Mode_ehb': 37.666666666666664,
    'Chaos Elemental': 251,
    'Chaos Elemental_ehb': 2.091666666666667,
    'Chaos Fanatic': 187,
    'Chaos Fanatic_ehb': 1.87,
    'Commander Zilyana': 1342,
    'Commander Zilyana_ehb': 23.137931034482758,
    'Corporeal Beast': 1404,
    'Corporeal Beast_ehb': 23.4,
    'Crazy Archaeologist': 496,
    'Dagannoth Prime': 804,
    'Dagannoth Prime_ehb': 7.6571428571428575,
    'Dagannoth Rex': 731,
    'Dagannoth Rex_ehb': 6.961904761904762,
    'Dagannoth Supreme': 810,
    'Dagannoth Supreme_ehb': 7.714285714285714,
    'Deranged Archaeologist': 53,
    'General Graardor': 1320,
    'General Graardor_ehb': 22.75862068965517,
    'Giant Mole': 852,
    'Giant Mole_ehb': 6.816,
    'Grotesque Guardians': 1309,
    'Grotesque Guardians_ehb': 35.37837837837838,
    Hespori: 122,
    'Kalphite Queen': 351,
    'Kalphite Queen_ehb': 6.381818181818182,
    'King Black Dragon': 1085,
    'King Black Dragon_ehb': 8.346153846153847,
    Kraken: 2600,
    Kraken_ehb: 26,
    KreeArra: 1141,
    KreeArra_ehb: 28.525,
    'Kril Tsutsaroth': 958,
    'Kril Tsutsaroth_ehb': 14.738461538461538,
    Mimic: 53,
    Obor: 98,
    Sarachnis: 1069,
    Sarachnis_ehb: 13.3625,
    Scorpia: 646,
    Scorpia_ehb: 4.969230769230769,
    Skotizo: 117,
    Skotizo_ehb: 2.6,
    'The Gauntlet': 50,
    'The Gauntlet_ehb': 5,
    'The Corrupted Gauntlet': 461,
    'The Corrupted Gauntlet_ehb': 65.85714285714286,
    'Theatre of Blood': 953,
    'Theatre of Blood_ehb': 297.8125,
    'Thermonuclear Smoke Devil': 713,
    'Thermonuclear Smoke Devil_ehb': 4.753333333333333,
    'TzKal-Zuk': 7,
    'TzKal-Zuk_ehb': 7,
    'TzTok-Jad': 21,
    'TzTok-Jad_ehb': 8.4,
    Venenatis: 493,
    Venenatis_ehb: 12.325,
    Vetion: 1346,
    Vetion_ehb: 26.92,
    Vorkath: 667,
    Vorkath_ehb: 19.61764705882353,
    Wintertodt: 524,
    Zalcano: 446,
    Zulrah: 2810,
    Zulrah_ehb: 63.86363636363637,
    'The Nightmare': 118,
    'The Nightmare_ehb': 8.428571428571429,
    'Soul Wars Zeal': 0,
    Tempoross: 191,
    'Theatre of Blood Challenge Mode': 332,
    'Theatre of Blood Challenge Mode_ehb': 110.66666666666667,
    'Bounty Hunter Hunter': 0,
    'Bounty Hunter Rogue': 0,
    'Phosanis Nightmare': 238,
    'Phosanis Nightmare_ehb': 34,
    Nex: 2284,
    Nex_ehb: 175.69230769230768,
    Rift: 187,
    'PvP Arena': 0,
    'Tombs of Amascut': 166,
    'Tombs of Amascut_ehb': 47.42857142857143,
    'Tombs of Amascut Expert': 465,
    'Tombs of Amascut Expert_ehb': 155,
    'Phantom Muspah': 564,
    'Phantom Muspah_ehb': 21.692307692307693,
    Artio: 145,
    Artio_ehb: 2.4166666666666665,
    Calvarion: 295,
    Calvarion_ehb: 5.363636363636363,
    Spindel: 784,
    Spindel_ehb: 14.254545454545454,
    'Duke Sucellus': 1547,
    'Duke Sucellus_ehb': 51.56666666666667,
    'The Leviathan': 932,
    'The Leviathan_ehb': 31.066666666666666,
    'The Whisperer': 979,
    'The Whisperer_ehb': 46.61904761904762,
    Vardorvis: 1243,
    Vardorvis_ehb: 33.5945945945946,
    Scurrius: 210,
    Scurrius_ehb: 2.4705882352941178,
    'Colosseum Glory': 45018,
    'Lunar Chests': 271,
    'Lunar Chests_ehb': 15.055555555555555,
    'Sol Heredit': 25,
    'Sol Heredit_ehb': 10,
    Araxxor: 1546,
    Araxxor_ehb: 51.53333333333333,
    Hueycoatl: 130,
    Hueycoatl_ehb: 5.2,
    Amoxliatl: 79,
    Amoxliatl_ehb: 1.7555555555555555,
    Ehb: 2054.7972,
    Im_ehb: 2602.2528,
    Collections: 1312,
  },
} as TempleOSRSPlayerStats;
