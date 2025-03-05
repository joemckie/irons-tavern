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
import { maximumTotalLevel, Quest } from '@/app/schemas/osrs';
import { HolidayTrack } from '@/app/schemas/wiki';

type SingleItemOptions = Omit<
  OptionalKeys<CollectionLogItem, 'image'>,
  'requiredItems'
> & { clogName?: string; requiredAmount?: number };

function singleItem({
  name,
  points,
  clogName,
  image = formatWikiImageUrl(clogName ?? name),
  requiredAmount = 1,
  isAutomatic,
}: SingleItemOptions) {
  return {
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
  } satisfies CollectionLogItem;
}

type CompoundItemOptions = Omit<
  OptionalKeys<CollectionLogItem, 'image'>,
  'requiredItems'
> & {
  requiredItems: NonEmptyArray<string | [string, number]>;
};

function compoundItem({
  name,
  image = formatWikiImageUrl(name),
  points,
  requiredItems,
  requiredLevels,
  isAutomatic,
}: CompoundItemOptions) {
  return {
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
    }) as NonEmptyArray<RequiredItem>,
    requiredLevels,
    isAutomatic,
  } satisfies CollectionLogItem;
}

function combatAchievementItem({
  name,
  image = formatWikiImageUrl(name),
  points,
  requiredCombatAchievements,
  isAutomatic,
}: OptionalKeys<CombatAchievementItem, 'image'>) {
  return {
    image,
    name,
    points,
    requiredCombatAchievements,
    isAutomatic,
  } satisfies CombatAchievementItem;
}

function questItem({
  name,
  image = formatWikiImageUrl(name),
  points,
  requiredQuests,
  isAutomatic,
}: OptionalKeys<QuestItem, 'image'>) {
  return {
    image,
    name,
    points,
    requiredQuests,
    isAutomatic,
  } satisfies QuestItem;
}

function manualItem({
  name,
  image = formatWikiImageUrl(name),
  points,

  isAutomatic,
}: OptionalKeys<BaseItem, 'image'>) {
  return {
    image,
    name,
    points,
    isAutomatic,
  } satisfies BaseItem;
}

