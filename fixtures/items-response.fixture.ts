import { formatWikiImageUrl } from '@/app/rank-calculator/utils/format-wiki-image-url';
import {
  BaseItem,
  CollectionLogItem,
  CombatAchievementItem,
  Item,
  ItemsResponse,
  RequiredItem,
  Skill,
} from '@/types/rank-calculator';

type SingleItemOptions = Omit<
  OptionalKeys<CollectionLogItem, 'image'>,
  'requiredItems'
> & { clogName?: string };

function singleItem({
  name,
  points,
  clogName,
  image = formatWikiImageUrl(name),
}: SingleItemOptions) {
  return {
    image,
    name,
    points,
    requiredItems: [
      {
        amount: 1,
        clogName: clogName ?? name,
      },
    ],
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
  } satisfies CollectionLogItem;
}

function combatAchievementItem({
  name,
  image = formatWikiImageUrl(name),
  points,
  requiredCombatAchievements,
}: OptionalKeys<CombatAchievementItem, 'image'>) {
  return {
    image,
    name,
    points,
    requiredCombatAchievements,
  } satisfies CombatAchievementItem;
}

function manualItem({
  name,
  image = formatWikiImageUrl(name),
  points,
}: OptionalKeys<BaseItem, 'image'>) {
  return {
    image,
    name,
    points,
  } satisfies BaseItem;
}

export const itemsResponseFixture: ItemsResponse = {
  'Abyssal Sire': {
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
    items: [
      singleItem({
        name: 'Dexterous prayer scroll',
        points: 80,
      }),
      singleItem({
        name: 'Arcane prayer scroll',
        points: 50,
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
        points: 150,
        requiredItems: ['Spirit shield', 'Elysian sigil', 'Holy elixir'],
      }),
    ],
  },
  'Dagannoth Kings': {
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
          [Skill.Fletching]: 72,
        },
      }),
      ...Array.from({ length: 4 }).map<Item>((_, i) =>
        compoundItem({
          name: `Zenyte shard (${i + 1})`,
          points: 50,
          requiredItems: [['Zenyte shard', i + 1]],
        }),
      ),
    ],
  },
  'Desert Treasure 2': {
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
      compoundItem({
        name: 'Bellator ring',
        points: 100,
        requiredItems: [
          'Bellator vestige',
          ['Chromium ingot', 3],
          'Warrior ring',
        ],
        requiredLevels: {
          [Skill.Magic]: 85,
          [Skill.Crafting]: 75,
        },
      }),
      compoundItem({
        name: 'Magus ring',
        points: 100,
        requiredItems: ['Magus vestige', ['Chromium ingot', 3], 'Seers ring'],
        requiredLevels: {
          [Skill.Magic]: 85,
          [Skill.Crafting]: 75,
        },
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
          [Skill.Magic]: 85,
          [Skill.Crafting]: 75,
        },
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
          [Skill.Magic]: 85,
          [Skill.Crafting]: 75,
        },
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
          [Skill.Magic]: 75,
        },
      }),
      combatAchievementItem({
        name: 'Ancient blood ornament kit',
        points: 2000,
        requiredCombatAchievements: [0],
      }),
    ],
  },
  'Fortis Colosseum': {
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
        name: 'Tonalztics of ralos',
        points: 100,
      }),
      singleItem({
        name: "Dizana's quiver",
        points: 3500,
      }),
      manualItem({
        name: "Blessed dizana's quiver",
        points: 3500,
      }),
    ],
  },
  'General Graardor': {
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
    items: [
      singleItem({
        name: 'Crystal weapon seed',
        points: 20,
      }),
      singleItem({
        name: 'Crystal armour seed',
        points: 20,
      }),
      singleItem({
        name: 'Enhanced crystal weapon seed (1)',
        clogName: 'Enhanced crystal weapon seed',
        points: 150,
      }),
      compoundItem({
        name: 'Enhanced crystal weapon seed (2)',
        points: 150,
        requiredItems: [['Enhanced crystal weapon seed', 2]],
      }),
    ],
  },
  'Theatre of Blood': {
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
    items: [
      compoundItem({
        name: 'Burning claws',
        points: 100,
        requiredItems: [['Burning claw', 2]],
      }),
      ...Array.from({ length: 3 }).map((_, i) =>
        compoundItem({
          name: `Tormented synapse (${i + 1})`,
          points: 50,
          requiredItems: [['Tormented synapse', i + 1]],
        }),
      ),
    ],
  },
  'TzHaar Challenges': {
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
        requiredCombatAchievements: [0],
      }),
    ],
  },
  Vorkath: {
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
    items: [
      singleItem({
        name: 'Toxic blowpipe',
        clogName: 'Tanzanite fang',
        points: 80,
        requiredLevels: {
          [Skill.Fletching]: 73,
        },
      }),
      singleItem({
        name: 'Magic fang',
        points: 80,
      }),
      singleItem({
        name: 'Serpentine visage',
        points: 60,
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
        points: 120,
      }),
      singleItem({
        name: 'Torva platebody',
        clogName: 'Torva platebody (damaged)',
        points: 120,
      }),
      singleItem({
        name: 'Torva platelegs',
        clogName: 'Torva platelegs (damaged)',
        points: 120,
      }),
      singleItem({
        name: 'Ancient hilt',
        points: 200,
      }),
    ],
  },
};
