import { calculateXpOrTimeBasedItemPoints } from '@/app/rank-calculator/utils/calculate-xp-or-time-based-item-points';
import { formatWikiImageUrl } from '@/app/rank-calculator/utils/format-wiki-url';
import {
  BaseItem,
  CollectionLogItem,
  CombatAchievementItem,
  Item,
  ItemCategoryMap,
  QuestItem,
  RequiredItem,
} from '@/app/schemas/items';
import { CollectionLogItemName, Quest } from '@/app/schemas/osrs';
import { TempleOSRSCollectionLogCategory } from '@/app/schemas/temple-api';
import {
  ehbRates,
  petEhcRates,
} from '@/app/rank-calculator/config/efficiency-rates';

type SingleItemOptions = Omit<
  OptionalKeys<CollectionLogItem, 'image' | 'points' | 'hasPointsError'>,
  'requiredItems' | 'collectionLogCategories'
> &
  Pick<
    RequiredItem,
    'ignoreAmountMultiplier' | 'ignoreDropRateModifier' | 'targetDropSources'
  > & {
    clogName?: CollectionLogItemName;
    requiredAmount?: number;
    collectionLogCategory: TempleOSRSCollectionLogCategory;
  };

function singleItem({
  name,
  points = 0,
  clogName,
  image = formatWikiImageUrl(clogName ?? name),
  requiredAmount = 1,
  collectionLogCategory,
  targetDropSources,
  ignoreDropRateModifier,
  ignoreAmountMultiplier,
}: SingleItemOptions) {
  return CollectionLogItem.parse({
    image,
    name,
    points,
    hasPointsError: false,
    requiredItems: [
      {
        amount: requiredAmount,
        clogName: clogName ?? name,
        targetDropSources,
        ignoreDropRateModifier,
        ignoreAmountMultiplier,
      },
    ],
    collectionLogCategories: [collectionLogCategory],
  });
}

type CompoundItemOptions = Omit<
  OptionalKeys<CollectionLogItem, 'image' | 'points' | 'hasPointsError'>,
  'requiredItems'
> & {
  requiredItems: NonEmptyArray<
    Omit<RequiredItem, 'amount'> & { amount?: number }
  >;
};

function compoundItem({
  name,
  image = formatWikiImageUrl(name),
  points = 0,
  requiredItems,
  requiredLevels,
  collectionLogCategories,
}: CompoundItemOptions) {
  return CollectionLogItem.parse({
    image,
    name,
    points,
    hasPointsError: false,
    requiredItems: requiredItems.map<RequiredItem>(
      ({ amount = 1, ...item }) => ({
        ...item,
        amount,
      }),
    ),
    requiredLevels,
    collectionLogCategories,
  });
}

function combatAchievementItem({
  name,
  image = formatWikiImageUrl(name),
  points,
  requiredCombatAchievements,
}: OptionalKeys<CombatAchievementItem, 'image'>) {
  return CombatAchievementItem.parse({
    image,
    name,
    points,
    requiredCombatAchievements,
  });
}

function questItem({
  name,
  image = formatWikiImageUrl(name),
  points,
  requiredQuests,
}: OptionalKeys<QuestItem, 'image'>) {
  return QuestItem.parse({
    image,
    name,
    points,
    requiredQuests,
  });
}

function baseItem({ image, name, points }: BaseItem) {
  return BaseItem.parse({
    name,
    points,
    image,
  });
}

const estimatedHoursForImbuedHeart = 125;
const eternalGloryDropRate = 1 / 25000;
const gloriesChargedPerHour = 600;
const swiftBladeLmsPointsRequired = 350;
const estimatedHoursToObtainAbyssalWhip = 20;
const estimatedHoursToObtainBottomlessCompostBucket = 35;
const estimatedHoursToAcquireMusicCape = 100;
const estimatedHoursToAcquireQuestCape = 100;
const estimatedHoursToAcquireMageArena2Cape = 10;
const estimatedHoursToAcquireBarrowsGloves = 10;
const estimatedHoursToAcquireBookOfTheDead = 10;
const estimatedHoursToAcquireGracefulSet = 50;
const estimatedHoursToComplete6Jads = 250;