function customItem({
  isAcquired,
  name,
  image = formatWikiImageUrl(name),
  points,
  isAutomatic,
}: OptionalKeys<CustomItem, 'image'>) {
  return {
    image,
    isAcquired,
    name,
    points,
    isAutomatic,
  } satisfies CustomItem;
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
      }),
      singleItem({
        name: 'Abyssal dagger',
        points: 30,
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
      }),
      singleItem({
        name: 'Hydra tail',
        points: 20,
      }),
      singleItem({
        name: 'Hydra leather',
        points: 60,
      }),
      singleItem({
        name: "Hydra's claw",
        points: 120,
      }),
    ],
  },
  Araxxor: {
    items: [
      singleItem({
        name: 'Coagulated venom',
        points: 10,
      }),
      singleItem({
        name: 'Noxious blade',
        points: 30,
      }),
      singleItem({
        name: 'Noxious point',
        points: 30,
      }),
      singleItem({
        name: 'Noxious pommel',
        points: 30,
      }),
      singleItem({
        name: 'Araxyte fang',
        points: 60,
      }),
      compoundItem({
        name: 'Amulet of rancour (s)',
        points: 60,
        requiredItems: [
          'Noxious blade',
          'Noxious point',
          'Noxious pommel',
          'Areana boots',
          'Araxyte head',
          'Zenyte shard',
          'Rax',
        ],
      }),
    ],
  },
  Cerberus: {
    image: formatWikiImageUrl('Hellpuppy detail', 'category'),
    items: [
      singleItem({
        name: 'Primordial crystal',
        points: 60,
      }),
      singleItem({
        name: 'Pegasian crystal',
        points: 40,
      }),
      singleItem({
        name: 'Eternal crystal',
        points: 30,
      }),
      singleItem({
        name: 'Smouldering stone',
        points: 30,
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
      }),
      singleItem({
        name: 'Arcane prayer scroll',
        points: 50,
        image: formatWikiImageUrl('Augury'),
      }),
      singleItem({
        name: 'Twisted buckler',
        points: 80,
      }),
      singleItem({
        name: 'Dragon hunter crossbow',
        points: 150,
      }),
      singleItem({
        name: "Dinh's bulwark",
        points: 80,
      }),
      singleItem({
        name: 'Ancestral hat',
        points: 120,
      }),
      singleItem({
        name: 'Ancestral robe top',
        points: 120,
      }),
      singleItem({
        name: 'Ancestral robe bottom',
        points: 120,
      }),
      singleItem({
        name: 'Dragon claws',
        points: 150,
      }),
      singleItem({
        name: 'Elder maul',
        points: 250,
      }),
      singleItem({
        name: 'Kodai insignia',
        points: 300,
      }),
      singleItem({
        name: 'Twisted bow',
        points: 400,
      }),
      singleItem({
        name: 'Twisted ancestral colour kit',
        points: 80,
      }),
      singleItem({
        name: 'Metamorphic dust',
        points: 300,
      }),
    ],
  },
  'Commander Zilyana': {
    items: [
      singleItem({
        name: 'Saradomin sword',
        points: 20,
      }),
      singleItem({
        name: "Saradomin's light",
        points: 20,
      }),
      singleItem({
        name: 'Armadyl crossbow',
        points: 50,
      }),
      singleItem({
        name: 'Saradomin hilt',
        points: 80,
      }),
    ],
  },
  'Corporeal Beast': {
    items: [
      singleItem({
        name: 'Spirit shield',
        points: 20,
      }),
      singleItem({
        name: 'Holy elixir',
        points: 50,
      }),
      compoundItem({
        name: 'Spectral spirit shield',
        points: 150,
        requiredItems: ['Spirit shield', 'Spectral sigil', 'Holy elixir'],
      }),
      compoundItem({
        name: 'Arcane spirit shield',
        points: 150,
        requiredItems: ['Spirit shield', 'Arcane sigil', 'Holy elixir'],
      }),
      compoundItem({
        name: 'Elysian spirit shield',
        points: 500,
        requiredItems: ['Spirit shield', 'Elysian sigil', 'Holy elixir'],
      }),
    ],
  },
  'Dagannoth Kings': {
    image: formatWikiImageUrl('Dagannoth Prime', 'category'),
    items: [
      singleItem({
        name: 'Archers ring',
        points: 10,
      }),
      singleItem({
        name: 'Berserker ring',
        points: 10,
      }),
      singleItem({
        name: 'Seers ring',
        points: 10,
      }),
      singleItem({
        name: 'Warrior ring',
        points: 10,
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
      }),
      manualItem({
        name: 'Amulet of torture',
        points: 60,
      }),
      manualItem({
        name: 'Tormented bracelet',
        points: 50,
      }),
      manualItem({
        name: 'Necklace of anguish',
        points: 40,
      }),
      manualItem({
        name: 'Ring of suffering',
        points: 30,
      }),
    ],
  },
  'Desert Treasure 2': {
    image: formatWikiImageUrl('Ancient icon detail', 'category'),
    items: [
      singleItem({
        name: "Awakener's orb",
        points: 10,
      }),
      singleItem({
        name: 'Blood quartz',
        points: 20,
      }),
      singleItem({
        name: 'Ice quartz',
        points: 20,
      }),
      singleItem({
        name: 'Shadow quartz',
        points: 20,
      }),
      singleItem({
        name: 'Smoke quartz',
        points: 20,
      }),
      singleItem({
        name: 'Chromium ingot',
        points: 20,
      }),
      singleItem({
        name: 'Virtus mask',
        points: 80,
      }),
      singleItem({
        name: 'Virtus robe top',
        points: 80,
      }),
      singleItem({
        name: 'Virtus robe bottom',
        points: 80,
      }),
      manualItem({
        name: 'Bellator ring',
        points: 100,
      }),
      manualItem({
        name: 'Magus ring',
        points: 100,
      }),
      manualItem({
        name: 'Ultor ring',
        points: 100,
      }),
      manualItem({
        name: 'Venator ring',
        points: 100,
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
      }),
      singleItem({
        name: 'Sunfire fanatic cuirass',
        points: 30,
      }),
      singleItem({
        name: 'Sunfire fanatic chausses',
        points: 30,
      }),
      singleItem({
        name: 'Echo crystal',
        points: 30,
      }),
      singleItem({
        name: 'Tonalztics of ralos (uncharged)',
        points: 100,
      }),
      singleItem({
        name: "Dizana's quiver",
        clogName: "Dizana's quiver (uncharged)",
        points: 3500,
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
      }),
      singleItem({
        name: 'Bandos tassets',
        points: 50,
      }),
      singleItem({
        name: 'Bandos boots',
        points: 50,
      }),
      singleItem({
        name: 'Bandos hilt',
        points: 100,
      }),
    ],
  },
  'Grotesque Guardians': {
    image: formatWikiImageUrl('Noon', 'category'),
    items: [
      singleItem({
        name: 'Granite gloves',
        points: 10,
      }),
      singleItem({
        name: 'Granite ring',
        points: 10,
      }),
      singleItem({
        name: 'Granite hammer',
        points: 30,
      }),
      compoundItem({
        name: 'Guardian boots',
        points: 50,
        requiredItems: ['Bandos boots', 'Black tourmaline core'],
      }),
    ],
  },
  Kraken: {
    items: [
      singleItem({
        name: 'Trident of the seas (full)',
        points: 20,
      }),
      singleItem({
        name: 'Kraken tentacle',
        points: 30,
      }),
    ],
  },
  "Kree'arra": {
    image: formatWikiImageUrl("Kree'arra chathead", 'category'),
    items: [
      singleItem({
        name: 'Armadyl helmet',
        points: 50,
      }),
      singleItem({
        name: 'Armadyl chestplate',
        points: 50,
      }),
      singleItem({
        name: 'Armadyl chainskirt',
        points: 50,
      }),
      singleItem({
        name: 'Armadyl hilt',
        points: 80,
      }),
    ],
  },
  "K'ril Tsutsaroth": {
    image: formatWikiImageUrl("K'ril Tsutsaroth chathead", 'category'),
    items: [
      singleItem({
        name: 'Steam battlestaff',
        points: 20,
      }),
      singleItem({
        name: 'Zamorakian spear',
        points: 30,
      }),
      singleItem({
        name: 'Staff of the dead',
        points: 50,
      }),
      singleItem({
        name: 'Zamorak hilt',
        points: 80,
      }),
    ],
  },
  Sarachnis: {
    items: [
      singleItem({
        name: 'Sarachnis cudgel',
        points: 20,
      }),
    ],
  },
  'The Gauntlet': {
    image: formatWikiImageUrl('Corrupted Youngllef chathead', 'category'),
    items: [
      singleItem({
        name: 'Crystal weapon seed',
        points: 20,
      }),
      singleItem({
        name: 'Crystal armour seed',
        points: 20,
      }),
      manualItem({
        name: 'Bow of faerdhinen',
        points: 150,
      }),
      manualItem({
        name: 'Blade of saeldor',
        points: 150,
      }),
    ],
  },
  'Theatre of Blood': {
    image: formatWikiImageUrl('Verzik Vitur (final form)', 'category'),
    items: [
      singleItem({
        name: 'Avernic defender hilt',
        points: 50,
      }),
      singleItem({
        name: 'Justiciar faceguard',
        points: 60,
      }),
      singleItem({
        name: 'Justiciar chestguard',
        points: 60,
      }),
      singleItem({
        name: 'Justiciar legguards',
        points: 60,
      }),
      singleItem({
        name: 'Ghrazi rapier',
        points: 100,
      }),
      singleItem({
        name: 'Sanguinesti staff',
        clogName: 'Sanguinesti staff (uncharged)',
        points: 100,
      }),
      singleItem({
        name: 'Scythe of vitur',
        clogName: 'Scythe of vitur (uncharged)',
        points: 300,
      }),
      singleItem({
        name: 'Holy ornament kit',
        points: 100,
      }),
      singleItem({
        name: 'Sanguine ornament kit',
        points: 150,
      }),
      singleItem({
        name: 'Sanguine dust',
        points: 300,
      }),
    ],
  },
  'Thermonuclear Smoke Devil': {
    image: formatWikiImageUrl('Pet smoke devil chathead', 'category'),
    items: [
      singleItem({
        name: 'Occult necklace',
        points: 30,
      }),
      singleItem({
        name: 'Smoke battlestaff',
        points: 30,
      }),
    ],
  },
  'Tormented Demons': {
    image: formatWikiImageUrl('Tormented Demon (1)', 'category'),
    items: [
      manualItem({
        name: 'Burning claws',
        points: 100,
      }),
      manualItem({
        name: 'Emberlight',
        points: 50,
      }),
      manualItem({
        name: 'Purging staff',
        points: 50,
      }),
      manualItem({
        name: 'Scorching bow',
        points: 50,
      }),
    ],
  },
  'TzHaar Challenges': {
    image: formatWikiImageUrl('TzKal-Zuk', 'category'),
    items: [
      singleItem({
        name: 'Fire cape',
        points: 20,
      }),
      singleItem({
        name: 'Infernal cape',
        points: 7000,
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
      }),
      singleItem({
        name: 'Dragonbone necklace',
        points: 100,
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
      }),
      singleItem({
        name: 'Magic fang',
        points: 80,
      }),
      singleItem({
        name: 'Serpentine visage',
        points: 60,
        image: formatWikiImageUrl('Serpentine helm'),
      }),
      singleItem({
        name: 'Tanzanite mutagen',
        points: 150,
      }),
      singleItem({
        name: 'Magma mutagen',
        points: 150,
      }),
    ],
  },
  'The Nightmare': {
    image: formatWikiImageUrl('Little nightmare chathead', 'category'),
    items: [
      singleItem({
        name: 'Nightmare staff',
        points: 50,
      }),
      singleItem({
        name: "Inquisitor's great helm",
        points: 150,
      }),
      singleItem({
        name: "Inquisitor's hauberk",
        points: 150,
      }),
      singleItem({
        name: "Inquisitor's plateskirt",
        points: 150,
      }),
      singleItem({
        name: "Inquisitor's mace",
        points: 250,
      }),
      singleItem({
        name: 'Eldritch orb',
        points: 300,
      }),
      singleItem({
        name: 'Harmonised orb',
        points: 300,
      }),
      singleItem({
        name: 'Volatile orb',
        points: 300,
      }),
      singleItem({
        name: 'Parasitic egg',
        points: 50,
      }),
    ],
  },
  Nex: {
    image: formatWikiImageUrl('Nexling detail', 'category'),
    items: [
      singleItem({
        name: 'Zaryte vambraces',
        points: 50,
      }),
      singleItem({
        name: 'Nihil horn',
        points: 150,
      }),
      singleItem({
        name: 'Torva full helm',
        clogName: 'Torva full helm (damaged)',
        image: formatWikiImageUrl('Torva full helm'),
        points: 120,
      }),
      singleItem({
        name: 'Torva platebody',
        clogName: 'Torva platebody (damaged)',
        image: formatWikiImageUrl('Torva platebody'),
        points: 120,
      }),
      singleItem({
        name: 'Torva platelegs',
        clogName: 'Torva platelegs (damaged)',
        image: formatWikiImageUrl('Torva platelegs'),
        points: 120,
      }),
      singleItem({
        name: 'Ancient hilt',
        points: 200,
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
      }),
      singleItem({
        name: 'Eye of the corruptor',
        points: 20,
      }),
      singleItem({
        name: 'Jewel of the sun',
        points: 20,
      }),
      singleItem({
        name: 'Breach of the scarab',
        points: 20,
      }),
      singleItem({
        name: "Osmumten's fang",
        points: 40,
      }),
      singleItem({
        name: 'Lightbearer',
        points: 40,
      }),
      singleItem({
        name: "Elidinis' ward",
        points: 60,
      }),
      singleItem({
        name: 'Masori mask',
        points: 100,
      }),
      singleItem({
        name: 'Masori body',
        points: 100,
      }),
      singleItem({
        name: 'Masori chaps',
        points: 100,
      }),
      singleItem({
        name: "Tumeken's shadow",
        clogName: "Tumeken's shadow (uncharged)",
        points: 300,
      }),
      singleItem({
        name: 'Masori crafting kit',
        points: 30,
      }),
      singleItem({
        name: 'Menaphite ornament kit',
        points: 50,
      }),
      singleItem({
        name: 'Remnant of akkha',
        points: 120,
      }),
      singleItem({
        name: 'Remnant of ba-ba',
        points: 80,
      }),
      singleItem({
        name: 'Remnant of kephri',
        points: 100,
      }),
      singleItem({
        name: 'Remnant of zebak',
        points: 80,
      }),
      singleItem({
        name: 'Ancient remnant',
        points: 80,
      }),
      singleItem({
        name: 'Cursed phalanx',
        points: 200,
      }),
    ],
  },
  'Perilous Moons': {
    image: formatWikiImageUrl('Blood Moon', 'category'),
    items: [
      singleItem({
        name: 'Eclipse atlatl',
        points: 20,
      }),
      singleItem({
        name: 'Eclipse moon helm',
        points: 20,
      }),
      singleItem({
        name: 'Eclipse moon chestplate',
        points: 20,
      }),
      singleItem({
        name: 'Eclipse moon tassets',
        points: 20,
      }),
      singleItem({
        name: 'Dual macuahuitl',
        points: 20,
      }),
      singleItem({
        name: 'Blood moon helm',
        points: 20,
      }),
      singleItem({
        name: 'Blood moon chestplate',
        points: 20,
      }),
      singleItem({
        name: 'Blood moon tassets',
        points: 20,
      }),
      singleItem({
        name: 'Blue moon spear',
        points: 20,
      }),
      singleItem({
        name: 'Blue moon helm',
        points: 20,
      }),
      singleItem({
        name: 'Blue moon chestplate',
        points: 20,
      }),
      singleItem({
        name: 'Blue moon tassets',
        points: 20,
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
      }),
      manualItem({
        name: 'Venator bow',
        points: 80,
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
      }),
      compoundItem({
        name: 'Malediction ward',
        points: 30,
        requiredItems: [
          'Malediction shard 1',
          'Malediction shard 2',
          'Malediction shard 3',
        ],
      }),
      singleItem({
        name: 'Dragon pickaxe',
        points: 30,
      }),
      singleItem({
        name: 'Ring of the gods',
        points: 50,
      }),
      singleItem({
        name: 'Treasonous ring',
        points: 50,
      }),
      singleItem({
        name: 'Tyrannical ring',
        points: 50,
      }),
      singleItem({
        name: 'Amulet of eternal glory',
        points: 100,
      }),
      singleItem({
        name: 'Amulet of avarice',
        points: 50,
      }),
      manualItem({
        name: 'Obelisk',
        points: 100,
        image:
          'https://oldschool.runescape.wiki/images/Obelisk_%28Construction%29_built.png',
      }),
      singleItem({
        name: "Viggora's chainmace",
        clogName: "Viggora's chainmace (u)",
        points: 100,
      }),
      singleItem({
        name: 'Claws of callisto',
        points: 50,
      }),
      singleItem({
        name: "Craw's bow",
        clogName: "Craw's bow (u)",
        points: 100,
      }),
      singleItem({
        name: 'Fangs of venenatis',
        points: 50,
      }),
      singleItem({
        name: "Thammaron's sceptre",
        clogName: "Thammaron's sceptre (u)",
        points: 100,
      }),
      singleItem({
        name: "Skull of vet'ion",
        points: 50,
      }),
      compoundItem({
        name: 'Voidwaker',
        points: 150,
        requiredItems: ['Voidwaker hilt', 'Voidwaker gem', 'Voidwaker blade'],
      }),
      singleItem({
        name: 'Teleport anchoring scroll',
        points: 100,
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
      }),
      singleItem({
        name: 'Warped sceptre',
        clogName: 'Warped sceptre (uncharged)',
        points: 20,
      }),
      compoundItem({
        name: 'Devout boots',
        points: 20,
        requiredItems: ["Drake's tooth", 'Holy sandals'],
      }),
      singleItem({
        name: 'Boots of brimstone',
        clogName: "Drake's claw",
        points: 20,
        image: formatWikiImageUrl('Boots of brimstone'),
      }),
      singleItem({
        name: 'Neitiznot faceguard',
        clogName: 'Basilisk jaw',
        points: 30,
        image: formatWikiImageUrl('Neitiznot faceguard'),
      }),
      singleItem({
        name: 'Abyssal whip',
        points: 20,
      }),
      singleItem({
        name: 'Dark bow',
        points: 20,
      }),
      singleItem({
        name: 'Mist battlestaff',
        points: 30,
      }),
      singleItem({
        name: 'Dust battlestaff',
        points: 30,
      }),
      singleItem({
        name: 'Eternal gem',
        points: 150,
      }),
      singleItem({
        name: 'Imbued heart',
        points: 250,
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
      }),
      singleItem({
        name: 'Dragonfire ward',
        clogName: 'Skeletal visage',
        points: 200,
        image: formatWikiImageUrl('Dragonfire ward'),
      }),
      singleItem({
        name: 'Ancient wyvern shield',
        clogName: 'Wyvern visage',
        points: 200,
        image: formatWikiImageUrl('Ancient wyvern shield'),
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
      }),
      singleItem({
        name: "Bryophyta's essence",
        points: 50,
      }),
      singleItem({
        name: 'Crystal tool seed',
        points: 100,
      }),
      singleItem({
        name: 'Dragon warhammer',
        points: 100,
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
      }),
      singleItem({
        name: 'Ham joint',
        points: 20,
      }),
      customItem({
        name: 'Music cape',
        points: 80,
        image: formatWikiImageUrl('Music cape detail'),
        isAcquired({ musicTracks }) {
          return musicTracks
            ? Object.entries(musicTracks)
                .filter(
                  ([track]) =>
                    !HolidayTrack.options.includes(track as HolidayTrack),
                )
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
      }),
      singleItem({
        name: 'Ring of endurance',
        clogName: 'Ring of endurance (uncharged)',
        points: 120,
      }),
      singleItem({
        name: 'Swift blade',
        points: 30,
      }),
      singleItem({
        name: 'Tome of fire',
        clogName: 'Tome of fire (empty)',
        points: 30,
      }),
      singleItem({
        name: 'Tome of water',
        clogName: 'Tome of water (empty)',
        points: 30,
      }),
      singleItem({
        name: 'Zombie axe',
        clogName: 'Broken zombie axe',
        points: 20,
        requiredLevels: {
          Smithing: 65,
        },
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
      }),
      singleItem({
        name: 'Jar of darkness (Skotizo)',
        clogName: 'Jar of darkness',
        points: 150,
      }),
      singleItem({
        name: 'Jar of decay (Vorkath)',
        clogName: 'Jar of decay',
        points: 50,
      }),
      singleItem({
        name: 'Jar of dirt (Kraken)',
        clogName: 'Jar of dirt',
        points: 50,
      }),
      singleItem({
        name: 'Jar of dreams (Nightmare)',
        clogName: 'Jar of dreams',
        points: 150,
      }),
      singleItem({
        name: 'Jar of eyes (Sarachnis)',
        clogName: 'Jar of eyes',
        points: 50,
      }),
      singleItem({
        name: 'Jar of miasma (Sire)',
        clogName: 'Jar of miasma',
        points: 50,
      }),
      singleItem({
        name: 'Jar of sand (Kalphite Queen)',
        clogName: 'Jar of sand',
        points: 50,
      }),
      singleItem({
        name: 'Jar of smoke (Thermy)',
        clogName: 'Jar of smoke',
        points: 50,
      }),
      singleItem({
        name: 'Jar of souls (Cerberus)',
        clogName: 'Jar of souls',
        points: 50,
      }),
      singleItem({
        name: 'Jar of spirits (Corp)',
        clogName: 'Jar of spirits',
        points: 150,
      }),
      singleItem({
        name: 'Jar of stone (GGs)',
        clogName: 'Jar of stone',
        points: 100,
      }),
      singleItem({
        name: 'Jar of swamp (Zulrah)',
        clogName: 'Jar of swamp',
        points: 50,
      }),
      singleItem({
        name: 'Jar of venom (Araxxor)',
        clogName: 'Jar of venom',
        points: 50,
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
        Butch: [130],
        'Callisto cub': [80],
        'Chompy chick': [10],
        'Giant squirrel': [200],
        Hellpuppy: [80],
        Herbi: [120],
        Heron: [150],
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
      }),
    ) as NonEmptyArray<Item>,
  },
};
