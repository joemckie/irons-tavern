import { formatWikiImageUrl } from '@/app/rank-calculator/utils/format-wiki-url';
import { stripEntityName } from '@/app/rank-calculator/utils/strip-entity-name';
import {
  BaseItem,
  CollectionLogItem,
  CombatAchievementItem,
  CustomItem,
  Item,
  ItemCategoryMap,
  QuestItem,
  RequiredItem,
} from '@/app/schemas/items';
import {
  CollectionLogItemName,
  maximumTotalLevel,
  Quest,
} from '@/app/schemas/osrs';
import { TempleOSRSCollectionLogCategory } from '@/app/schemas/temple-api';
import { isHolidayTrack } from '@/app/schemas/wiki';

type SingleItemOptions = Omit<
  OptionalKeys<CollectionLogItem, 'image'>,
  'requiredItems' | 'collectionLogCategories'
> & {
  clogName?: string;
  requiredAmount?: number;
  collectionLogCategory: TempleOSRSCollectionLogCategory;
};

function singleItem({
  name,
  points,
  clogName,
  image = formatWikiImageUrl(clogName ?? name),
  requiredAmount = 1,
  isAutomatic,
  collectionLogCategory,
}: SingleItemOptions) {
  return CollectionLogItem.parse({
    image,
    name,
    points,
    requiredItems: [
      {
        amount: requiredAmount,
        clogName: clogName ?? name,
      },
    ],
    isAutomatic,
    collectionLogCategories: [collectionLogCategory],
  });
}

type CompoundItemOptions = Omit<
  OptionalKeys<CollectionLogItem, 'image'>,
  'requiredItems'
> & {
  requiredItems: NonEmptyArray<
    CollectionLogItemName | [CollectionLogItemName, number]
  >;
};

function compoundItem({
  name,
  image = formatWikiImageUrl(name),
  points,
  requiredItems,
  requiredLevels,
  isAutomatic,
  collectionLogCategories,
}: CompoundItemOptions) {
  return CollectionLogItem.parse({
    image,
    name,
    points,
    requiredItems: requiredItems.map<RequiredItem>((item) => {
      if (Array.isArray(item)) {
        const [clogName, amount] = item;

        return {
          amount,
          clogName,
        };
      }

      return {
        amount: 1,
        clogName: item,
      };
    }),
    requiredLevels,
    isAutomatic,
    collectionLogCategories,
  });
}

function combatAchievementItem({
  name,
  image = formatWikiImageUrl(name),
  points,
  requiredCombatAchievements,
  isAutomatic,
}: OptionalKeys<CombatAchievementItem, 'image'>) {
  return CombatAchievementItem.parse({
    image,
    name,
    points,
    requiredCombatAchievements,
    isAutomatic,
  });
}

function questItem({
  name,
  image = formatWikiImageUrl(name),
  points,
  requiredQuests,
  isAutomatic,
}: OptionalKeys<QuestItem, 'image'>) {
  return QuestItem.parse({
    image,
    name,
    points,
    requiredQuests,
    isAutomatic,
  });
}

function manualItem({
  name,
  image = formatWikiImageUrl(name),
  points,
  isAutomatic,
}: OptionalKeys<BaseItem, 'image'>) {
  return BaseItem.parse({
    image,
    name,
    points,
    isAutomatic,
  });
}

function customItem({
  isAcquired,
  name,
  image = formatWikiImageUrl(name),
  points,
  isAutomatic,
}: OptionalKeys<CustomItem, 'image'>) {
  return CustomItem.parse({
    image,
    isAcquired,
    name,
    points,
    isAutomatic,
  });
}