export const itemList = {
  'Abyssal Sire': {
    image: formatWikiImageUrl('Abyssal orphan (follower)', 'category'),
    items: [
      compoundItem({
        name: 'Abyssal bludgeon',
        requiredItems: [
          { clogName: 'Bludgeon axon' },
          { clogName: 'Bludgeon claw' },
          { clogName: 'Bludgeon spine' },
        ],
        collectionLogCategories: ['abyssal_sire'],
      }),
      singleItem({
        name: 'Abyssal dagger',
        targetDropSources: ['Unsired'],
        collectionLogCategory: 'abyssal_sire',
      }),
      singleItem({
        name: 'Jar of miasma',
        collectionLogCategory: 'abyssal_sire',
      }),
      singleItem({
        name: 'Abyssal orphan',
        collectionLogCategory: 'abyssal_sire',
      }),
    ],
  },
  'Alchemical Hydra': {
    image: formatWikiImageUrl('Alchemical Hydra (serpentine)', 'category'),
    items: [
      compoundItem({
        name: 'Brimstone ring',
        requiredItems: [
          { clogName: "Hydra's eye", targetDropSources: ['Alchemical Hydra'] },
          { clogName: "Hydra's fang", targetDropSources: ['Alchemical Hydra'] },
          {
            clogName: "Hydra's heart",
            targetDropSources: ['Alchemical Hydra'],
          },
        ],
        collectionLogCategories: ['alchemical_hydra'],
      }),
      singleItem({
        name: 'Hydra tail',
        collectionLogCategory: 'alchemical_hydra',
        targetDropSources: ['Alchemical Hydra'],
      }),
      singleItem({
        name: 'Hydra leather',
        collectionLogCategory: 'alchemical_hydra',
      }),
      singleItem({
        name: "Hydra's claw",
        collectionLogCategory: 'alchemical_hydra',
      }),
      singleItem({
        name: 'Jar of chemicals',
        collectionLogCategory: 'alchemical_hydra',
      }),
      singleItem({
        name: 'Ikkle hydra',
        image: formatWikiImageUrl('Ikkle Hydra (serpentine) chathead'),
        collectionLogCategory: 'alchemical_hydra',
      }),
    ],
  },
  Araxxor: {
    items: [
      singleItem({
        name: 'Coagulated venom',
        collectionLogCategory: 'araxxor',
      }),
      singleItem({
        name: 'Noxious blade',
        collectionLogCategory: 'araxxor',
      }),
      singleItem({
        name: 'Noxious point',
        collectionLogCategory: 'araxxor',
      }),
      singleItem({
        name: 'Noxious pommel',
        collectionLogCategory: 'araxxor',
      }),
      singleItem({
        name: 'Araxyte fang',
        collectionLogCategory: 'araxxor',
      }),
      compoundItem({
        name: 'Amulet of rancour (s)',
        requiredItems: [
          { clogName: 'Noxious blade', ignorePoints: true },
          { clogName: 'Noxious point', ignorePoints: true },
          { clogName: 'Noxious pommel', ignorePoints: true },
          {
            clogName: 'Aranea boots',
            targetDropSources: ['Araxyte#Level 146'],
            ignorePoints: true,
          },
          { clogName: 'Araxyte head', targetDropSources: ['Araxxor'] },
          {
            clogName: 'Zenyte shard',
            targetDropSources: ['Demonic gorilla'],
            ignorePoints: true,
          },
          { clogName: 'Nid', ignorePoints: true },
        ],
        collectionLogCategories: ['araxxor', 'slayer', 'gloughs_experiments'],
      }),
      singleItem({
        name: 'Jar of venom',
        collectionLogCategory: 'araxxor',
      }),
      singleItem({
        name: 'Nid',
        collectionLogCategory: 'araxxor',
      }),
    ],
  },
  'Barbarian Assault': {
    image: formatWikiImageUrl('Penance Runner (wave_4)', 'category'),
    items: [
      singleItem({
        name: 'Pet penance queen',
        collectionLogCategory: 'barbarian_assault',
      }),
    ],
  },
  'Callisto and Artio': {
    image: formatWikiImageUrl('Callisto cub chathead', 'category'),
    items: [
      singleItem({
        name: 'Tyrannical ring',
        collectionLogCategory: 'callisto_and_artio',
        targetDropSources: ['Artio'],
      }),
      singleItem({
        name: 'Claws of callisto',
        collectionLogCategory: 'callisto_and_artio',
        targetDropSources: ['Artio'],
      }),
      singleItem({
        name: 'Voidwaker hilt',
        collectionLogCategory: 'callisto_and_artio',
        targetDropSources: ['Artio'],
      }),
      singleItem({
        name: 'Callisto cub',
        collectionLogCategory: 'callisto_and_artio',
        targetDropSources: ['Artio'],
      }),
    ],
  },
  Cerberus: {
    image: formatWikiImageUrl('Hellpuppy detail', 'category'),
    items: [
      singleItem({
        name: 'Primordial crystal',
        collectionLogCategory: 'cerberus',
      }),
      singleItem({
        name: 'Pegasian crystal',
        collectionLogCategory: 'cerberus',
      }),
      singleItem({
        name: 'Eternal crystal',
        collectionLogCategory: 'cerberus',
      }),
      singleItem({
        name: 'Smouldering stone',
        collectionLogCategory: 'cerberus',
        targetDropSources: ['Cerberus'],
      }),
      singleItem({
        name: 'Jar of souls',
        collectionLogCategory: 'cerberus',
      }),
      singleItem({
        name: 'Hellpuppy',
        collectionLogCategory: 'cerberus',
      }),
    ],
  },
  'Chambers of Xeric': {
    image: formatWikiImageUrl('Olmlet chathead', 'category'),
    items: [
      singleItem({
        name: 'Dexterous prayer scroll',
        image: formatWikiImageUrl('Rigour'),
        collectionLogCategory: 'chambers_of_xeric',
      }),
      singleItem({
        name: 'Arcane prayer scroll',
        image: formatWikiImageUrl('Augury'),
        collectionLogCategory: 'chambers_of_xeric',
      }),
      singleItem({
        name: 'Twisted buckler',
        collectionLogCategory: 'chambers_of_xeric',
      }),
      singleItem({
        name: 'Dragon hunter crossbow',
        collectionLogCategory: 'chambers_of_xeric',
      }),
      singleItem({
        name: "Dinh's bulwark",
        collectionLogCategory: 'chambers_of_xeric',
      }),
      singleItem({
        name: 'Ancestral hat',
        collectionLogCategory: 'chambers_of_xeric',
      }),
      singleItem({
        name: 'Ancestral robe top',
        collectionLogCategory: 'chambers_of_xeric',
      }),
      singleItem({
        name: 'Ancestral robe bottom',
        collectionLogCategory: 'chambers_of_xeric',
      }),
      singleItem({
        name: 'Dragon claws',
        collectionLogCategory: 'chambers_of_xeric',
      }),
      singleItem({
        name: 'Elder maul',
        collectionLogCategory: 'chambers_of_xeric',
      }),
      singleItem({
        name: 'Kodai insignia',
        collectionLogCategory: 'chambers_of_xeric',
      }),
      singleItem({
        name: 'Twisted bow',
        collectionLogCategory: 'chambers_of_xeric',
      }),
      singleItem({
        name: 'Twisted ancestral colour kit',
        collectionLogCategory: 'chambers_of_xeric',
        ignoreDropRateModifier: true,
      }),
      singleItem({
        name: 'Metamorphic dust',
        collectionLogCategory: 'chambers_of_xeric',
        ignoreDropRateModifier: true,
      }),
      singleItem({
        name: 'Olmlet',
        collectionLogCategory: 'chambers_of_xeric',
      }),
    ],
  },
  'Chaos Elemental': {
    image: formatWikiImageUrl('Pet chaos elemental detail', 'category'),
    items: [
      singleItem({
        name: 'Pet chaos elemental',
        collectionLogCategory: 'chaos_elemental',
      }),
    ],
  },
  'Chompy Bird Hunting': {
    image: formatWikiImageUrl('Chompy chick chathead', 'category'),
    items: [
      singleItem({
        name: 'Chompy chick',
        collectionLogCategory: 'chompy_bird_hunting',
      }),
    ],
  },
  'Commander Zilyana': {
    items: [
      singleItem({
        name: 'Saradomin sword',
        collectionLogCategory: 'commander_zilyana',
        targetDropSources: ['Commander Zilyana'],
      }),
      singleItem({
        name: "Saradomin's light",
        collectionLogCategory: 'commander_zilyana',
      }),
      singleItem({
        name: 'Armadyl crossbow',
        collectionLogCategory: 'commander_zilyana',
      }),
      singleItem({
        name: 'Saradomin hilt',
        collectionLogCategory: 'commander_zilyana',
      }),
      singleItem({
        name: 'Pet zilyana',
        collectionLogCategory: 'commander_zilyana',
      }),
    ],
  },
  'Corporeal Beast': {
    items: [
      singleItem({
        name: 'Spirit shield',
        collectionLogCategory: 'corporeal_beast',
      }),
      singleItem({
        name: 'Holy elixir',
        collectionLogCategory: 'corporeal_beast',
      }),
      compoundItem({
        name: 'Spectral spirit shield',
        requiredItems: [
          { clogName: 'Spectral sigil' },
          { clogName: 'Spirit shield', ignorePoints: true },
          { clogName: 'Holy elixir', ignorePoints: true },
        ],
        collectionLogCategories: ['corporeal_beast'],
      }),
      compoundItem({
        name: 'Arcane spirit shield',
        requiredItems: [
          { clogName: 'Arcane sigil' },
          { clogName: 'Spirit shield', ignorePoints: true },
          { clogName: 'Holy elixir', ignorePoints: true },
        ],
        collectionLogCategories: ['corporeal_beast'],
      }),
      compoundItem({
        name: 'Elysian spirit shield',
        requiredItems: [
          { clogName: 'Elysian sigil' },
          { clogName: 'Spirit shield', ignorePoints: true },
          { clogName: 'Holy elixir', ignorePoints: true },
        ],
        collectionLogCategories: ['corporeal_beast'],
      }),
      singleItem({
        name: 'Jar of spirits',
        collectionLogCategory: 'corporeal_beast',
      }),
      singleItem({
        name: 'Pet dark core',
        collectionLogCategory: 'corporeal_beast',
      }),
    ],
  },
  'Dagannoth Kings': {
    image: formatWikiImageUrl('Dagannoth Prime', 'category'),
    items: [
      singleItem({
        name: 'Archers ring',
        collectionLogCategory: 'dagannoth_kings',
      }),
      singleItem({
        name: 'Berserker ring',
        collectionLogCategory: 'dagannoth_kings',
      }),
      singleItem({
        name: 'Seers ring',
        collectionLogCategory: 'dagannoth_kings',
      }),
      singleItem({
        name: 'Warrior ring',
        collectionLogCategory: 'dagannoth_kings',
      }),
      singleItem({
        name: 'Pet dagannoth prime',
        collectionLogCategory: 'dagannoth_kings',
      }),
      singleItem({
        name: 'Pet dagannoth rex',
        collectionLogCategory: 'dagannoth_kings',
      }),
      singleItem({
        name: 'Pet dagannoth supreme',
        collectionLogCategory: 'dagannoth_kings',
      }),
    ],
  },
  'Demonic Gorillas': {
    image: formatWikiImageUrl('Demonic gorilla', 'category'),
    items: [
      compoundItem({
        name: 'Heavy ballista',
        requiredItems: [
          {
            clogName: 'Ballista spring',
            targetDropSources: ['Demonic gorilla'],
          },
          { clogName: 'Monkey tail', targetDropSources: ['Demonic gorilla'] },
          { clogName: 'Heavy frame', targetDropSources: ['Demonic gorilla'] },
          {
            clogName: 'Ballista limbs',
            targetDropSources: ['Demonic gorilla'],
          },
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
          requiredAmount: i + 1,
          collectionLogCategory: 'gloughs_experiments',
          ignoreAmountMultiplier: true,
          targetDropSources: ['Demonic gorilla'],
        }),
      ),
    ],
  },
  'Desert Treasure 2': {
    image: formatWikiImageUrl('Ancient icon detail', 'category'),
    items: [
      singleItem({
        name: "Awakener's orb",
        collectionLogCategory: 'vardorvis',
      }),
      singleItem({
        name: 'Blood quartz',
        collectionLogCategory: 'vardorvis',
      }),
      singleItem({
        name: 'Ice quartz',
        collectionLogCategory: 'duke_sucellus',
      }),
      singleItem({
        name: 'Shadow quartz',
        collectionLogCategory: 'the_whisperer',
      }),
      singleItem({
        name: 'Smoke quartz',
        collectionLogCategory: 'the_leviathan',
      }),
      singleItem({
        name: 'Chromium ingot',
        collectionLogCategory: 'vardorvis',
      }),
      singleItem({
        name: 'Virtus mask',
        collectionLogCategory: 'vardorvis',
      }),
      singleItem({
        name: 'Virtus robe top',
        collectionLogCategory: 'vardorvis',
      }),
      singleItem({
        name: 'Virtus robe bottom',
        collectionLogCategory: 'vardorvis',
      }),
      compoundItem({
        name: 'Bellator ring',
        requiredItems: [
          { clogName: 'Bellator vestige' },
          { clogName: 'Warrior ring', ignorePoints: true },
        ],
        requiredLevels: {
          Magic: 85,
          Crafting: 75,
        },
        collectionLogCategories: ['the_whisperer', 'dagannoth_kings'],
      }),
      compoundItem({
        name: 'Magus ring',
        requiredItems: [
          { clogName: 'Magus vestige' },
          { clogName: 'Seers ring', ignorePoints: true },
        ],
        requiredLevels: {
          Magic: 85,
          Crafting: 75,
        },
        collectionLogCategories: ['duke_sucellus', 'dagannoth_kings'],
      }),
      compoundItem({
        name: 'Ultor ring',
        requiredItems: [
          { clogName: 'Ultor vestige' },
          { clogName: 'Berserker ring', ignorePoints: true },
        ],
        requiredLevels: {
          Magic: 85,
          Crafting: 75,
        },
        collectionLogCategories: ['vardorvis', 'dagannoth_kings'],
      }),
      compoundItem({
        name: 'Venator ring',
        requiredItems: [
          { clogName: 'Venator vestige' },
          { clogName: 'Archers ring', ignorePoints: true },
        ],
        requiredLevels: {
          Magic: 85,
          Crafting: 75,
        },
        collectionLogCategories: ['the_leviathan', 'dagannoth_kings'],
      }),
      compoundItem({
        name: 'Soulreaper axe',
        requiredItems: [
          { clogName: "Leviathan's lure" },
          { clogName: "Siren's staff" },
          { clogName: "Executioner's axe head" },
          { clogName: 'Eye of the duke' },
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
      singleItem({
        name: 'Baron',
        collectionLogCategory: 'duke_sucellus',
      }),
      singleItem({
        name: 'Butch',
        collectionLogCategory: 'vardorvis',
      }),
      singleItem({
        name: "Lil'viathan",
        collectionLogCategory: 'the_leviathan',
      }),
      singleItem({
        name: 'Wisp',
        collectionLogCategory: 'the_whisperer',
      }),
    ],
  },
  'Fortis Colosseum': {
    image: formatWikiImageUrl('Smol heredit detail', 'category'),
    items: [
      singleItem({
        name: 'Sunfire fanatic helm',
        collectionLogCategory: 'fortis_colosseum',
        targetDropSources: ['Rewards Chest (Fortis Colosseum)#Wave 12'],
      }),
      singleItem({
        name: 'Sunfire fanatic cuirass',
        collectionLogCategory: 'fortis_colosseum',
        targetDropSources: ['Rewards Chest (Fortis Colosseum)#Wave 12'],
      }),
      singleItem({
        name: 'Sunfire fanatic chausses',
        collectionLogCategory: 'fortis_colosseum',
        targetDropSources: ['Rewards Chest (Fortis Colosseum)#Wave 12'],
      }),
      singleItem({
        name: 'Echo crystal',
        collectionLogCategory: 'fortis_colosseum',
        targetDropSources: ['Rewards Chest (Fortis Colosseum)#Wave 12'],
      }),
      singleItem({
        name: 'Tonalztics of ralos',
        clogName: 'Tonalztics of ralos (uncharged)',
        collectionLogCategory: 'fortis_colosseum',
        targetDropSources: ['Rewards Chest (Fortis Colosseum)#Wave 12'],
      }),
      singleItem({
        name: 'Smol heredit',
        collectionLogCategory: 'fortis_colosseum',
      }),
    ],
  },
  'General Graardor': {
    image: formatWikiImageUrl('Pet general graardor detail', 'category'),
    items: [
      singleItem({
        name: 'Bandos chestplate',
        collectionLogCategory: 'general_graardor',
        targetDropSources: ['General Graardor'],
      }),
      singleItem({
        name: 'Bandos tassets',
        collectionLogCategory: 'general_graardor',
        targetDropSources: ['General Graardor'],
      }),
      singleItem({
        name: 'Bandos boots',
        collectionLogCategory: 'general_graardor',
        targetDropSources: ['General Graardor'],
      }),
      singleItem({
        name: 'Bandos hilt',
        collectionLogCategory: 'general_graardor',
      }),
      singleItem({
        name: 'Pet general graardor',
        collectionLogCategory: 'general_graardor',
      }),
    ],
  },
  'Grotesque Guardians': {
    image: formatWikiImageUrl('Noon', 'category'),
    items: [
      singleItem({
        name: 'Granite gloves',
        collectionLogCategory: 'grotesque_guardians',
      }),
      singleItem({
        name: 'Granite ring',
        collectionLogCategory: 'grotesque_guardians',
      }),
      singleItem({
        name: 'Granite hammer',
        collectionLogCategory: 'grotesque_guardians',
      }),
      compoundItem({
        name: 'Guardian boots',
        requiredItems: [
          {
            clogName: 'Bandos boots',
            targetDropSources: ['General Graardor'],
            ignorePoints: true,
          },
          { clogName: 'Black tourmaline core' },
        ],
        collectionLogCategories: ['grotesque_guardians', 'general_graardor'],
      }),
      singleItem({
        name: 'Jar of stone',
        collectionLogCategory: 'grotesque_guardians',
      }),
      singleItem({
        name: 'Noon',
        collectionLogCategory: 'grotesque_guardians',
      }),
    ],
  },
  'The Gauntlet': {
    image: formatWikiImageUrl('Corrupted Youngllef chathead', 'category'),
    items: [
      singleItem({
        name: 'Crystal weapon seed',
        collectionLogCategory: 'the_gauntlet',
        targetDropSources: ['Reward Chest (The Gauntlet)#(Corrupted)'],
      }),
      singleItem({
        name: 'Crystal armour seed',
        collectionLogCategory: 'the_gauntlet',
        targetDropSources: ['Reward Chest (The Gauntlet)#(Corrupted)'],
      }),
      singleItem({
        name: 'Enhanced crystal weapon seed (1)',
        clogName: 'Enhanced crystal weapon seed',
        requiredAmount: 1,
        collectionLogCategory: 'the_gauntlet',
        targetDropSources: ['Reward Chest (The Gauntlet)#(Corrupted)'],
      }),
      singleItem({
        name: 'Enhanced crystal weapon seed (2)',
        clogName: 'Enhanced crystal weapon seed',
        requiredAmount: 2,
        collectionLogCategory: 'the_gauntlet',
        targetDropSources: ['Reward Chest (The Gauntlet)#(Corrupted)'],
        ignoreAmountMultiplier: true,
      }),
      singleItem({
        name: 'Youngllef',
        collectionLogCategory: 'the_gauntlet',
        targetDropSources: ['Reward Chest (The Gauntlet)#(Corrupted)'],
      }),
    ],
  },
  'Giant Mole': {
    items: [
      singleItem({
        name: 'Baby mole',
        collectionLogCategory: 'giant_mole',
      }),
    ],
  },
  'The Hueycoatl': {
    items: [
      singleItem({
        name: 'Dragon hunter wand',
        collectionLogCategory: 'hueycoatl',
      }),
      singleItem({
        name: 'Tome of earth',
        clogName: 'Tome of earth (empty)',
        collectionLogCategory: 'hueycoatl',
      }),
      singleItem({
        name: 'Huberte',
        collectionLogCategory: 'hueycoatl',
      }),
    ],
  },
  'Kalphite Queen': {
    items: [
      singleItem({
        name: 'Kalphite princess',
        collectionLogCategory: 'kalphite_queen',
      }),
      singleItem({
        name: 'Jar of sand',
        collectionLogCategory: 'kalphite_queen',
      }),
    ],
  },
  'King Black Dragon': {
    items: [
      singleItem({
        name: 'Prince black dragon',
        collectionLogCategory: 'king_black_dragon',
      }),
    ],
  },
  Kraken: {
    items: [
      singleItem({
        name: 'Trident of the seas (full)',
        collectionLogCategory: 'kraken',
      }),
      singleItem({
        name: 'Kraken tentacle',
        collectionLogCategory: 'kraken',
      }),
      singleItem({
        name: 'Jar of dirt',
        collectionLogCategory: 'kraken',
      }),
      singleItem({
        name: 'Pet kraken',
        collectionLogCategory: 'kraken',
      }),
    ],
  },
  "Kree'arra": {
    image: formatWikiImageUrl("Kree'arra chathead", 'category'),
    items: [
      singleItem({
        name: 'Armadyl helmet',
        collectionLogCategory: 'kree_arra',
        targetDropSources: ["Kree'arra"],
      }),
      singleItem({
        name: 'Armadyl chestplate',
        collectionLogCategory: 'kree_arra',
        targetDropSources: ["Kree'arra"],
      }),
      singleItem({
        name: 'Armadyl chainskirt',
        collectionLogCategory: 'kree_arra',
        targetDropSources: ["Kree'arra"],
      }),
      singleItem({
        name: 'Armadyl hilt',
        collectionLogCategory: 'kree_arra',
      }),
      singleItem({
        name: "Pet kree'arra",
        collectionLogCategory: 'kree_arra',
      }),
    ],
  },
  "K'ril Tsutsaroth": {
    image: formatWikiImageUrl("K'ril Tsutsaroth chathead", 'category'),
    items: [
      singleItem({
        name: 'Steam battlestaff',
        collectionLogCategory: 'kril_tsutsaroth',
      }),
      singleItem({
        name: 'Zamorakian spear',
        collectionLogCategory: 'kril_tsutsaroth',
        targetDropSources: ["K'ril Tsutsaroth"],
      }),
      singleItem({
        name: 'Staff of the dead',
        collectionLogCategory: 'kril_tsutsaroth',
      }),
      singleItem({
        name: 'Zamorak hilt',
        collectionLogCategory: 'kril_tsutsaroth',
      }),
      singleItem({
        name: "Pet k'ril tsutsaroth",
        image: formatWikiImageUrl("K'ril Tsutsaroth Jr. chathead"),
        collectionLogCategory: 'kril_tsutsaroth',
      }),
    ],
  },
  'Major Slayer Items': {
    image: formatWikiImageUrl('Slayer icon (detail)', 'category'),
    items: [
      singleItem({
        name: 'Black mask',
        collectionLogCategory: 'slayer',
        clogName: 'Black mask (10)',
        targetDropSources: ['Cave horror'],
      }),
      singleItem({
        name: 'Leaf-bladed battleaxe',
        collectionLogCategory: 'slayer',
        targetDropSources: ['Kurask'],
      }),
      singleItem({
        name: 'Warped sceptre',
        clogName: 'Warped sceptre (uncharged)',
        collectionLogCategory: 'slayer',
        targetDropSources: ['Warped Terrorbird'],
      }),
      compoundItem({
        name: 'Devout boots',
        requiredItems: [
          {
            clogName: "Drake's tooth",
            targetDropSources: ['Drake'],
          },
          { clogName: 'Holy sandals' },
        ],
        collectionLogCategories: ['slayer', 'medium_treasure_trails'],
      }),
      singleItem({
        name: 'Boots of brimstone',
        clogName: "Drake's claw",
        image: formatWikiImageUrl('Boots of brimstone'),
        collectionLogCategory: 'slayer',
        targetDropSources: ['Drake'],
      }),
      singleItem({
        name: 'Neitiznot faceguard',
        clogName: 'Basilisk jaw',
        image: formatWikiImageUrl('Neitiznot faceguard'),
        collectionLogCategory: 'slayer',
        targetDropSources: ['Basilisk Knight'],
      }),
      singleItem({
        name: 'Abyssal whip',
        collectionLogCategory: 'slayer',
        targetDropSources: ['Abyssal demon#Standard'],
        points: calculateXpOrTimeBasedItemPoints(
          estimatedHoursToObtainAbyssalWhip,
        ),
      }),
      singleItem({
        name: 'Dark bow',
        collectionLogCategory: 'slayer',
        targetDropSources: ['Dark beast'],
      }),
      singleItem({
        name: 'Mist battlestaff',
        collectionLogCategory: 'slayer',
        points: calculateXpOrTimeBasedItemPoints(
          estimatedHoursForImbuedHeart / 3.5,
        ),
      }),
      singleItem({
        name: 'Dust battlestaff',
        collectionLogCategory: 'slayer',
        points: calculateXpOrTimeBasedItemPoints(
          estimatedHoursForImbuedHeart / 3.5,
        ),
      }),
      singleItem({
        name: 'Eternal gem',
        collectionLogCategory: 'slayer',
        points: calculateXpOrTimeBasedItemPoints(estimatedHoursForImbuedHeart),
      }),
      singleItem({
        name: 'Imbued heart',
        collectionLogCategory: 'slayer',
        points: calculateXpOrTimeBasedItemPoints(estimatedHoursForImbuedHeart),
      }),
      singleItem({
        name: 'Aranea boots',
        collectionLogCategory: 'slayer',
        targetDropSources: ['Araxyte#Level 146'],
      }),
    ],
  },
  'Miscellaneous Items': {
    image: formatWikiImageUrl('Inventory', 'category'),
    items: [
      questItem({
        name: 'Barrows gloves',
        points: calculateXpOrTimeBasedItemPoints(
          estimatedHoursToAcquireBarrowsGloves,
        ),
        requiredQuests: ['Recipe for Disaster'],
      }),
      questItem({
        name: 'Book of the dead',
        points: calculateXpOrTimeBasedItemPoints(
          estimatedHoursToAcquireBookOfTheDead,
        ),
        requiredQuests: ['A Kingdom Divided'],
      }),
      singleItem({
        name: 'Bottomless compost bucket',
        collectionLogCategory: 'hespori',
        points: calculateXpOrTimeBasedItemPoints(
          estimatedHoursToObtainBottomlessCompostBucket,
        ),
      }),
      singleItem({
        name: "Bryophyta's essence",
        collectionLogCategory: 'bryophyta',
      }),

      singleItem({
        name: 'Dragon warhammer',
        collectionLogCategory: 'miscellaneous',
      }),
      compoundItem({
        name: 'Graceful set',
        points: calculateXpOrTimeBasedItemPoints(
          estimatedHoursToAcquireGracefulSet,
        ),
        image: formatWikiImageUrl('Graceful hood'),
        requiredItems: [
          { clogName: 'Graceful hood' },
          { clogName: 'Graceful top' },
          { clogName: 'Graceful legs' },
          { clogName: 'Graceful gloves' },
          { clogName: 'Graceful boots' },
          { clogName: 'Graceful cape' },
        ],
        collectionLogCategories: ['rooftop_agility'],
      }),

      baseItem({
        name: 'Music cape',
        points: calculateXpOrTimeBasedItemPoints(
          estimatedHoursToAcquireMusicCape,
        ),
        image: formatWikiImageUrl('Music cape detail'),
      }),
      questItem({
        name: 'Quest cape',
        points: calculateXpOrTimeBasedItemPoints(
          estimatedHoursToAcquireQuestCape,
        ),
        image: formatWikiImageUrl('Quest point cape detail'),
        requiredQuests: Quest.options,
      }),

      singleItem({
        name: 'Ring of endurance',
        clogName: 'Ring of endurance (uncharged)',
        collectionLogCategory: 'hallowed_sepulchre',
      }),
      singleItem({
        name: 'Swift blade',
        points: calculateXpOrTimeBasedItemPoints(
          swiftBladeLmsPointsRequired,
          ehbRates['LMS Points'],
        ),
        collectionLogCategory: 'last_man_standing',
      }),
      singleItem({
        name: 'Tome of fire',
        clogName: 'Tome of fire (empty)',
        collectionLogCategory: 'wintertodt',
      }),
      singleItem({
        name: 'Tome of water',
        clogName: 'Tome of water (empty)',
        collectionLogCategory: 'tempoross',
      }),
      singleItem({
        name: 'Zombie axe',
        clogName: 'Broken zombie axe',
        requiredLevels: {
          Smithing: 65,
        },
        collectionLogCategory: 'miscellaneous',
        targetDropSources: ["Armoured zombie (Zemouregal's Fort)"],
      }),
    ],
  },
  'Miscellaneous Wilderness Items': {
    image:
      'https://oldschool.runescape.wiki/images/Pkskull_%28Steam_Emoticon%29.png',
    items: [
      questItem({
        name: 'Mage Arena 2 cape',
        points: calculateXpOrTimeBasedItemPoints(
          estimatedHoursToAcquireMageArena2Cape,
        ),
        image: formatWikiImageUrl('Imbued zamorak cape'),
        requiredQuests: ['Mage Arena II'],
      }),
      compoundItem({
        name: 'Odium ward',
        requiredItems: [
          { clogName: 'Odium shard 1' },
          { clogName: 'Odium shard 2' },
          { clogName: 'Odium shard 3' },
        ],
        collectionLogCategories: [
          'crazy_archaeologist',
          'scorpia',
          'chaos_fanatic',
        ],
      }),
      compoundItem({
        name: 'Malediction ward',
        requiredItems: [
          { clogName: 'Malediction shard 1' },
          { clogName: 'Malediction shard 2' },
          { clogName: 'Malediction shard 3' },
        ],
        collectionLogCategories: [
          'crazy_archaeologist',
          'scorpia',
          'chaos_fanatic',
        ],
      }),
      singleItem({
        name: 'Dragon pickaxe',
        collectionLogCategory: 'venenatis_and_spindel',
        targetDropSources: ['Artio', 'Spindel', "Calvar'ion"],
      }),
      singleItem({
        name: 'Amulet of eternal glory',
        collectionLogCategory: 'miscellaneous',
        points: calculateXpOrTimeBasedItemPoints(
          1 / eternalGloryDropRate,
          gloriesChargedPerHour,
        ),
      }),
      singleItem({
        name: 'Teleport anchoring scroll',
        collectionLogCategory: 'slayer',
        targetDropSources: ["Zombie Pirate's Locker"],
      }),
    ],
  },
  Nex: {
    image: formatWikiImageUrl('Nexling detail', 'category'),
    items: [
      singleItem({
        name: 'Zaryte vambraces',
        collectionLogCategory: 'nex',
      }),
      singleItem({
        name: 'Nihil horn',
        collectionLogCategory: 'nex',
      }),
      singleItem({
        name: 'Torva full helm',
        clogName: 'Torva full helm (damaged)',
        image: formatWikiImageUrl('Torva full helm'),
        collectionLogCategory: 'nex',
      }),
      singleItem({
        name: 'Torva platebody',
        clogName: 'Torva platebody (damaged)',
        image: formatWikiImageUrl('Torva platebody'),
        collectionLogCategory: 'nex',
      }),
      singleItem({
        name: 'Torva platelegs',
        clogName: 'Torva platelegs (damaged)',
        image: formatWikiImageUrl('Torva platelegs'),
        collectionLogCategory: 'nex',
      }),
      singleItem({
        name: 'Ancient hilt',
        collectionLogCategory: 'nex',
      }),
      singleItem({
        name: 'Nexling',
        collectionLogCategory: 'nex',
      }),
    ],
  },
  'The Nightmare': {
    image: formatWikiImageUrl('Little nightmare chathead', 'category'),
    items: [
      singleItem({
        name: 'Nightmare staff',
        collectionLogCategory: 'the_nightmare',
        targetDropSources: ["Phosani's Nightmare"],
      }),
      singleItem({
        name: "Inquisitor's great helm",
        collectionLogCategory: 'the_nightmare',
        targetDropSources: ["Phosani's Nightmare"],
      }),
      singleItem({
        name: "Inquisitor's hauberk",
        collectionLogCategory: 'the_nightmare',
        targetDropSources: ["Phosani's Nightmare"],
      }),
      singleItem({
        name: "Inquisitor's plateskirt",
        collectionLogCategory: 'the_nightmare',
        targetDropSources: ["Phosani's Nightmare"],
      }),
      singleItem({
        name: "Inquisitor's mace",
        collectionLogCategory: 'the_nightmare',
        targetDropSources: ["Phosani's Nightmare"],
      }),
      singleItem({
        name: 'Eldritch orb',
        collectionLogCategory: 'the_nightmare',
        targetDropSources: ["Phosani's Nightmare"],
      }),
      singleItem({
        name: 'Harmonised orb',
        collectionLogCategory: 'the_nightmare',
        targetDropSources: ["Phosani's Nightmare"],
      }),
      singleItem({
        name: 'Volatile orb',
        collectionLogCategory: 'the_nightmare',
        targetDropSources: ["Phosani's Nightmare"],
      }),
      singleItem({
        name: 'Parasitic egg',
        collectionLogCategory: 'the_nightmare',
        targetDropSources: ["Phosani's Nightmare"],
      }),
      singleItem({
        name: 'Jar of dreams (Nightmare)',
        clogName: 'Jar of dreams',
        collectionLogCategory: 'the_nightmare',
        targetDropSources: ["Phosani's Nightmare"],
      }),
      singleItem({
        name: 'Little nightmare',
        targetDropSources: ["Phosani's Nightmare"],
        collectionLogCategory: 'the_nightmare',
      }),
    ],
  },
  'Perilous Moons': {
    image: formatWikiImageUrl('Blood Moon', 'category'),
    items: [
      singleItem({
        name: 'Eclipse atlatl',
        collectionLogCategory: 'moons_of_peril',
      }),
      singleItem({
        name: 'Eclipse moon helm',
        collectionLogCategory: 'moons_of_peril',
      }),
      singleItem({
        name: 'Eclipse moon chestplate',
        collectionLogCategory: 'moons_of_peril',
      }),
      singleItem({
        name: 'Eclipse moon tassets',
        collectionLogCategory: 'moons_of_peril',
      }),
      singleItem({
        name: 'Dual macuahuitl',
        collectionLogCategory: 'moons_of_peril',
      }),
      singleItem({
        name: 'Blood moon helm',
        collectionLogCategory: 'moons_of_peril',
      }),
      singleItem({
        name: 'Blood moon chestplate',
        collectionLogCategory: 'moons_of_peril',
      }),
      singleItem({
        name: 'Blood moon tassets',
        collectionLogCategory: 'moons_of_peril',
      }),
      singleItem({
        name: 'Blue moon spear',
        collectionLogCategory: 'moons_of_peril',
      }),
      singleItem({
        name: 'Blue moon helm',
        collectionLogCategory: 'moons_of_peril',
      }),
      singleItem({
        name: 'Blue moon chestplate',
        collectionLogCategory: 'moons_of_peril',
      }),
      singleItem({
        name: 'Blue moon tassets',
        collectionLogCategory: 'moons_of_peril',
      }),
    ],
  },
  'Phantom Muspah': {
    image: formatWikiImageUrl('Phantom Muspah (shielded)', 'category'),
    items: [
      singleItem({
        name: 'Ancient sceptre',
        clogName: 'Ancient icon',
        collectionLogCategory: 'phantom_muspah',
        targetDropSources: ['Phantom Muspah'],
      }),
      compoundItem({
        name: 'Venator bow',
        requiredItems: [
          {
            clogName: 'Venator shard',
            amount: 5,
            targetDropSources: ['Phantom Muspah'],
          },
        ],
        collectionLogCategories: ['phantom_muspah'],
      }),
      singleItem({
        name: 'Muphin',
        image: formatWikiImageUrl('Muphin (shielded) chathead'),
        collectionLogCategory: 'phantom_muspah',
      }),
    ],
  },
  Revenants: {
    image: formatWikiImageUrl('Revenant ork', 'category'),
    items: [
      singleItem({
        name: 'Amulet of avarice',
        collectionLogCategory: 'revenants',
        targetDropSources: ['Revenant ork#On-task'],
      }),
      compoundItem({
        name: 'Obelisk',
        image:
          'https://oldschool.runescape.wiki/images/Obelisk_%28Construction%29_built.png',
        requiredItems: [
          {
            clogName: 'Ancient crystal',
            amount: 4,
            targetDropSources: ['Revenant ork'],
          },
        ],
        requiredLevels: {
          Construction: 72,
        },
        collectionLogCategories: ['revenants'],
      }),
      singleItem({
        name: "Viggora's chainmace",
        clogName: "Viggora's chainmace (u)",
        collectionLogCategory: 'revenants',
        targetDropSources: ['Revenant ork#On-task'],
      }),
      singleItem({
        name: "Craw's bow",
        clogName: "Craw's bow (u)",
        collectionLogCategory: 'revenants',
        targetDropSources: ['Revenant ork#On-task'],
      }),
      singleItem({
        name: "Thammaron's sceptre",
        clogName: "Thammaron's sceptre (u)",
        collectionLogCategory: 'revenants',
        targetDropSources: ['Revenant ork#On-task'],
      }),
    ],
  },
  'Royal Titans': {
    image: formatWikiImageUrl('Branda the Fire Queen', 'category'),
    items: [
      singleItem({
        name: 'Deadeye prayer scroll',
        image: formatWikiImageUrl('Deadeye'),
        collectionLogCategory: 'royal_titans',
      }),
      singleItem({
        name: 'Mystic vigour prayer scroll',
        image: formatWikiImageUrl('Mystic Vigour'),
        collectionLogCategory: 'royal_titans',
      }),
      compoundItem({
        name: 'Twinflame staff',
        requiredItems: [
          { clogName: 'Ice element staff crown' },
          { clogName: 'Fire element staff crown' },
        ],
        collectionLogCategories: ['royal_titans'],
      }),
      singleItem({
        name: 'Bran',
        collectionLogCategory: 'royal_titans',
      }),
    ],
  },
  Sarachnis: {
    items: [
      singleItem({
        name: 'Sarachnis cudgel',
        collectionLogCategory: 'sarachnis',
      }),
      singleItem({
        name: 'Jar of eyes',
        collectionLogCategory: 'sarachnis',
      }),
      singleItem({
        name: 'Sraracha',
        collectionLogCategory: 'sarachnis',
      }),
    ],
  },
  Scorpia: {
    items: [
      singleItem({
        name: "Scorpia's offspring",
        collectionLogCategory: 'scorpia',
      }),
    ],
  },
  Scurrius: {
    image: formatWikiImageUrl('Scurry_chathead', 'category'),
    items: [
      singleItem({
        name: 'Scurry',
        collectionLogCategory: 'scurrius',
      }),
    ],
  },
  'Skilling Pets': {
    image: formatWikiImageUrl('Phoenix_detail', 'category'),
    items: Object.entries({
      'Abyssal protector': {},
      'Baby chinchompa': {
        points: calculateXpOrTimeBasedItemPoints(
          petEhcRates['Baby chinchompa'],
        ),
        image: formatWikiImageUrl('Baby chinchompa (gold) chathead'),
      },
      Beaver: {
        points: calculateXpOrTimeBasedItemPoints(petEhcRates.Beaver),
      },
      'Giant squirrel': {
        points: calculateXpOrTimeBasedItemPoints(petEhcRates['Giant squirrel']),
      },
      Herbi: {},
      Heron: {
        points: calculateXpOrTimeBasedItemPoints(petEhcRates.Heron),
      },
      Phoenix: {
        points: calculateXpOrTimeBasedItemPoints(petEhcRates.Phoenix),
      },
      Quetzin: {
        targetDropSources: ["Hunters' loot sack (expert)"],
      },
      'Rift guardian': {
        points: calculateXpOrTimeBasedItemPoints(petEhcRates['Rift guardian']),
        image: formatWikiImageUrl('Rift guardian (follower, fire)'),
      },
      'Rock golem': {
        points: calculateXpOrTimeBasedItemPoints(petEhcRates['Rock golem']),
      },
      Rocky: {
        points: calculateXpOrTimeBasedItemPoints(petEhcRates.Rocky),
      },
      Tangleroot: {
        points: calculateXpOrTimeBasedItemPoints(petEhcRates.Tangleroot),
      },
      'Tiny tempor': {},
    } satisfies Partial<
      Record<
        CollectionLogItemName,
        {
          points?: number;
          image?: string;
          targetDropSources?: NonEmptyArray<string>;
        }
      >
    >).map(
      ([
        name,
        { points, image = formatWikiImageUrl(name), targetDropSources },
      ]) =>
        singleItem({
          name,
          points,
          image,
          collectionLogCategory: 'all_pets',
          targetDropSources,
        }),
    ) as NonEmptyArray<Item>,
  },
  Skotizo: {
    image: formatWikiImageUrl('Skotos_detail', 'category'),
    items: [
      singleItem({
        name: 'Jar of darkness',
        collectionLogCategory: 'skotizo',
      }),
      singleItem({
        name: 'Skotos',
        collectionLogCategory: 'skotizo',
      }),
    ],
  },
  'Soul Wars': {
    image: formatWikiImageUrl("Lil' Creator chathead", 'category'),
    items: [
      singleItem({
        name: "Lil' creator",
        collectionLogCategory: 'soul_wars',
      }),
    ],
  },
  'Theatre of Blood': {
    image: formatWikiImageUrl('Verzik Vitur (final form)', 'category'),
    items: [
      singleItem({
        name: 'Avernic defender hilt',
        collectionLogCategory: 'theatre_of_blood',
        targetDropSources: ['Monumental chest#Normal Mode'],
      }),
      singleItem({
        name: 'Justiciar faceguard',
        collectionLogCategory: 'theatre_of_blood',
        targetDropSources: ['Monumental chest#Normal Mode'],
      }),
      singleItem({
        name: 'Justiciar chestguard',
        collectionLogCategory: 'theatre_of_blood',
        targetDropSources: ['Monumental chest#Normal Mode'],
      }),
      singleItem({
        name: 'Justiciar legguards',
        collectionLogCategory: 'theatre_of_blood',
        targetDropSources: ['Monumental chest#Normal Mode'],
      }),
      singleItem({
        name: 'Ghrazi rapier',
        collectionLogCategory: 'theatre_of_blood',
        targetDropSources: ['Monumental chest#Normal Mode'],
      }),
      singleItem({
        name: 'Sanguinesti staff',
        clogName: 'Sanguinesti staff (uncharged)',
        collectionLogCategory: 'theatre_of_blood',
        targetDropSources: ['Monumental chest#Normal Mode'],
      }),
      singleItem({
        name: 'Scythe of vitur',
        clogName: 'Scythe of vitur (uncharged)',
        collectionLogCategory: 'theatre_of_blood',
        targetDropSources: ['Monumental chest#Normal Mode'],
      }),
      singleItem({
        name: 'Holy ornament kit',
        collectionLogCategory: 'theatre_of_blood',
      }),
      singleItem({
        name: 'Sanguine ornament kit',
        collectionLogCategory: 'theatre_of_blood',
      }),
      singleItem({
        name: 'Sanguine dust',
        collectionLogCategory: 'theatre_of_blood',
      }),
      singleItem({
        name: "Lil' zik",
        collectionLogCategory: 'theatre_of_blood',
      }),
    ],
  },
  'Thermonuclear Smoke Devil': {
    image: formatWikiImageUrl('Pet smoke devil chathead', 'category'),
    items: [
      singleItem({
        name: 'Occult necklace',
        collectionLogCategory: 'thermonuclear_smoke_devil',
        targetDropSources: ['Thermonuclear smoke devil'],
      }),
      singleItem({
        name: 'Smoke battlestaff',
        collectionLogCategory: 'thermonuclear_smoke_devil',
      }),
      singleItem({
        name: 'Jar of smoke',
        collectionLogCategory: 'thermonuclear_smoke_devil',
      }),
      singleItem({
        name: 'Pet smoke devil',
        collectionLogCategory: 'thermonuclear_smoke_devil',
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
        collectionLogCategory: 'tombs_of_amascut',
      }),
      singleItem({
        name: 'Eye of the corruptor',
        collectionLogCategory: 'tombs_of_amascut',
      }),
      singleItem({
        name: 'Jewel of the sun',
        collectionLogCategory: 'tombs_of_amascut',
      }),
      singleItem({
        name: 'Breach of the scarab',
        collectionLogCategory: 'tombs_of_amascut',
      }),
      singleItem({
        name: "Osmumten's fang",
        collectionLogCategory: 'tombs_of_amascut',
      }),
      singleItem({
        name: 'Lightbearer',
        collectionLogCategory: 'tombs_of_amascut',
      }),
      singleItem({
        name: "Elidinis' ward",
        collectionLogCategory: 'tombs_of_amascut',
      }),
      singleItem({
        name: 'Masori mask',
        collectionLogCategory: 'tombs_of_amascut',
      }),
      singleItem({
        name: 'Masori body',
        collectionLogCategory: 'tombs_of_amascut',
      }),
      singleItem({
        name: 'Masori chaps',
        collectionLogCategory: 'tombs_of_amascut',
      }),
      singleItem({
        name: "Tumeken's shadow",
        clogName: "Tumeken's shadow (uncharged)",
        collectionLogCategory: 'tombs_of_amascut',
      }),
      singleItem({
        name: 'Masori crafting kit',
        collectionLogCategory: 'tombs_of_amascut',
      }),
      singleItem({
        name: 'Menaphite ornament kit',
        collectionLogCategory: 'tombs_of_amascut',
      }),
      singleItem({
        name: 'Remnant of akkha',
        collectionLogCategory: 'tombs_of_amascut',
      }),
      singleItem({
        name: 'Remnant of ba-ba',
        collectionLogCategory: 'tombs_of_amascut',
      }),
      singleItem({
        name: 'Remnant of kephri',
        collectionLogCategory: 'tombs_of_amascut',
      }),
      singleItem({
        name: 'Remnant of zebak',
        collectionLogCategory: 'tombs_of_amascut',
      }),
      singleItem({
        name: 'Ancient remnant',
        collectionLogCategory: 'tombs_of_amascut',
      }),
      singleItem({
        name: 'Cursed phalanx',
        collectionLogCategory: 'tombs_of_amascut',
      }),
      singleItem({
        name: "Tumeken's guardian",
        collectionLogCategory: 'tombs_of_amascut',
      }),
    ],
  },
  'Tormented Demons': {
    image: formatWikiImageUrl('Tormented Demon (1)', 'category'),
    items: [
      compoundItem({
        name: 'Burning claws',
        requiredItems: [{ clogName: 'Burning claw', amount: 2 }],
        collectionLogCategories: ['tormented_demons'],
      }),
      ...Array.from({ length: 3 }).map((_, i) =>
        singleItem({
          name: `Tormented synapse (${i + 1})`,
          clogName: 'Tormented synapse',
          requiredAmount: i + 1,
          collectionLogCategory: 'tormented_demons',
          ignoreAmountMultiplier: true,
        }),
      ),
    ],
  },
  'Treasure Trails': {
    image: formatWikiImageUrl('Clue scroll (master) detail', 'category'),
    items: [
      singleItem({
        name: 'Ranger boots',
        collectionLogCategory: 'medium_treasure_trails',
      }),
      singleItem({
        name: 'Ham joint',
        collectionLogCategory: 'easy_treasure_trails',
      }),
      singleItem({
        name: 'Bloodhound',
        collectionLogCategory: 'master_treasure_trails',
      }),
    ],
  },
  TzHaar: {
    image: formatWikiImageUrl('TzKal-Zuk', 'category'),
    items: [
      combatAchievementItem({
        name: '6 Jads',
        points: calculateXpOrTimeBasedItemPoints(estimatedHoursToComplete6Jads),
        image: formatWikiImageUrl('TzTok-Jad'),
        requiredCombatAchievements: [
          363, // https://oldschool.runescape.wiki/w/The_VI_Jad_Challenge
        ],
      }),
      singleItem({
        name: 'Jal-nib-rek',
        collectionLogCategory: 'the_inferno',
      }),
      singleItem({
        name: 'Tzrek-jad',
        collectionLogCategory: 'the_fight_caves',
      }),
    ],
  },
  'Venenatis and Spindel': {
    image: formatWikiImageUrl('Venenatis spiderling chathead', 'category'),
    items: [
      singleItem({
        name: 'Treasonous ring',
        collectionLogCategory: 'venenatis_and_spindel',
        targetDropSources: ['Spindel'],
      }),
      singleItem({
        name: 'Fangs of venenatis',
        collectionLogCategory: 'venenatis_and_spindel',
        targetDropSources: ['Spindel'],
      }),
      singleItem({
        name: 'Voidwaker gem',
        collectionLogCategory: 'venenatis_and_spindel',
        targetDropSources: ['Spindel'],
      }),
      singleItem({
        name: 'Venenatis spiderling',
        collectionLogCategory: 'venenatis_and_spindel',
        targetDropSources: ['Spindel'],
      }),
    ],
  },
  "Vet'ion and Calvar'ion": {
    image: formatWikiImageUrl("Vet'ion jr. chathead", 'category'),
    items: [
      singleItem({
        name: 'Ring of the gods',
        collectionLogCategory: 'vetion_and_calvarion',
        targetDropSources: ["Calvar'ion"],
      }),
      singleItem({
        name: "Skull of vet'ion",
        collectionLogCategory: 'vetion_and_calvarion',
        targetDropSources: ["Calvar'ion"],
      }),
      singleItem({
        name: 'Voidwaker blade',
        collectionLogCategory: 'vetion_and_calvarion',
        targetDropSources: ["Calvar'ion"],
      }),
      singleItem({
        name: "Vet'ion jr.",
        collectionLogCategory: 'vetion_and_calvarion',
        targetDropSources: ["Calvar'ion"],
      }),
    ],
  },
  Visages: {
    image: formatWikiImageUrl('Draconic visage detail', 'category'),
    items: [
      singleItem({
        name: 'Dragonfire shield',
        clogName: 'Draconic visage',
        image: formatWikiImageUrl('Dragonfire shield'),
        collectionLogCategory: 'slayer',
        targetDropSources: ['Black dragon#Wilderness Slayer Cave'],
      }),
      singleItem({
        name: 'Dragonfire ward',
        clogName: 'Skeletal visage',
        image: formatWikiImageUrl('Dragonfire ward'),
        collectionLogCategory: 'vorkath',
      }),
      singleItem({
        name: 'Ancient wyvern shield',
        clogName: 'Wyvern visage',
        image: formatWikiImageUrl('Ancient wyvern shield'),
        collectionLogCategory: 'slayer',
        targetDropSources: ['Spitting Wyvern'],
      }),
    ],
  },
  Vorkath: {
    image: formatWikiImageUrl('Vorki detail', 'category'),
    items: [
      singleItem({
        name: "Vorkath's head",
        collectionLogCategory: 'vorkath',
      }),
      singleItem({
        name: 'Dragonbone necklace',
        collectionLogCategory: 'vorkath',
      }),
      singleItem({
        name: 'Jar of decay',
        collectionLogCategory: 'vorkath',
      }),
      singleItem({
        name: 'Vorki',
        collectionLogCategory: 'vorkath',
      }),
    ],
  },
  Yama: {
    image: formatWikiImageUrl('Yami chathead', 'category'),
    items: [
      singleItem({
        name: 'Soulflame horn',
        collectionLogCategory: 'yama',
        targetDropSources: ['Yama'],
      }),
      singleItem({
        name: 'Oathplate helm',
        collectionLogCategory: 'yama',
        targetDropSources: ['Yama'],
      }),
      singleItem({
        name: 'Oathplate chest',
        collectionLogCategory: 'yama',
        targetDropSources: ['Yama'],
      }),
      singleItem({
        name: 'Oathplate legs',
        collectionLogCategory: 'yama',
        targetDropSources: ['Yama'],
      }),
      singleItem({
        name: 'Yami',
        collectionLogCategory: 'yama',
        targetDropSources: ['Yama']
      }),
    ],
  },
  Zalcano: {
    image: formatWikiImageUrl('Smolcano_chathead', 'category'),
    items: [
      singleItem({
        name: 'Smolcano',
        collectionLogCategory: 'zalcano',
      }),
      singleItem({
        name: 'Crystal tool seed',
        collectionLogCategory: 'zalcano',
      }),
    ],
  },
  Zulrah: {
    image: formatWikiImageUrl('Snakeling (tanzanite)', 'category'),
    items: [
      singleItem({
        name: 'Toxic blowpipe',
        clogName: 'Tanzanite fang',
        image: formatWikiImageUrl('Toxic blowpipe'),
        requiredLevels: {
          Fletching: 73,
        },
        collectionLogCategory: 'zulrah',
      }),
      singleItem({
        name: 'Magic fang',
        collectionLogCategory: 'zulrah',
      }),
      singleItem({
        name: 'Serpentine visage',
        image: formatWikiImageUrl('Serpentine helm'),
        collectionLogCategory: 'zulrah',
      }),
      singleItem({
        name: 'Tanzanite mutagen',
        collectionLogCategory: 'zulrah',
      }),
      singleItem({
        name: 'Magma mutagen',
        collectionLogCategory: 'zulrah',
      }),
      singleItem({
        name: 'Jar of swamp',
        collectionLogCategory: 'zulrah',
      }),
      singleItem({
        name: 'Pet snakeling',
        collectionLogCategory: 'zulrah',
      }),
    ],
  },
} satisfies ItemCategoryMap;
