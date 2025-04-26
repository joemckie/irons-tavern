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
  OptionalKeys<CollectionLogItem, 'image' | 'points'>,
  'requiredItems' | 'collectionLogCategories'
> & {
  clogName?: CollectionLogItemName;
  requiredAmount?: number;
  collectionLogCategory: TempleOSRSCollectionLogCategory;
  targetDropSources?: RequiredItem['targetDropSources'];
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
  requiredItems: NonEmptyArray<{
    item: CollectionLogItemName;
    amount?: number;
    targetDropSources?: RequiredItem['targetDropSources'];
  }>;
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
      ({ item: clogName, amount = 1, targetDropSources }) => ({
        amount,
        clogName,
        targetDropSources,
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
          { item: 'Bludgeon axon' },
          { item: 'Bludgeon claw' },
          { item: 'Bludgeon spine' },
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
          { item: "Hydra's eye", targetDropSources: ['Alchemical Hydra'] },
          { item: "Hydra's fang", targetDropSources: ['Alchemical Hydra'] },
          { item: "Hydra's heart", targetDropSources: ['Alchemical Hydra'] },
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
          { item: 'Noxious blade' },
          { item: 'Noxious point' },
          { item: 'Noxious pommel' },
          { item: 'Aranea boots', targetDropSources: ['Araxyte#Level 146'] },
          { item: 'Araxyte head', targetDropSources: ['Araxxor'] },
          { item: 'Zenyte shard', targetDropSources: ['Demonic gorilla'] },
          { item: 'Nid' },
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
          { item: 'Spirit shield' },
          { item: 'Spectral sigil' },
          { item: 'Holy elixir' },
        ],
        collectionLogCategories: ['corporeal_beast'],
      }),
      compoundItem({
        name: 'Arcane spirit shield',
        requiredItems: [
          { item: 'Spirit shield' },
          { item: 'Arcane sigil' },
          { item: 'Holy elixir' },
        ],
        collectionLogCategories: ['corporeal_beast'],
      }),
      compoundItem({
        name: 'Elysian spirit shield',
        requiredItems: [
          { item: 'Spirit shield' },
          { item: 'Elysian sigil' },
          { item: 'Holy elixir' },
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
          { item: 'Ballista spring', targetDropSources: ['Demonic gorilla'] },
          { item: 'Monkey tail', targetDropSources: ['Demonic gorilla'] },
          { item: 'Heavy frame', targetDropSources: ['Demonic gorilla'] },
          { item: 'Ballista limbs', targetDropSources: ['Demonic gorilla'] },
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
          { item: 'Bellator vestige' },
          { item: 'Chromium ingot', amount: 3 },
          { item: 'Warrior ring' },
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
          { item: 'Magus vestige' },
          { item: 'Chromium ingot', amount: 3 },
          { item: 'Seers ring' },
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
          { item: 'Ultor vestige' },
          { item: 'Chromium ingot', amount: 3 },
          { item: 'Berserker ring' },
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
          { item: 'Venator vestige' },
          { item: 'Chromium ingot', amount: 3 },
          { item: 'Archers ring' },
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
          { item: "Leviathan's lure" },
          { item: "Siren's staff" },
          { item: "Executioner's axe head" },
          { item: 'Eye of the duke' },
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
      }),
      singleItem({
        name: 'Sunfire fanatic cuirass',
        collectionLogCategory: 'fortis_colosseum',
      }),
      singleItem({
        name: 'Sunfire fanatic chausses',
        collectionLogCategory: 'fortis_colosseum',
      }),
      singleItem({
        name: 'Echo crystal',
        collectionLogCategory: 'fortis_colosseum',
      }),
      singleItem({
        name: 'Tonalztics of ralos',
        clogName: 'Tonalztics of ralos (uncharged)',
        collectionLogCategory: 'fortis_colosseum',
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
          { item: 'Bandos boots', targetDropSources: ['General Graardor'] },
          { item: 'Black tourmaline core' },
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
        targetDropSources: ['Monumental chest#Hard Mode'],
      }),
      singleItem({
        name: 'Justiciar faceguard',
        collectionLogCategory: 'theatre_of_blood',
        targetDropSources: ['Monumental chest#Hard Mode'],
      }),
      singleItem({
        name: 'Justiciar chestguard',
        collectionLogCategory: 'theatre_of_blood',
        targetDropSources: ['Monumental chest#Hard Mode'],
      }),
      singleItem({
        name: 'Justiciar legguards',
        collectionLogCategory: 'theatre_of_blood',
        targetDropSources: ['Monumental chest#Hard Mode'],
      }),
      singleItem({
        name: 'Ghrazi rapier',
        collectionLogCategory: 'theatre_of_blood',
        targetDropSources: ['Monumental chest#Hard Mode'],
      }),
      singleItem({
        name: 'Sanguinesti staff',
        clogName: 'Sanguinesti staff (uncharged)',
        collectionLogCategory: 'theatre_of_blood',
        targetDropSources: ['Monumental chest#Hard Mode'],
      }),
      singleItem({
        name: 'Scythe of vitur',
        clogName: 'Scythe of vitur (uncharged)',
        collectionLogCategory: 'theatre_of_blood',
        targetDropSources: ['Monumental chest#Hard Mode'],
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
        points: 10000000000,
        requiredItems: [{ item: 'Burning claw', amount: 2 }],
        collectionLogCategories: ['tormented_demons'],
      }),
      ...Array.from({ length: 3 }).map((_, i) =>
        singleItem({
          name: `Tormented synapse (${i + 1})`,
          points: 10000000000,
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
      }),
      compoundItem({
        name: 'Venator bow',
        requiredItems: [{ item: 'Venator shard', amount: 5 }],
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
          { item: 'Ice element staff crown' },
          { item: 'Fire element staff crown' },
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
          { item: 'Odium shard 1' },
          { item: 'Odium shard 2' },
          { item: 'Odium shard 3' },
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
          { item: 'Malediction shard 1' },
          { item: 'Malediction shard 2' },
          { item: 'Malediction shard 3' },
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
        name: 'Ring of the gods',
        collectionLogCategory: 'vetion_and_calvarion',
        targetDropSources: ["Calvar'ion"],
      }),
      singleItem({
        name: 'Treasonous ring',
        collectionLogCategory: 'venenatis_and_spindel',
        targetDropSources: ['Spindel'],
      }),
      singleItem({
        name: 'Tyrannical ring',
        collectionLogCategory: 'callisto_and_artio',
        targetDropSources: ['Artio'],
      }),
      singleItem({
        name: 'Amulet of eternal glory',
        points: 10000000000,
        collectionLogCategory: 'miscellaneous',
      }),
      singleItem({
        name: 'Amulet of avarice',
        collectionLogCategory: 'revenants',
        targetDropSources: ['Revenant ork#On-task'],
        points: 10000000000,
      }),
      compoundItem({
        name: 'Obelisk',
        image:
          'https://oldschool.runescape.wiki/images/Obelisk_%28Construction%29_built.png',
        requiredItems: [
          {
            item: 'Ancient crystal',
            amount: 4,
            targetDropSources: ['Revenant ork'],
          },
        ],
        requiredLevels: {
          Construction: 72,
        },
        collectionLogCategories: ['revenants'],
        points: 10000000000,
      }),
      singleItem({
        name: "Viggora's chainmace",
        clogName: "Viggora's chainmace (u)",
        collectionLogCategory: 'revenants',
        targetDropSources: ['Revenant ork#On-task'],
        points: 10000000000,
      }),
      singleItem({
        name: 'Claws of callisto',
        collectionLogCategory: 'callisto_and_artio',
        targetDropSources: ['Artio'],
      }),
      singleItem({
        name: "Craw's bow",
        clogName: "Craw's bow (u)",
        collectionLogCategory: 'revenants',
        targetDropSources: ['Revenant ork#On-task'],
        points: 10000000000,
      }),
      singleItem({
        name: 'Fangs of venenatis',
        collectionLogCategory: 'venenatis_and_spindel',
        targetDropSources: ['Spindel'],
      }),
      singleItem({
        name: "Thammaron's sceptre",
        clogName: "Thammaron's sceptre (u)",
        collectionLogCategory: 'revenants',
        targetDropSources: ['Revenant ork#On-task'],
        points: 10000000000,
      }),
      singleItem({
        name: "Skull of vet'ion",
        collectionLogCategory: 'vetion_and_calvarion',
        targetDropSources: ["Calvar'ion"],
      }),
      compoundItem({
        name: 'Voidwaker',
        requiredItems: [
          { item: 'Voidwaker hilt', targetDropSources: ['Artio'] },
          { item: 'Voidwaker gem', targetDropSources: ['Spindel'] },
          { item: 'Voidwaker blade', targetDropSources: ["Calvar'ion"] },
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
        points: 10000000000,
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
        points: 10000000000,
      }),
      singleItem({
        name: 'Warped sceptre',
        clogName: 'Warped sceptre (uncharged)',
        collectionLogCategory: 'slayer',
        points: 10000000000,
      }),
      compoundItem({
        name: 'Devout boots',
        requiredItems: [{ item: "Drake's tooth" }, { item: 'Holy sandals' }],
        collectionLogCategories: ['slayer', 'medium_treasure_trails'],
        points: 10000000000,
      }),
      singleItem({
        name: 'Boots of brimstone',
        clogName: "Drake's claw",
        image: formatWikiImageUrl('Boots of brimstone'),
        collectionLogCategory: 'slayer',
        points: 10000000000,
      }),
      singleItem({
        name: 'Neitiznot faceguard',
        clogName: 'Basilisk jaw',
        image: formatWikiImageUrl('Neitiznot faceguard'),
        collectionLogCategory: 'slayer',
        points: 10000000000,
      }),
      singleItem({
        name: 'Abyssal whip',
        collectionLogCategory: 'slayer',
        points: 10000000000,
      }),
      singleItem({
        name: 'Dark bow',
        collectionLogCategory: 'slayer',
        points: 10000000000,
      }),
      singleItem({
        name: 'Mist battlestaff',
        collectionLogCategory: 'slayer',
        points: 10000000000,
      }),
      singleItem({
        name: 'Dust battlestaff',
        collectionLogCategory: 'slayer',
        points: 10000000000,
      }),
      singleItem({
        name: 'Eternal gem',
        collectionLogCategory: 'slayer',
        points: 10000000000,
      }),
      singleItem({
        name: 'Imbued heart',
        collectionLogCategory: 'slayer',
        points: 10000000000,
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
        points: 10000000000,
      }),
      singleItem({
        name: 'Dragonfire ward',
        clogName: 'Skeletal visage',
        image: formatWikiImageUrl('Dragonfire ward'),
        collectionLogCategory: 'vorkath',
        points: 10000000000,
      }),
      singleItem({
        name: 'Ancient wyvern shield',
        clogName: 'Wyvern visage',
        image: formatWikiImageUrl('Ancient wyvern shield'),
        collectionLogCategory: 'slayer',
        points: 10000000000,
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
        points: 10000000000,
      }),
      compoundItem({
        name: 'Graceful set',
        points: 10000000000,
        image: formatWikiImageUrl('Graceful hood'),
        requiredItems: [
          { item: 'Graceful hood' },
          { item: 'Graceful top' },
          { item: 'Graceful legs' },
          { item: 'Graceful gloves' },
          { item: 'Graceful boots' },
          { item: 'Graceful cape' },
        ],
        collectionLogCategories: ['rooftop_agility'],
      }),
      singleItem({
        name: 'Ham joint',
        collectionLogCategory: 'easy_treasure_trails',
        points: 10000000000,
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
        points: 10000000000,
      }),
      singleItem({
        name: 'Ring of endurance',
        clogName: 'Ring of endurance (uncharged)',
        points: 10000000000,
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
        points: 10000000000,
        collectionLogCategory: 'wintertodt',
      }),
      singleItem({
        name: 'Tome of water',
        clogName: 'Tome of water (empty)',
        points: 10000000000,
        collectionLogCategory: 'tempoross',
      }),
      singleItem({
        name: 'Zombie axe',
        clogName: 'Broken zombie axe',
        requiredLevels: {
          Smithing: 65,
        },
        collectionLogCategory: 'miscellaneous',
        points: 10000000000,
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
  // Pets: {
  //   image: formatWikiImageUrl('Nid', 'category'),
  //   items: (
  //     Object.entries({
  //       'Abyssal orphan': [100],
  //       'Abyssal protector': [150],
  //       'Baby chinchompa': [
  //         150,
  //         formatWikiImageUrl('Baby chinchompa (gold) chathead'),
  //       ],
  //       'Baby mole': [50],
  //       Baron: [110],
  //       Beaver: [150],
  //       Bloodhound: [400],
  //       Bran: [50],
  //       Butch: [130],
  //       'Callisto cub': [80],
  //       'Chompy chick': [10],
  //       'Giant squirrel': [200],
  //       Hellpuppy: [80],
  //       Herbi: [120],
  //       Heron: [150],
  //       Huberte: [50],
  //       'Ikkle hydra': [
  //         140,
  //         formatWikiImageUrl('Ikkle Hydra (serpentine) chathead'),
  //       ],
  //       'Jal-nib-rek': [200],
  //       'Kalphite princess': [100],
  //       "Lil' creator": [100],
  //       "Lil'viathan": [140],
  //       "Lil' zik": [200],
  //       'Little nightmare': [300],
  //       Muphin: [80, formatWikiImageUrl('Muphin (shielded) chathead')],
  //       Nexling: [250],
  //       Nid: [70],
  //       Noon: [120],
  //       Olmlet: [400],
  //       'Pet chaos elemental': [20],
  //       'Pet dagannoth prime': [100],
  //       'Pet dagannoth rex': [100],
  //       'Pet dagannoth supreme': [100],
  //       'Pet dark core': [400],
  //       'Pet general graardor': [150],
  //       'Pet kraken': [50],
  //       "Pet kree'arra": [200],
  //       "Pet k'ril tsutsaroth": [
  //         150,
  //         formatWikiImageUrl("K'ril Tsutsaroth Jr. chathead"),
  //       ],
  //       'Pet penance queen': [500],
  //       'Pet smoke devil': [60],
  //       'Pet snakeling': [120],
  //       'Pet zilyana': [200],
  //       Phoenix: [150],
  //       'Prince black dragon': [80],
  //       Quetzin: [150],
  //       'Rift guardian': [
  //         300,
  //         formatWikiImageUrl('Rift guardian (follower, fire)'),
  //       ],
  //       'Rock golem': [200],
  //       Rocky: [100],
  //       "Scorpia's offspring": [60],
  //       Scurry: [50],
  //       Skotos: [40],
  //       Smolcano: [160],
  //       'Smol heredit': [150],
  //       Sraracha: [70],
  //       Tangleroot: [400],
  //       'Tiny tempor': [200],
  //       "Tumeken's guardian": [200],
  //       'Tzrek-jad': [140],
  //       'Venenatis spiderling': [80],
  //       "Vet'ion jr.": [100],
  //       Vorki: [120],
  //       Wisp: [120],
  //       Youngllef: [160],
  //     }) as [string, [number] | [number, string]][]
  //   ).map<Promise<Item>>(
  //     async ([name, [points, image = formatWikiImageUrl(name)]]) =>
  //       singleItem({
  //         name,
  //         points,
  //         image,
  //         collectionLogCategory: 'all_pets',
  //       }),
  //   ) as NonEmptyArray<Promise<Item>>,
  // },
} satisfies ItemCategoryMap;
