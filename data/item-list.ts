import { calculateXpOrTimeBasedItemPoints } from '@/app/rank-calculator/utils/calculate-xp-or-time-based-item-points';
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
import { ehpRates } from '@/config/efficiency-rates';

type SingleItemOptions = Omit<
  OptionalKeys<CollectionLogItem, 'image' | 'points'>,
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
  isAutomatic,
  collectionLogCategory,
  targetDropSources,
  ignoreDropRateModifier,
  ignoreAmountMultiplier,
}: SingleItemOptions) {
  return CollectionLogItem.parse({
    image,
    name,
    points,
    requiredItems: [
      {
        amount: requiredAmount,
        clogName: clogName ?? name,
        targetDropSources,
        ignoreDropRateModifier,
        ignoreAmountMultiplier,
      },
    ],
    isAutomatic,
    collectionLogCategories: [collectionLogCategory],
  });
}

type CompoundItemOptions = Omit<
  OptionalKeys<CollectionLogItem, 'image' | 'points'>,
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
  isAutomatic,
  collectionLogCategories,
}: CompoundItemOptions) {
  return CollectionLogItem.parse({
    image,
    name,
    points,
    requiredItems: requiredItems.map<RequiredItem>(
      ({ amount = 1, ...item }) => ({
        ...item,
        amount,
      }),
    ),
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

const estimatedSlayerXpForImbuedHeart = 25000000;
const estimatedFishingXpForHeron = 10112800;
const eternalGloryDropRate = 1 / 25000;
const gloriesChargedPerHour = 600;

export const itemList = {
  'Automatic Items': {
    image: formatWikiImageUrl('Black cog detail', 'category'),
    items: [
      customItem({
        name: 'Achievement Diary Cape',
        points: 10000000000,
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
        points: 10000000000,
        image: formatWikiImageUrl('Max cape detail'),
        isAcquired({ totalLevel }) {
          return totalLevel === maximumTotalLevel;
        },
        isAutomatic: true,
      }),
      customItem({
        name: 'Infernal Max Cape',
        points: 10000000000,
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
        points: 10000000000,
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
    ],
  },
  Araxxor: {
    items: [
      singleItem({
        name: 'Coagulated venom',
        points: 10000000000,
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
          { clogName: 'Noxious blade' },
          { clogName: 'Noxious point' },
          { clogName: 'Noxious pommel' },
          {
            clogName: 'Aranea boots',
            targetDropSources: ['Araxyte#Level 146'],
          },
          { clogName: 'Araxyte head', targetDropSources: ['Araxxor'] },
          { clogName: 'Zenyte shard', targetDropSources: ['Demonic gorilla'] },
          { clogName: 'Nid' },
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
      }),
      singleItem({
        name: 'Metamorphic dust',
        collectionLogCategory: 'chambers_of_xeric',
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
          { clogName: 'Spirit shield' },
          { clogName: 'Spectral sigil' },
          { clogName: 'Holy elixir' },
        ],
        collectionLogCategories: ['corporeal_beast'],
      }),
      compoundItem({
        name: 'Arcane spirit shield',
        requiredItems: [
          { clogName: 'Spirit shield' },
          { clogName: 'Arcane sigil' },
          { clogName: 'Holy elixir' },
        ],
        collectionLogCategories: ['corporeal_beast'],
      }),
      compoundItem({
        name: 'Elysian spirit shield',
        requiredItems: [
          { clogName: 'Spirit shield' },
          { clogName: 'Elysian sigil' },
          { clogName: 'Holy elixir' },
        ],
        collectionLogCategories: ['corporeal_beast'],
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
          { clogName: 'Warrior ring' },
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
          { clogName: 'Seers ring' },
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
          { clogName: 'Berserker ring' },
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
          { clogName: 'Archers ring' },
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
      combatAchievementItem({
        name: 'Ancient blood ornament kit',
        points: 10000000000,
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
        collectionLogCategory: 'fortis_colosseum',
        points: 10000000000,
      }),
      singleItem({
        name: 'Sunfire fanatic cuirass',
        collectionLogCategory: 'fortis_colosseum',
        points: 10000000000,
      }),
      singleItem({
        name: 'Sunfire fanatic chausses',
        collectionLogCategory: 'fortis_colosseum',
        points: 10000000000,
      }),
      singleItem({
        name: 'Echo crystal',
        collectionLogCategory: 'fortis_colosseum',
        points: 10000000000,
      }),
      singleItem({
        name: 'Tonalztics of ralos',
        clogName: 'Tonalztics of ralos (uncharged)',
        collectionLogCategory: 'fortis_colosseum',
        points: 10000000000,
      }),
      singleItem({
        name: "Dizana's quiver",
        clogName: "Dizana's quiver (uncharged)",
        points: 10000000000,
        collectionLogCategory: 'fortis_colosseum',
      }),
      manualItem({
        name: "Blessed dizana's quiver",
        points: 10000000000,
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
          { clogName: 'Bandos boots', targetDropSources: ['General Graardor'] },
          { clogName: 'Black tourmaline core' },
        ],
        collectionLogCategories: ['grotesque_guardians', 'general_graardor'],
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
    ],
  },
  Sarachnis: {
    items: [
      singleItem({
        name: 'Sarachnis cudgel',
        collectionLogCategory: 'sarachnis',
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
  'TzHaar Challenges': {
    image: formatWikiImageUrl('TzKal-Zuk', 'category'),
    items: [
      singleItem({
        name: 'Fire cape',
        points: 10000000000,
        collectionLogCategory: 'the_fight_caves',
      }),
      singleItem({
        name: 'Infernal cape',
        points: 10000000000,
        collectionLogCategory: 'the_inferno',
      }),
      combatAchievementItem({
        name: '6 Jads',
        points: 10000000000,
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
        collectionLogCategory: 'vorkath',
      }),
      singleItem({
        name: 'Dragonbone necklace',
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
        points: 10000000000,
      }),
      singleItem({
        name: 'Jewel of the sun',
        collectionLogCategory: 'tombs_of_amascut',
        points: 10000000000,
      }),
      singleItem({
        name: 'Breach of the scarab',
        collectionLogCategory: 'tombs_of_amascut',
        points: 10000000000,
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
        points: 10000000000,
      }),
      singleItem({
        name: 'Menaphite ornament kit',
        collectionLogCategory: 'tombs_of_amascut',
        points: 10000000000,
      }),
      singleItem({
        name: 'Remnant of akkha',
        collectionLogCategory: 'tombs_of_amascut',
        points: 10000000000,
      }),
      singleItem({
        name: 'Remnant of ba-ba',
        collectionLogCategory: 'tombs_of_amascut',
        points: 10000000000,
      }),
      singleItem({
        name: 'Remnant of kephri',
        collectionLogCategory: 'tombs_of_amascut',
        points: 10000000000,
      }),
      singleItem({
        name: 'Remnant of zebak',
        collectionLogCategory: 'tombs_of_amascut',
        points: 10000000000,
      }),
      singleItem({
        name: 'Ancient remnant',
        collectionLogCategory: 'tombs_of_amascut',
        points: 10000000000,
      }),
      singleItem({
        name: 'Cursed phalanx',
        collectionLogCategory: 'tombs_of_amascut',
        points: 10000000000,
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
      manualItem({
        name: 'Saturated heart',
        points: 10000000000,
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
    ],
  },
  'Wilderness items': {
    image:
      'https://oldschool.runescape.wiki/images/Pkskull_%28Steam_Emoticon%29.png',
    items: [
      questItem({
        name: 'Mage Arena 2 cape',
        points: 10000000000,
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
        targetDropSources: ['Callisto', 'Venenatis', "Vet'ion"],
      }),
      singleItem({
        name: 'Ring of the gods',
        collectionLogCategory: 'vetion_and_calvarion',
        targetDropSources: ["Vet'ion"],
      }),
      singleItem({
        name: 'Treasonous ring',
        collectionLogCategory: 'venenatis_and_spindel',
        targetDropSources: ['Venenatis'],
      }),
      singleItem({
        name: 'Tyrannical ring',
        collectionLogCategory: 'callisto_and_artio',
        targetDropSources: ['Callisto'],
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
        name: 'Claws of callisto',
        collectionLogCategory: 'callisto_and_artio',
        targetDropSources: ['Callisto'],
      }),
      singleItem({
        name: "Craw's bow",
        clogName: "Craw's bow (u)",
        collectionLogCategory: 'revenants',
        targetDropSources: ['Revenant ork#On-task'],
      }),
      singleItem({
        name: 'Fangs of venenatis',
        collectionLogCategory: 'venenatis_and_spindel',
        targetDropSources: ['Venenatis'],
      }),
      singleItem({
        name: "Thammaron's sceptre",
        clogName: "Thammaron's sceptre (u)",
        collectionLogCategory: 'revenants',
        targetDropSources: ['Revenant ork#On-task'],
      }),
      singleItem({
        name: "Skull of vet'ion",
        collectionLogCategory: 'vetion_and_calvarion',
        targetDropSources: ["Vet'ion"],
      }),
      compoundItem({
        name: 'Voidwaker',
        requiredItems: [
          { clogName: 'Voidwaker hilt', targetDropSources: ['Callisto'] },
          { clogName: 'Voidwaker gem', targetDropSources: ['Venenatis'] },
          { clogName: 'Voidwaker blade', targetDropSources: ["Vet'ion"] },
        ],
        collectionLogCategories: [
          'vetion_and_calvarion',
          'callisto_and_artio',
          'venenatis_and_spindel',
        ],
      }),
      singleItem({
        name: 'Teleport anchoring scroll',
        collectionLogCategory: 'slayer',
        targetDropSources: ["Zombie Pirate's Locker"],
      }),
    ],
  },
  'Major Slayer Items': {
    image: formatWikiImageUrl('Slayer icon (detail)', 'category'),
    items: [
      manualItem({
        name: 'Slayer helmet (i)',
        points: 10000000000,
      }),
      singleItem({
        name: 'Leaf-bladed battleaxe',
        collectionLogCategory: 'slayer',
      }),
      singleItem({
        name: 'Warped sceptre',
        clogName: 'Warped sceptre (uncharged)',
        collectionLogCategory: 'slayer',
      }),
      compoundItem({
        name: 'Devout boots',
        requiredItems: [
          { clogName: "Drake's tooth" },
          { clogName: 'Holy sandals' },
        ],
        collectionLogCategories: ['slayer', 'medium_treasure_trails'],
      }),
      singleItem({
        name: 'Boots of brimstone',
        clogName: "Drake's claw",
        image: formatWikiImageUrl('Boots of brimstone'),
        collectionLogCategory: 'slayer',
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
      }),
      singleItem({
        name: 'Dark bow',
        collectionLogCategory: 'slayer',
      }),
      singleItem({
        name: 'Mist battlestaff',
        collectionLogCategory: 'slayer',
        points: calculateXpOrTimeBasedItemPoints(
          estimatedSlayerXpForImbuedHeart / 3.5,
          ehpRates.Slayer,
        ),
      }),
      singleItem({
        name: 'Dust battlestaff',
        collectionLogCategory: 'slayer',
        points: calculateXpOrTimeBasedItemPoints(
          estimatedSlayerXpForImbuedHeart / 3.5,
          ehpRates.Slayer,
        ),
      }),
      singleItem({
        name: 'Eternal gem',
        collectionLogCategory: 'slayer',
        points: calculateXpOrTimeBasedItemPoints(
          estimatedSlayerXpForImbuedHeart,
          ehpRates.Slayer,
        ),
      }),
      singleItem({
        name: 'Imbued heart',
        collectionLogCategory: 'slayer',
        points: calculateXpOrTimeBasedItemPoints(
          estimatedSlayerXpForImbuedHeart,
          ehpRates.Slayer,
        ),
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
  'Misc Items': {
    image: formatWikiImageUrl('Inventory', 'category'),
    items: [
      questItem({
        name: 'Barrows gloves',
        points: 10000000000,
        requiredQuests: ['Recipe for Disaster'],
      }),
      questItem({
        name: 'Book of the dead',
        points: 10000000000,
        requiredQuests: ['A Kingdom Divided'],
      }),
      singleItem({
        name: 'Bottomless compost bucket',
        collectionLogCategory: 'hespori',
      }),
      singleItem({
        name: "Bryophyta's essence",
        collectionLogCategory: 'bryophyta',
      }),
      singleItem({
        name: 'Crystal tool seed',
        collectionLogCategory: 'zalcano',
        points: 10000000000,
      }),
      singleItem({
        name: 'Dragon warhammer',
        collectionLogCategory: 'miscellaneous',
      }),
      compoundItem({
        name: 'Graceful set',
        points: 10000000000,
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
      singleItem({
        name: 'Ham joint',
        collectionLogCategory: 'easy_treasure_trails',
      }),
      customItem({
        name: 'Music cape',
        points: 10000000000,
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
        points: 10000000000,
        image: formatWikiImageUrl('Quest point cape detail'),
        requiredQuests: Quest.options,
      }),
      singleItem({
        name: 'Ranger boots',
        collectionLogCategory: 'medium_treasure_trails',
      }),
      singleItem({
        name: 'Ring of endurance',
        clogName: 'Ring of endurance (uncharged)',
        collectionLogCategory: 'hallowed_sepulchre',
      }),
      singleItem({
        name: 'Swift blade',
        points: 10000000000,
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
  Jars: {
    image: formatWikiImageUrl('Jar of venom', 'category'),
    items: [
      singleItem({
        name: 'Jar of chemicals (Hydra)',
        clogName: 'Jar of chemicals',
        collectionLogCategory: 'alchemical_hydra',
      }),
      singleItem({
        name: 'Jar of darkness (Skotizo)',
        clogName: 'Jar of darkness',
        collectionLogCategory: 'skotizo',
      }),
      singleItem({
        name: 'Jar of decay (Vorkath)',
        clogName: 'Jar of decay',
        collectionLogCategory: 'vorkath',
      }),
      singleItem({
        name: 'Jar of dirt (Kraken)',
        clogName: 'Jar of dirt',
        collectionLogCategory: 'kraken',
      }),
      singleItem({
        name: 'Jar of dreams (Nightmare)',
        clogName: 'Jar of dreams',
        collectionLogCategory: 'the_nightmare',
      }),
      singleItem({
        name: 'Jar of eyes (Sarachnis)',
        clogName: 'Jar of eyes',
        collectionLogCategory: 'sarachnis',
      }),
      singleItem({
        name: 'Jar of miasma (Sire)',
        clogName: 'Jar of miasma',
        collectionLogCategory: 'abyssal_sire',
      }),
      singleItem({
        name: 'Jar of sand (Kalphite Queen)',
        clogName: 'Jar of sand',
        collectionLogCategory: 'kalphite_queen',
      }),
      singleItem({
        name: 'Jar of smoke (Thermy)',
        clogName: 'Jar of smoke',
        collectionLogCategory: 'thermonuclear_smoke_devil',
      }),
      singleItem({
        name: 'Jar of souls (Cerberus)',
        clogName: 'Jar of souls',
        collectionLogCategory: 'cerberus',
      }),
      singleItem({
        name: 'Jar of spirits (Corp)',
        clogName: 'Jar of spirits',
        collectionLogCategory: 'corporeal_beast',
      }),
      singleItem({
        name: 'Jar of stone (GGs)',
        clogName: 'Jar of stone',
        collectionLogCategory: 'grotesque_guardians',
      }),
      singleItem({
        name: 'Jar of swamp (Zulrah)',
        clogName: 'Jar of swamp',
        collectionLogCategory: 'zulrah',
      }),
      singleItem({
        name: 'Jar of venom (Araxxor)',
        clogName: 'Jar of venom',
        collectionLogCategory: 'araxxor',
      }),
    ],
  },
  Pets: {
    image: formatWikiImageUrl('Nid', 'category'),
    items: Object.entries({
      'Abyssal orphan': {},
      'Abyssal protector': {},
      'Baby chinchompa': {
        points: 10000000000,
        image: formatWikiImageUrl('Baby chinchompa (gold) chathead'),
      },
      'Baby mole': {},
      Baron: {},
      Beaver: {
        points: 10000000000,
      },
      Bloodhound: {},
      Bran: {},
      Butch: {},
      'Callisto cub': {
        targetDropSources: ['Callisto'],
      },
      'Chompy chick': {},
      'Giant squirrel': {
        points: 10000000000,
      },
      Hellpuppy: {},
      Herbi: {},
      Heron: {
        points: calculateXpOrTimeBasedItemPoints(
          estimatedFishingXpForHeron,
          ehpRates.Fishing,
        ),
      },
      Huberte: {},
      'Ikkle hydra': {
        image: formatWikiImageUrl('Ikkle Hydra (serpentine) chathead'),
      },
      'Jal-nib-rek': {},
      'Kalphite princess': {},
      "Lil' creator": {},
      "Lil'viathan": {},
      "Lil' zik": {},
      'Little nightmare': {
        targetDropSources: ["Phosani's Nightmare"],
      },
      Muphin: {
        image: formatWikiImageUrl('Muphin (shielded) chathead'),
      },
      Nexling: {},
      Nid: {},
      Noon: {},
      Olmlet: {},
      'Pet chaos elemental': {},
      'Pet dagannoth prime': {},
      'Pet dagannoth rex': {},
      'Pet dagannoth supreme': {},
      'Pet dark core': {},
      'Pet general graardor': {},
      'Pet kraken': {},
      "Pet kree'arra": {},
      "Pet k'ril tsutsaroth": {
        image: formatWikiImageUrl("K'ril Tsutsaroth Jr. chathead"),
      },
      'Pet penance queen': {},
      'Pet smoke devil': {},
      'Pet snakeling': {},
      'Pet zilyana': {},
      Phoenix: {},
      'Prince black dragon': {},
      Quetzin: {
        targetDropSources: ["Hunters' loot sack (expert)"],
      },
      'Rift guardian': {
        points: 10000000000,
        image: formatWikiImageUrl('Rift guardian (follower, fire)'),
      },
      'Rock golem': {
        points: 10000000000,
      },
      Rocky: {
        points: 10000000000,
      },
      "Scorpia's offspring": {},
      Scurry: {},
      Skotos: {},
      Smolcano: {},
      'Smol heredit': {},
      Sraracha: {},
      Tangleroot: {
        points: 10000000000,
      },
      'Tiny tempor': {},
      "Tumeken's guardian": {},
      'Tzrek-jad': {},
      'Venenatis spiderling': {
        targetDropSources: ['Venenatis'],
      },
      "Vet'ion jr.": {
        targetDropSources: ["Vet'ion"],
      },
      Vorki: {},
      Wisp: {},
      Youngllef: {
        targetDropSources: ['Reward Chest (The Gauntlet)#(Corrupted)'],
      },
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
} satisfies ItemCategoryMap;