export const itemList: ItemCategoryMap = {
  'Automatic Items': {
    image: formatWikiImageUrl('Black cog detail', 'category'),
    items: [
      customItem({
        name: 'Achievement Diary Cape',
        points: 1000,
        image: formatWikiImageUrl('Achievement diary cape (t) detail'),
        isAcquired({ achievementDiaries }) {
          return achievementDiaries
            ? Object.values(achievementDiaries).every(
                (tier) => tier === 'Elite',
              )
            : false;
        },
        isAutomatic: true,
      }),
      customItem({
        name: 'Max Cape',
        points: 7000,
        image: formatWikiImageUrl('Max cape detail'),
        isAcquired({ totalLevel }) {
          return totalLevel === maximumTotalLevel;
        },
        isAutomatic: true,
      }),
      customItem({
        name: 'Infernal Max Cape',
        points: 2000,
        image: formatWikiImageUrl('Infernal max cape detail'),
        isAcquired({ totalLevel, acquiredItems }) {
          return Boolean(
            totalLevel === maximumTotalLevel &&
              acquiredItems?.[stripEntityName('Infernal cape')],
          );
        },
        isAutomatic: true,
      }),
      customItem({
        name: "Dizana's Max Cape",
        points: 2000,
        image: formatWikiImageUrl("Dizana's max cape detail"),
        isAcquired({ totalLevel, acquiredItems }) {
          return Boolean(
            totalLevel === maximumTotalLevel &&
              acquiredItems?.[stripEntityName("Blessed dizana's quiver")],
          );
        },
        isAutomatic: true,
      }),
    ],
  },
  'Abyssal Sire': {
    image: formatWikiImageUrl('Abyssal orphan (follower)', 'category'),
    items: [
      compoundItem({
        name: 'Abyssal bludgeon',
        points: 60,
        requiredItems: ['Bludgeon axon', 'Bludgeon claw', 'Bludgeon spine'],
        collectionLogCategories: ['abyssal_sire'],
      }),
      singleItem({
        name: 'Abyssal dagger',
        points: 30,
        collectionLogCategory: 'abyssal_sire',
      }),
    ],
  },
  'Alchemical Hydra': {
    image: formatWikiImageUrl('Alchemical Hydra (serpentine)', 'category'),
    items: [
      compoundItem({
        name: 'Brimstone ring',
        points: 30,
        requiredItems: ["Hydra's eye", "Hydra's fang", "Hydra's heart"],
        collectionLogCategories: ['alchemical_hydra'],
      }),
      singleItem({
        name: 'Hydra tail',
        points: 20,
        collectionLogCategory: 'alchemical_hydra',
      }),
      singleItem({
        name: 'Hydra leather',
        points: 60,
        collectionLogCategory: 'alchemical_hydra',
      }),
      singleItem({
        name: "Hydra's claw",
        points: 120,
        collectionLogCategory: 'alchemical_hydra',
      }),
    ],
  },
  Araxxor: {
    items: [
      singleItem({
        name: 'Coagulated venom',
        points: 10,
        collectionLogCategory: 'araxxor',
      }),
      singleItem({
        name: 'Noxious blade',
        points: 30,
        collectionLogCategory: 'araxxor',
      }),
      singleItem({
        name: 'Noxious point',
        points: 30,
        collectionLogCategory: 'araxxor',
      }),
      singleItem({
        name: 'Noxious pommel',
        points: 30,
        collectionLogCategory: 'araxxor',
      }),
      singleItem({
        name: 'Araxyte fang',
        points: 60,
        collectionLogCategory: 'araxxor',
      }),
      compoundItem({
        name: 'Amulet of rancour (s)',
        points: 60,
        requiredItems: [
          'Noxious blade',
          'Noxious point',
          'Noxious pommel',
          'Aranea boots',
          'Araxyte head',
          'Zenyte shard',
          'Nid',
        ],
        collectionLogCategories: ['araxxor', 'slayer', 'gloughs_experiments'],
      }),
    ],
  },
  Cerberus: {
    image: formatWikiImageUrl('Hellpuppy detail', 'category'),
    items: [
      singleItem({
        name: 'Primordial crystal',
        points: 60,
        collectionLogCategory: 'cerberus',
      }),
      singleItem({
        name: 'Pegasian crystal',
        points: 40,
        collectionLogCategory: 'cerberus',
      }),
      singleItem({
        name: 'Eternal crystal',
        points: 30,
        collectionLogCategory: 'cerberus',
      }),
      singleItem({
        name: 'Smouldering stone',
        points: 30,
        collectionLogCategory: 'cerberus',
      }),
    ],
  },
  'Chambers of Xeric': {
    image: formatWikiImageUrl('Olmlet chathead', 'category'),
    items: [
      singleItem({
        name: 'Dexterous prayer scroll',
        points: 80,
        image: formatWikiImageUrl('Rigour'),
        collectionLogCategory: 'chambers_of_xeric',
      }),
      singleItem({
        name: 'Arcane prayer scroll',
        points: 50,
        image: formatWikiImageUrl('Augury'),
        collectionLogCategory: 'chambers_of_xeric',
      }),
      singleItem({
        name: 'Twisted buckler',
        points: 80,
        collectionLogCategory: 'chambers_of_xeric',
      }),
      singleItem({
        name: 'Dragon hunter crossbow',
        points: 150,
        collectionLogCategory: 'chambers_of_xeric',
      }),
      singleItem({
        name: "Dinh's bulwark",
        points: 80,
        collectionLogCategory: 'chambers_of_xeric',
      }),
      singleItem({
        name: 'Ancestral hat',
        points: 120,
        collectionLogCategory: 'chambers_of_xeric',
      }),
      singleItem({
        name: 'Ancestral robe top',
        points: 120,
        collectionLogCategory: 'chambers_of_xeric',
      }),
      singleItem({
        name: 'Ancestral robe bottom',
        points: 120,
        collectionLogCategory: 'chambers_of_xeric',
      }),
      singleItem({
        name: 'Dragon claws',
        points: 150,
        collectionLogCategory: 'chambers_of_xeric',
      }),
      singleItem({
        name: 'Elder maul',
        points: 250,
        collectionLogCategory: 'chambers_of_xeric',
      }),
      singleItem({
        name: 'Kodai insignia',
        points: 300,
        collectionLogCategory: 'chambers_of_xeric',
      }),
      singleItem({
        name: 'Twisted bow',
        points: 400,
        collectionLogCategory: 'chambers_of_xeric',
      }),
      singleItem({
        name: 'Twisted ancestral colour kit',
        points: 80,
        collectionLogCategory: 'chambers_of_xeric',
      }),
      singleItem({
        name: 'Metamorphic dust',
        points: 300,
        collectionLogCategory: 'chambers_of_xeric',
      }),
    ],
  },
  'Commander Zilyana': {
    items: [
      singleItem({
        name: 'Saradomin sword',
        points: 20,
        collectionLogCategory: 'commander_zilyana',
      }),
      singleItem({
        name: "Saradomin's light",
        points: 20,
        collectionLogCategory: 'commander_zilyana',
      }),
      singleItem({
        name: 'Armadyl crossbow',
        points: 50,
        collectionLogCategory: 'commander_zilyana',
      }),
      singleItem({
        name: 'Saradomin hilt',
        points: 80,
        collectionLogCategory: 'commander_zilyana',
      }),
    ],
  },
  'Corporeal Beast': {
    items: [
      singleItem({
        name: 'Spirit shield',
        points: 20,
        collectionLogCategory: 'corporeal_beast',
      }),
      singleItem({
        name: 'Holy elixir',
        points: 50,
        collectionLogCategory: 'corporeal_beast',
      }),
      compoundItem({
        name: 'Spectral spirit shield',
        points: 150,
        requiredItems: ['Spirit shield', 'Spectral sigil', 'Holy elixir'],
        collectionLogCategories: ['corporeal_beast'],
      }),
      compoundItem({
        name: 'Arcane spirit shield',
        points: 150,
        requiredItems: ['Spirit shield', 'Arcane sigil', 'Holy elixir'],
        collectionLogCategories: ['corporeal_beast'],
      }),
      compoundItem({
        name: 'Elysian spirit shield',
        points: 500,
        requiredItems: ['Spirit shield', 'Elysian sigil', 'Holy elixir'],
        collectionLogCategories: ['corporeal_beast'],
      }),
    ],
  },
  'Dagannoth Kings': {
    image: formatWikiImageUrl('Dagannoth Prime', 'category'),
    items: [
      singleItem({
        name: 'Archers ring',
        points: 10,
        collectionLogCategory: 'dagannoth_kings',
      }),
      singleItem({
        name: 'Berserker ring',
        points: 10,
        collectionLogCategory: 'dagannoth_kings',
      }),
      singleItem({
        name: 'Seers ring',
        points: 10,
        collectionLogCategory: 'dagannoth_kings',
      }),
      singleItem({
        name: 'Warrior ring',
        points: 10,
        collectionLogCategory: 'dagannoth_kings',
      }),
    ],
  },
  'Demonic Gorillas': {
    image: formatWikiImageUrl('Demonic gorilla', 'category'),
    items: [
      compoundItem({
        name: 'Heavy ballista',
        points: 50,
        requiredItems: [
          'Ballista spring',
          'Monkey tail',
          'Heavy frame',
          'Ballista limbs',
        ],
        requiredLevels: {
          Fletching: 72,
        },
        collectionLogCategories: ['gloughs_experiments'],
      }),
      ...Array.from({ length: 4 }).map<Item>((_, i) =>
        singleItem({
          name: `Zenyte shard (${i + 1})`,
          clogName: 'Zenyte shard',
          points: 45,
          requiredAmount: i + 1,
          collectionLogCategory: 'gloughs_experiments',
        }),
      ),
    ],
  },
  'Desert Treasure 2': {
    image: formatWikiImageUrl('Ancient icon detail', 'category'),
    items: [
      singleItem({
        name: "Awakener's orb",
        points: 10,
        collectionLogCategory: 'vardorvis',
      }),
      singleItem({
        name: 'Blood quartz',
        points: 20,
        collectionLogCategory: 'vardorvis',
      }),
      singleItem({
        name: 'Ice quartz',
        points: 20,
        collectionLogCategory: 'duke_sucellus',
      }),
      singleItem({
        name: 'Shadow quartz',
        points: 20,
        collectionLogCategory: 'the_whisperer',
      }),
      singleItem({
        name: 'Smoke quartz',
        points: 20,
        collectionLogCategory: 'the_leviathan',
      }),
      singleItem({
        name: 'Chromium ingot',
        points: 20,
        collectionLogCategory: 'vardorvis',
      }),
      singleItem({
        name: 'Virtus mask',
        points: 80,
        collectionLogCategory: 'vardorvis',
      }),
      singleItem({
        name: 'Virtus robe top',
        points: 80,
        collectionLogCategory: 'vardorvis',
      }),
      singleItem({
        name: 'Virtus robe bottom',
        points: 80,
        collectionLogCategory: 'vardorvis',
      }),
      compoundItem({
        name: 'Bellator ring',
        points: 100,
        requiredItems: [
          'Bellator vestige',
          ['Chromium ingot', 3],
          'Warrior ring',
        ],
        requiredLevels: {
          Magic: 85,
          Crafting: 75,
        },
        collectionLogCategories: ['the_whisperer', 'dagannoth_kings'],
      }),
      compoundItem({
        name: 'Magus ring',
        points: 100,
        requiredItems: ['Magus vestige', ['Chromium ingot', 3], 'Seers ring'],
        requiredLevels: {
          Magic: 85,
          Crafting: 75,
        },
        collectionLogCategories: ['duke_sucellus', 'dagannoth_kings'],
      }),
      compoundItem({
        name: 'Ultor ring',
        points: 100,
        requiredItems: [
          'Ultor vestige',
          ['Chromium ingot', 3],
          'Berserker ring',
        ],
        requiredLevels: {
          Magic: 85,
          Crafting: 75,
        },
        collectionLogCategories: ['vardorvis', 'dagannoth_kings'],
      }),
      compoundItem({
        name: 'Venator ring',
        points: 100,
        requiredItems: [
          'Venator vestige',
          ['Chromium ingot', 3],
          'Archers ring',
        ],
        requiredLevels: {
          Magic: 85,
          Crafting: 75,
        },
        collectionLogCategories: ['the_leviathan', 'dagannoth_kings'],
      }),
      compoundItem({
        name: 'Soulreaper axe',
        points: 250,
        requiredItems: [
          "Leviathan's lure",
          "Siren's staff",
          "Executioner's axe head",
          'Eye of the duke',
        ],
        requiredLevels: {
          Magic: 75,
        },
        collectionLogCategories: [
          'vardorvis',
          'the_leviathan',
          'the_whisperer',
          'duke_sucellus',
        ],
      }),
      combatAchievementItem({
        name: 'Ancient blood ornament kit',
        points: 2000,
        image: formatWikiImageUrl('Sanguine torva full helm detail'),
        requiredCombatAchievements: [
          490, // https://oldschool.runescape.wiki/w/Vardorvis_Sleeper
          499, // https://oldschool.runescape.wiki/w/Whispered
          508, // https://oldschool.runescape.wiki/w/Leviathan_Sleeper
          517, // https://oldschool.runescape.wiki/w/Duke_Sucellus_Sleeper
        ],
      }),
    ],
  },
  'Fortis Colosseum': {
    image: formatWikiImageUrl('Smol heredit detail', 'category'),
    items: [
      singleItem({
        name: 'Sunfire fanatic helm',
        points: 30,
        collectionLogCategory: 'fortis_colosseum',
      }),
      singleItem({
        name: 'Sunfire fanatic cuirass',
        points: 30,
        collectionLogCategory: 'fortis_colosseum',
      }),
      singleItem({
        name: 'Sunfire fanatic chausses',
        points: 30,
        collectionLogCategory: 'fortis_colosseum',
      }),
      singleItem({
        name: 'Echo crystal',
        points: 30,
        collectionLogCategory: 'fortis_colosseum',
      }),
      singleItem({
        name: 'Tonalztics of ralos',
        clogName: 'Tonalztics of ralos (uncharged)',
        points: 100,
        collectionLogCategory: 'fortis_colosseum',
      }),
      singleItem({
        name: "Dizana's quiver",
        clogName: "Dizana's quiver (uncharged)",
        points: 3500,
        collectionLogCategory: 'fortis_colosseum',
      }),
      manualItem({
        name: "Blessed dizana's quiver",
        points: 3500,
      }),
    ],
  },
  'General Graardor': {
    image: formatWikiImageUrl('Pet general graardor detail', 'category'),
    items: [
      singleItem({
        name: 'Bandos chestplate',
        points: 50,
        collectionLogCategory: 'general_graardor',
      }),
      singleItem({
        name: 'Bandos tassets',
        points: 50,
        collectionLogCategory: 'general_graardor',
      }),
      singleItem({
        name: 'Bandos boots',
        points: 50,
        collectionLogCategory: 'general_graardor',
      }),
      singleItem({
        name: 'Bandos hilt',
        points: 100,
        collectionLogCategory: 'general_graardor',
      }),
    ],
  },
  'Grotesque Guardians': {
    image: formatWikiImageUrl('Noon', 'category'),
    items: [
      singleItem({
        name: 'Granite gloves',
        points: 10,
        collectionLogCategory: 'grotesque_guardians',
      }),
      singleItem({
        name: 'Granite ring',
        points: 10,
        collectionLogCategory: 'grotesque_guardians',
      }),
      singleItem({
        name: 'Granite hammer',
        points: 30,
        collectionLogCategory: 'grotesque_guardians',
      }),
      compoundItem({
        name: 'Guardian boots',
        points: 50,
        requiredItems: ['Bandos boots', 'Black tourmaline core'],
        collectionLogCategories: ['grotesque_guardians', 'general_graardor'],
      }),
    ],
  },
  Kraken: {
    items: [
      singleItem({
        name: 'Trident of the seas (full)',
        points: 20,
        collectionLogCategory: 'kraken',
      }),
      singleItem({
        name: 'Kraken tentacle',
        points: 30,
        collectionLogCategory: 'kraken',
      }),
    ],
  },
  "Kree'arra": {
    image: formatWikiImageUrl("Kree'arra chathead", 'category'),
    items: [
      singleItem({
        name: 'Armadyl helmet',
        points: 50,
        collectionLogCategory: 'kree_arra',
      }),
      singleItem({
        name: 'Armadyl chestplate',
        points: 50,
        collectionLogCategory: 'kree_arra',
      }),
      singleItem({
        name: 'Armadyl chainskirt',
        points: 50,
        collectionLogCategory: 'kree_arra',
      }),
      singleItem({
        name: 'Armadyl hilt',
        points: 80,
        collectionLogCategory: 'kree_arra',
      }),
    ],
  },
  "K'ril Tsutsaroth": {
    image: formatWikiImageUrl("K'ril Tsutsaroth chathead", 'category'),
    items: [
      singleItem({
        name: 'Steam battlestaff',
        points: 20,
        collectionLogCategory: 'kril_tsutsaroth',
      }),
      singleItem({
        name: 'Zamorakian spear',
        points: 30,
        collectionLogCategory: 'kril_tsutsaroth',
      }),
      singleItem({
        name: 'Staff of the dead',
        points: 50,
        collectionLogCategory: 'kril_tsutsaroth',
      }),
      singleItem({
        name: 'Zamorak hilt',
        points: 80,
        collectionLogCategory: 'kril_tsutsaroth',
      }),
    ],
  },
  Sarachnis: {
    items: [
      singleItem({
        name: 'Sarachnis cudgel',
        points: 20,
        collectionLogCategory: 'sarachnis',
      }),
    ],
  },
  'The Gauntlet': {
    image: formatWikiImageUrl('Corrupted Youngllef chathead', 'category'),
    items: [
      singleItem({
        name: 'Crystal weapon seed',
        points: 20,
        collectionLogCategory: 'the_gauntlet',
      }),
      singleItem({
        name: 'Crystal armour seed',
        points: 20,
        collectionLogCategory: 'the_gauntlet',
      }),
      singleItem({
        name: 'Enhanced crystal weapon seed (1)',
        clogName: 'Enhanced crystal weapon seed',
        points: 150,
        requiredAmount: 1,
        collectionLogCategory: 'the_gauntlet',
      }),
      singleItem({
        name: 'Enhanced crystal weapon seed (2)',
        clogName: 'Enhanced crystal weapon seed',
        points: 150,
        requiredAmount: 2,
        collectionLogCategory: 'the_gauntlet',
      }),
    ],
  },
  'Theatre of Blood': {
    image: formatWikiImageUrl('Verzik Vitur (final form)', 'category'),
    items: [
      singleItem({
        name: 'Avernic defender hilt',
        points: 50,
        collectionLogCategory: 'theatre_of_blood',
      }),
      singleItem({
        name: 'Justiciar faceguard',
        points: 60,
        collectionLogCategory: 'theatre_of_blood',
      }),
      singleItem({
        name: 'Justiciar chestguard',
        points: 60,
        collectionLogCategory: 'theatre_of_blood',
      }),
      singleItem({
        name: 'Justiciar legguards',
        points: 60,
        collectionLogCategory: 'theatre_of_blood',
      }),
      singleItem({
        name: 'Ghrazi rapier',
        points: 100,
        collectionLogCategory: 'theatre_of_blood',
      }),
      singleItem({
        name: 'Sanguinesti staff',
        clogName: 'Sanguinesti staff (uncharged)',
        points: 100,
        collectionLogCategory: 'theatre_of_blood',
      }),
      singleItem({
        name: 'Scythe of vitur',
        clogName: 'Scythe of vitur (uncharged)',
        points: 300,
        collectionLogCategory: 'theatre_of_blood',
      }),
      singleItem({
        name: 'Holy ornament kit',
        points: 100,
        collectionLogCategory: 'theatre_of_blood',
      }),
      singleItem({
        name: 'Sanguine ornament kit',
        points: 150,
        collectionLogCategory: 'theatre_of_blood',
      }),
      singleItem({
        name: 'Sanguine dust',
        points: 300,
        collectionLogCategory: 'theatre_of_blood',
      }),
    ],
  },
  'Thermonuclear Smoke Devil': {
    image: formatWikiImageUrl('Pet smoke devil chathead', 'category'),
    items: [
      singleItem({
        name: 'Occult necklace',
        points: 30,
        collectionLogCategory: 'thermonuclear_smoke_devil',
      }),
      singleItem({
        name: 'Smoke battlestaff',
        points: 30,
        collectionLogCategory: 'thermonuclear_smoke_devil',
      }),
    ],
  },
  'Tormented Demons': {
    image: formatWikiImageUrl('Tormented Demon (1)', 'category'),
    items: [
      compoundItem({
        name: 'Burning claws',
        points: 100,
        requiredItems: [['Burning claw', 2]],
        collectionLogCategories: ['tormented_demons'],
      }),
      ...Array.from({ length: 3 }).map((_, i) =>
        singleItem({
          name: `Tormented synapse (${i + 1})`,
          points: 50,
          clogName: 'Tormented synapse',
          requiredAmount: i + 1,
          collectionLogCategory: 'tormented_demons',
        }),
      ),
    ],
  },
  'TzHaar Challenges': {
    image: formatWikiImageUrl('TzKal-Zuk', 'category'),
    items: [
      singleItem({
        name: 'Fire cape',
        points: 20,
        collectionLogCategory: 'the_fight_caves',
      }),
      singleItem({
        name: 'Infernal cape',
        points: 7000,
        collectionLogCategory: 'the_inferno',
      }),
      combatAchievementItem({
        name: '6 Jads',
        points: 100,
        image: formatWikiImageUrl('TzTok-Jad'),
        requiredCombatAchievements: [
          363, // https://oldschool.runescape.wiki/w/The_VI_Jad_Challenge
        ],
      }),
    ],
  },
  Vorkath: {
    image: formatWikiImageUrl('Vorki detail', 'category'),
    items: [
      singleItem({
        name: "Vorkath's head",
        points: 20,
        collectionLogCategory: 'vorkath',
      }),
      singleItem({
        name: 'Dragonbone necklace',
        points: 100,
        collectionLogCategory: 'vorkath',
      }),
    ],
  },
  Zulrah: {
    image: formatWikiImageUrl('Snakeling (tanzanite)', 'category'),
    items: [
      singleItem({
        name: 'Toxic blowpipe',
        clogName: 'Tanzanite fang',
        points: 80,
        image: formatWikiImageUrl('Toxic blowpipe'),
        requiredLevels: {
          Fletching: 73,
        },
        collectionLogCategory: 'zulrah',
      }),
      singleItem({
        name: 'Magic fang',
        points: 80,
        collectionLogCategory: 'zulrah',
      }),
      singleItem({
        name: 'Serpentine visage',
        points: 60,
        image: formatWikiImageUrl('Serpentine helm'),
        collectionLogCategory: 'zulrah',
      }),
      singleItem({
        name: 'Tanzanite mutagen',
        points: 150,
        collectionLogCategory: 'zulrah',
      }),
      singleItem({
        name: 'Magma mutagen',
        points: 150,
        collectionLogCategory: 'zulrah',
      }),
    ],
  },
  'The Nightmare': {
    image: formatWikiImageUrl('Little nightmare chathead', 'category'),
    items: [
      singleItem({
        name: 'Nightmare staff',
        points: 50,
        collectionLogCategory: 'the_nightmare',
      }),
      singleItem({
        name: "Inquisitor's great helm",
        points: 150,
        collectionLogCategory: 'the_nightmare',
      }),
      singleItem({
        name: "Inquisitor's hauberk",
        points: 150,
        collectionLogCategory: 'the_nightmare',
      }),
      singleItem({
        name: "Inquisitor's plateskirt",
        points: 150,
        collectionLogCategory: 'the_nightmare',
      }),
      singleItem({
        name: "Inquisitor's mace",
        points: 250,
        collectionLogCategory: 'the_nightmare',
      }),
      singleItem({
        name: 'Eldritch orb',
        points: 300,
        collectionLogCategory: 'the_nightmare',
      }),
      singleItem({
        name: 'Harmonised orb',
        points: 300,
        collectionLogCategory: 'the_nightmare',
      }),
      singleItem({
        name: 'Volatile orb',
        points: 300,
        collectionLogCategory: 'the_nightmare',
      }),
      singleItem({
        name: 'Parasitic egg',
        points: 50,
        collectionLogCategory: 'the_nightmare',
      }),
    ],
  },
  Nex: {
    image: formatWikiImageUrl('Nexling detail', 'category'),
    items: [
      singleItem({
        name: 'Zaryte vambraces',
        points: 50,
        collectionLogCategory: 'nex',
      }),
      singleItem({
        name: 'Nihil horn',
        points: 150,
        collectionLogCategory: 'nex',
      }),
      singleItem({
        name: 'Torva full helm',
        clogName: 'Torva full helm (damaged)',
        image: formatWikiImageUrl('Torva full helm'),
        points: 120,
        collectionLogCategory: 'nex',
      }),
      singleItem({
        name: 'Torva platebody',
        clogName: 'Torva platebody (damaged)',
        image: formatWikiImageUrl('Torva platebody'),
        points: 120,
        collectionLogCategory: 'nex',
      }),
      singleItem({
        name: 'Torva platelegs',
        clogName: 'Torva platelegs (damaged)',
        image: formatWikiImageUrl('Torva platelegs'),
        points: 120,
        collectionLogCategory: 'nex',
      }),
      singleItem({
        name: 'Ancient hilt',
        points: 200,
        collectionLogCategory: 'nex',
      }),
    ],
  },
  'Tombs of Amascut': {
    image: formatWikiImageUrl(
      'Tombs of Amascut - Expert Mode icon',
      'category',
    ),
    items: [
      singleItem({
        name: 'Thread of elidinis',
        points: 10,
        collectionLogCategory: 'tombs_of_amascut',
      }),
      singleItem({
        name: 'Eye of the corruptor',
        points: 20,
        collectionLogCategory: 'tombs_of_amascut',
      }),
      singleItem({
        name: 'Jewel of the sun',
        points: 20,
        collectionLogCategory: 'tombs_of_amascut',
      }),
      singleItem({
        name: 'Breach of the scarab',
        points: 20,
        collectionLogCategory: 'tombs_of_amascut',
      }),
      singleItem({
        name: "Osmumten's fang",
        points: 40,
        collectionLogCategory: 'tombs_of_amascut',
      }),
      singleItem({
        name: 'Lightbearer',
        points: 40,
        collectionLogCategory: 'tombs_of_amascut',
      }),
      singleItem({
        name: "Elidinis' ward",
        points: 60,
        collectionLogCategory: 'tombs_of_amascut',
      }),
      singleItem({
        name: 'Masori mask',
        points: 100,
        collectionLogCategory: 'tombs_of_amascut',
      }),
      singleItem({
        name: 'Masori body',
        points: 100,
        collectionLogCategory: 'tombs_of_amascut',
      }),
      singleItem({
        name: 'Masori chaps',
        points: 100,
        collectionLogCategory: 'tombs_of_amascut',
      }),
      singleItem({
        name: "Tumeken's shadow",
        clogName: "Tumeken's shadow (uncharged)",
        points: 300,
        collectionLogCategory: 'tombs_of_amascut',
      }),
      singleItem({
        name: 'Masori crafting kit',
        points: 30,
        collectionLogCategory: 'tombs_of_amascut',
      }),
      singleItem({
        name: 'Menaphite ornament kit',
        points: 50,
        collectionLogCategory: 'tombs_of_amascut',
      }),
      singleItem({
        name: 'Remnant of akkha',
        points: 120,
        collectionLogCategory: 'tombs_of_amascut',
      }),
      singleItem({
        name: 'Remnant of ba-ba',
        points: 80,
        collectionLogCategory: 'tombs_of_amascut',
      }),
      singleItem({
        name: 'Remnant of kephri',
        points: 100,
        collectionLogCategory: 'tombs_of_amascut',
      }),
      singleItem({
        name: 'Remnant of zebak',
        points: 80,
        collectionLogCategory: 'tombs_of_amascut',
      }),
      singleItem({
        name: 'Ancient remnant',
        points: 80,
        collectionLogCategory: 'tombs_of_amascut',
      }),
      singleItem({
        name: 'Cursed phalanx',
        points: 200,
        collectionLogCategory: 'tombs_of_amascut',
      }),
    ],
  },
  'Perilous Moons': {
    image: formatWikiImageUrl('Blood Moon', 'category'),
    items: [
      singleItem({
        name: 'Eclipse atlatl',
        points: 20,
        collectionLogCategory: 'moons_of_peril',
      }),
      singleItem({
        name: 'Eclipse moon helm',
        points: 20,
        collectionLogCategory: 'moons_of_peril',
      }),
      singleItem({
        name: 'Eclipse moon chestplate',
        points: 20,
        collectionLogCategory: 'moons_of_peril',
      }),
      singleItem({
        name: 'Eclipse moon tassets',
        points: 20,
        collectionLogCategory: 'moons_of_peril',
      }),
      singleItem({
        name: 'Dual macuahuitl',
        points: 20,
        collectionLogCategory: 'moons_of_peril',
      }),
      singleItem({
        name: 'Blood moon helm',
        points: 20,
        collectionLogCategory: 'moons_of_peril',
      }),
      singleItem({
        name: 'Blood moon chestplate',
        points: 20,
        collectionLogCategory: 'moons_of_peril',
      }),
      singleItem({
        name: 'Blood moon tassets',
        points: 20,
        collectionLogCategory: 'moons_of_peril',
      }),
      singleItem({
        name: 'Blue moon spear',
        points: 20,
        collectionLogCategory: 'moons_of_peril',
      }),
      singleItem({
        name: 'Blue moon helm',
        points: 20,
        collectionLogCategory: 'moons_of_peril',
      }),
      singleItem({
        name: 'Blue moon chestplate',
        points: 20,
        collectionLogCategory: 'moons_of_peril',
      }),
      singleItem({
        name: 'Blue moon tassets',
        points: 20,
        collectionLogCategory: 'moons_of_peril',
      }),
    ],
  },
  'Phantom Muspah': {
    image: formatWikiImageUrl('Phantom Muspah (shielded)', 'category'),
    items: [
      singleItem({
        name: 'Ancient sceptre',
        points: 30,
        clogName: 'Ancient icon',
        collectionLogCategory: 'phantom_muspah',
      }),
      compoundItem({
        name: 'Venator bow',
        points: 80,
        requiredItems: [['Venator shard', 5]],
        collectionLogCategories: ['phantom_muspah'],
      }),
      manualItem({
        name: 'Saturated heart',
        points: 60,
      }),
    ],
  },
  'Wilderness items': {
    image:
      'https://oldschool.runescape.wiki/images/Pkskull_%28Steam_Emoticon%29.png',
    items: [
      questItem({
        name: 'Mage Arena 2 cape',
        points: 20,
        image: formatWikiImageUrl('Imbued zamorak cape'),
        requiredQuests: ['Mage Arena II'],
      }),
      compoundItem({
        name: 'Odium ward',
        points: 30,
        requiredItems: ['Odium shard 1', 'Odium shard 2', 'Odium shard 3'],
        collectionLogCategories: [
          'crazy_archaeologist',
          'scorpia',
          'chaos_fanatic',
        ],
      }),
      compoundItem({
        name: 'Malediction ward',
        points: 30,
        requiredItems: [
          'Malediction shard 1',
          'Malediction shard 2',
          'Malediction shard 3',
        ],
        collectionLogCategories: [
          'crazy_archaeologist',
          'scorpia',
          'chaos_fanatic',
        ],
      }),
      singleItem({
        name: 'Dragon pickaxe',
        points: 30,
        collectionLogCategory: 'venenatis_and_spindel',
      }),
      singleItem({
        name: 'Ring of the gods',
        points: 50,
        collectionLogCategory: 'vetion_and_calvarion',
      }),
      singleItem({
        name: 'Treasonous ring',
        points: 50,
        collectionLogCategory: 'venenatis_and_spindel',
      }),
      singleItem({
        name: 'Tyrannical ring',
        points: 50,
        collectionLogCategory: 'callisto_and_artio',
      }),
      singleItem({
        name: 'Amulet of eternal glory',
        points: 100,
        collectionLogCategory: 'miscellaneous',
      }),
      singleItem({
        name: 'Amulet of avarice',
        points: 50,
        collectionLogCategory: 'revenants',
      }),
      compoundItem({
        name: 'Obelisk',
        points: 100,
        image:
          'https://oldschool.runescape.wiki/images/Obelisk_%28Construction%29_built.png',
        requiredItems: [['Ancient crystal', 4]],
        requiredLevels: {
          Construction: 72,
        },
        collectionLogCategories: ['revenants'],
      }),
      singleItem({
        name: "Viggora's chainmace",
        clogName: "Viggora's chainmace (u)",
        points: 100,
        collectionLogCategory: 'revenants',
      }),
      singleItem({
        name: 'Claws of callisto',
        points: 50,
        collectionLogCategory: 'callisto_and_artio',
      }),
      singleItem({
        name: "Craw's bow",
        clogName: "Craw's bow (u)",
        points: 100,
        collectionLogCategory: 'revenants',
      }),
      singleItem({
        name: 'Fangs of venenatis',
        points: 50,
        collectionLogCategory: 'venenatis_and_spindel',
      }),
      singleItem({
        name: "Thammaron's sceptre",
        clogName: "Thammaron's sceptre (u)",
        points: 100,
        collectionLogCategory: 'revenants',
      }),
      singleItem({
        name: "Skull of vet'ion",
        points: 50,
        collectionLogCategory: 'vetion_and_calvarion',
      }),
      compoundItem({
        name: 'Voidwaker',
        points: 150,
        requiredItems: ['Voidwaker hilt', 'Voidwaker gem', 'Voidwaker blade'],
        collectionLogCategories: [
          'vetion_and_calvarion',
          'callisto_and_artio',
          'venenatis_and_spindel',
        ],
      }),
      singleItem({
        name: 'Teleport anchoring scroll',
        points: 100,
        collectionLogCategory: 'slayer',
      }),
    ],
  },
  'Major Slayer Items': {
    image: formatWikiImageUrl('Slayer icon (detail)', 'category'),
    items: [
      manualItem({
        name: 'Slayer helmet (i)',
        points: 10,
      }),
      singleItem({
        name: 'Leaf-bladed battleaxe',
        points: 20,
        collectionLogCategory: 'slayer',
      }),
      singleItem({
        name: 'Warped sceptre',
        clogName: 'Warped sceptre (uncharged)',
        points: 20,
        collectionLogCategory: 'slayer',
      }),
      compoundItem({
        name: 'Devout boots',
        points: 20,
        requiredItems: ["Drake's tooth", 'Holy sandals'],
        collectionLogCategories: ['slayer', 'medium_treasure_trails'],
      }),
      singleItem({
        name: 'Boots of brimstone',
        clogName: "Drake's claw",
        points: 20,
        image: formatWikiImageUrl('Boots of brimstone'),
        collectionLogCategory: 'slayer',
      }),
      singleItem({
        name: 'Neitiznot faceguard',
        clogName: 'Basilisk jaw',
        points: 30,
        image: formatWikiImageUrl('Neitiznot faceguard'),
        collectionLogCategory: 'slayer',
      }),
      singleItem({
        name: 'Abyssal whip',
        points: 20,
        collectionLogCategory: 'slayer',
      }),
      singleItem({
        name: 'Dark bow',
        points: 20,
        collectionLogCategory: 'slayer',
      }),
      singleItem({
        name: 'Mist battlestaff',
        points: 30,
        collectionLogCategory: 'slayer',
      }),
      singleItem({
        name: 'Dust battlestaff',
        points: 30,
        collectionLogCategory: 'slayer',
      }),
      singleItem({
        name: 'Eternal gem',
        points: 150,
        collectionLogCategory: 'slayer',
      }),
      singleItem({
        name: 'Imbued heart',
        points: 250,
        collectionLogCategory: 'slayer',
      }),
    ],
  },
  Visages: {
    image: formatWikiImageUrl('Draconic visage detail', 'category'),
    items: [
      singleItem({
        name: 'Dragonfire shield',
        clogName: 'Draconic visage',
        points: 150,
        image: formatWikiImageUrl('Dragonfire shield'),
        collectionLogCategory: 'slayer',
      }),
      singleItem({
        name: 'Dragonfire ward',
        clogName: 'Skeletal visage',
        points: 200,
        image: formatWikiImageUrl('Dragonfire ward'),
        collectionLogCategory: 'vorkath',
      }),
      singleItem({
        name: 'Ancient wyvern shield',
        clogName: 'Wyvern visage',
        points: 200,
        image: formatWikiImageUrl('Ancient wyvern shield'),
        collectionLogCategory: 'slayer',
      }),
    ],
  },
  'Misc Items': {
    image: formatWikiImageUrl('Inventory', 'category'),
    items: [
      questItem({
        name: 'Barrows gloves',
        points: 20,
        requiredQuests: ['Recipe for Disaster'],
      }),
      questItem({
        name: 'Book of the dead',
        points: 10,
        requiredQuests: ['A Kingdom Divided'],
      }),
      singleItem({
        name: 'Bottomless compost bucket',
        points: 30,
        collectionLogCategory: 'hespori',
      }),
      singleItem({
        name: "Bryophyta's essence",
        points: 50,
        collectionLogCategory: 'bryophyta',
      }),
      singleItem({
        name: 'Crystal tool seed',
        points: 100,
        collectionLogCategory: 'zalcano',
      }),
      singleItem({
        name: 'Dragon warhammer',
        points: 100,
        collectionLogCategory: 'miscellaneous',
      }),
      compoundItem({
        name: 'Graceful set',
        points: 20,
        image: formatWikiImageUrl('Graceful hood'),
        requiredItems: [
          'Graceful hood',
          'Graceful top',
          'Graceful legs',
          'Graceful gloves',
          'Graceful boots',
          'Graceful cape',
        ],
        collectionLogCategories: ['rooftop_agility'],
      }),
      singleItem({
        name: 'Ham joint',
        points: 20,
        collectionLogCategory: 'easy_treasure_trails',
      }),
      customItem({
        name: 'Music cape',
        points: 80,
        image: formatWikiImageUrl('Music cape detail'),
        isAcquired({ musicTracks }) {
          return musicTracks
            ? Object.entries(musicTracks)
                .filter(([track]) => !isHolidayTrack(track))
                .every(([, unlocked]) => unlocked)
            : false;
        },
      }),
      questItem({
        name: 'Quest cape',
        points: 80,
        image: formatWikiImageUrl('Quest point cape detail'),
        requiredQuests: Quest.options,
      }),
      singleItem({
        name: 'Ranger boots',
        points: 60,
        collectionLogCategory: 'medium_treasure_trails',
      }),
      singleItem({
        name: 'Ring of endurance',
        clogName: 'Ring of endurance (uncharged)',
        points: 120,
        collectionLogCategory: 'hallowed_sepulchre',
      }),
      singleItem({
        name: 'Swift blade',
        points: 30,
        collectionLogCategory: 'last_man_standing',
      }),
      singleItem({
        name: 'Tome of fire',
        clogName: 'Tome of fire (empty)',
        points: 30,
        collectionLogCategory: 'wintertodt',
      }),
      singleItem({
        name: 'Tome of water',
        clogName: 'Tome of water (empty)',
        points: 30,
        collectionLogCategory: 'tempoross',
      }),
      singleItem({
        name: 'Zombie axe',
        clogName: 'Broken zombie axe',
        points: 20,
        requiredLevels: {
          Smithing: 65,
        },
        collectionLogCategory: 'miscellaneous',
      }),
    ],
  },
  Jars: {
    image: formatWikiImageUrl('Jar of venom', 'category'),
    items: [
      singleItem({
        name: 'Jar of chemicals (Hydra)',
        clogName: 'Jar of chemicals',
        points: 50,
        collectionLogCategory: 'alchemical_hydra',
      }),
      singleItem({
        name: 'Jar of darkness (Skotizo)',
        clogName: 'Jar of darkness',
        points: 150,
        collectionLogCategory: 'skotizo',
      }),
      singleItem({
        name: 'Jar of decay (Vorkath)',
        clogName: 'Jar of decay',
        points: 50,
        collectionLogCategory: 'vorkath',
      }),
      singleItem({
        name: 'Jar of dirt (Kraken)',
        clogName: 'Jar of dirt',
        points: 50,
        collectionLogCategory: 'kraken',
      }),
      singleItem({
        name: 'Jar of dreams (Nightmare)',
        clogName: 'Jar of dreams',
        points: 150,
        collectionLogCategory: 'the_nightmare',
      }),
      singleItem({
        name: 'Jar of eyes (Sarachnis)',
        clogName: 'Jar of eyes',
        points: 50,
        collectionLogCategory: 'sarachnis',
      }),
      singleItem({
        name: 'Jar of miasma (Sire)',
        clogName: 'Jar of miasma',
        points: 50,
        collectionLogCategory: 'abyssal_sire',
      }),
      singleItem({
        name: 'Jar of sand (Kalphite Queen)',
        clogName: 'Jar of sand',
        points: 50,
        collectionLogCategory: 'kalphite_queen',
      }),
      singleItem({
        name: 'Jar of smoke (Thermy)',
        clogName: 'Jar of smoke',
        points: 50,
        collectionLogCategory: 'thermonuclear_smoke_devil',
      }),
      singleItem({
        name: 'Jar of souls (Cerberus)',
        clogName: 'Jar of souls',
        points: 50,
        collectionLogCategory: 'cerberus',
      }),
      singleItem({
        name: 'Jar of spirits (Corp)',
        clogName: 'Jar of spirits',
        points: 150,
        collectionLogCategory: 'corporeal_beast',
      }),
      singleItem({
        name: 'Jar of stone (GGs)',
        clogName: 'Jar of stone',
        points: 100,
        collectionLogCategory: 'grotesque_guardians',
      }),
      singleItem({
        name: 'Jar of swamp (Zulrah)',
        clogName: 'Jar of swamp',
        points: 50,
        collectionLogCategory: 'zulrah',
      }),
      singleItem({
        name: 'Jar of venom (Araxxor)',
        clogName: 'Jar of venom',
        points: 50,
        collectionLogCategory: 'araxxor',
      }),
    ],
  },
  Pets: {
    image: formatWikiImageUrl('Nid', 'category'),
    items: (
      Object.entries({
        'Abyssal orphan': [100],
        'Abyssal protector': [150],
        'Baby chinchompa': [
          150,
          formatWikiImageUrl('Baby chinchompa (gold) chathead'),
        ],
        'Baby mole': [50],
        Baron: [110],
        Beaver: [150],
        Bloodhound: [400],
        Bran: [50],
        Butch: [130],
        'Callisto cub': [80],
        'Chompy chick': [10],
        'Giant squirrel': [200],
        Hellpuppy: [80],
        Herbi: [120],
        Heron: [150],
        Huberte: [50],
        'Ikkle hydra': [
          140,
          formatWikiImageUrl('Ikkle Hydra (serpentine) chathead'),
        ],
        'Jal-nib-rek': [200],
        'Kalphite princess': [100],
        "Lil' creator": [100],
        "Lil'viathan": [140],
        "Lil' zik": [200],
        'Little nightmare': [300],
        Muphin: [80, formatWikiImageUrl('Muphin (shielded) chathead')],
        Nexling: [250],
        Nid: [70],
        Noon: [120],
        Olmlet: [400],
        'Pet chaos elemental': [20],
        'Pet dagannoth prime': [100],
        'Pet dagannoth rex': [100],
        'Pet dagannoth supreme': [100],
        'Pet dark core': [400],
        'Pet general graardor': [150],
        'Pet kraken': [50],
        "Pet kree'arra": [200],
        "Pet k'ril tsutsaroth": [
          150,
          formatWikiImageUrl("K'ril Tsutsaroth Jr. chathead"),
        ],
        'Pet penance queen': [500],
        'Pet smoke devil': [60],
        'Pet snakeling': [120],
        'Pet zilyana': [200],
        Phoenix: [150],
        'Prince black dragon': [80],
        Quetzin: [150],
        'Rift guardian': [
          300,
          formatWikiImageUrl('Rift guardian (follower, fire)'),
        ],
        'Rock golem': [200],
        Rocky: [100],
        "Scorpia's offspring": [60],
        Scurry: [50],
        Skotos: [40],
        Smolcano: [160],
        'Smol heredit': [150],
        Sraracha: [70],
        Tangleroot: [400],
        'Tiny tempor': [200],
        "Tumeken's guardian": [200],
        'Tzrek-jad': [140],
        'Venenatis spiderling': [80],
        "Vet'ion jr.": [100],
        Vorki: [120],
        Wisp: [120],
        Youngllef: [160],
      }) as [string, [number] | [number, string]][]
    ).map<Item>(([name, [points, image = formatWikiImageUrl(name)]]) =>
      singleItem({
        name,
        points,
        image,
        collectionLogCategory: 'all_pets',
      }),
    ) as NonEmptyArray<Item>,
  },
  'The Hueycoatl': {
    items: [
      singleItem({
        name: 'Hueycoatl hide',
        points: 10,
        collectionLogCategory: 'the_hueycoatl',
      }),
      singleItem({
        name: 'Dragon hunter wand',
        points: 0,
        collectionLogCategory: 'the_hueycoatl',
      }),
      singleItem({
        name: 'Tome of earth',
        clogName: 'Tome of earth (empty)',
        points: 0,
        collectionLogCategory: 'the_hueycoatl',
      }),
    ],
  },
  'Royal Titans': {
    items: [
      singleItem({
        name: 'Deadeye prayer scroll',
        image: formatWikiImageUrl('Deadeye'),
        points: 40,
        collectionLogCategory: 'royal_titans',
      }),
      singleItem({
        name: 'Mystic vigour prayer scroll',
        image: formatWikiImageUrl('Mystic Vigour'),
        points: 40,
        collectionLogCategory: 'royal_titans',
      }),
      compoundItem({
        name: 'Twinflame staff',
        points: 80,
        requiredItems: [
          'Ice element staff crown',
          'Fire element staff crown',
        ],
        collectionLogCategories: ['royal_titans'],
      }),
    ],
  },
};
