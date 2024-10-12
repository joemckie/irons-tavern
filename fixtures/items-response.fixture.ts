import {
  BaseItem,
  CollectionLogItem,
  CombatAchievementItem,
  Item,
  ItemsResponse,
  RequiredItem,
  Skill,
} from '@/types/rank-calculator';

function singleItem({
  name,
  points,
  image,
  clogName,
}: Omit<CollectionLogItem, 'requiredItems'> & { clogName?: string }) {
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

function compoundItem({
  image,
  name,
  points,
  requiredItems,
  requiredLevels,
}: Omit<CollectionLogItem, 'requiredItems'> & {
  requiredItems: NonEmptyArray<string | [string, number]>;
}) {
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
  image,
  name,
  points,
  requiredCombatAchievements,
}: CombatAchievementItem) {
  return {
    image,
    name,
    points,
    requiredCombatAchievements,
  } satisfies CombatAchievementItem;
}

function manualItem({ image, name, points }: BaseItem) {
  return {
    image,
    name,
    points,
  } satisfies BaseItem;
}

export const itemsResponseFixture: ItemsResponse = {
  'Abyssal Sire': {
    image: 'https://oldschool.runescape.wiki/images/Abyssal_Sire.png',
    items: [
      compoundItem({
        image:
          'https://oldschool.runescape.wiki/images/Abyssal_bludgeon_detail.png?dd634',
        name: 'Abyssal bludgeon',
        points: 60,
        requiredItems: ['Bludgeon axon', 'Bludgeon claw', 'Bludgeon spine'],
      }),
      singleItem({
        image: '',
        name: 'Abyssal dagger',
        points: 30,
      }),
    ],
  },
  'Alchemical Hydra': {
    image: '',
    items: [
      compoundItem({
        image: '',
        name: 'Brimstone ring',
        points: 30,
        requiredItems: ["Hydra's eye", "Hydra's fang", "Hydra's heart"],
      }),
      singleItem({
        image: '',
        name: 'Hydra tail',
        points: 20,
      }),
      singleItem({
        image: '',
        name: 'Hydra leather',
        points: 60,
      }),
      singleItem({
        image: '',
        name: "Hydra's claw",
        points: 120,
      }),
    ],
  },
  Araxxor: {
    image: '',
    items: [
      singleItem({
        image: '',
        name: 'Coagulated venom',
        points: 10,
      }),
      singleItem({
        image: '',
        name: 'Noxious blade',
        points: 30,
      }),
      singleItem({
        image: '',
        name: 'Noxious point',
        points: 30,
      }),
      singleItem({
        image: '',
        name: 'Noxious pommel',
        points: 30,
      }),
      singleItem({
        image: '',
        name: 'Araxyte fang',
        points: 60,
      }),
      compoundItem({
        image: '',
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
    image: '',
    items: [
      singleItem({
        image: '',
        name: 'Primordial crystal',
        points: 60,
      }),
      singleItem({
        image: '',
        name: 'Pegasian crystal',
        points: 40,
      }),
      singleItem({
        image: '',
        name: 'Eternal crystal',
        points: 30,
      }),
      singleItem({
        image: '',
        name: 'Smouldering stone',
        points: 30,
      }),
    ],
  },
  'Chambers of Xeric': {
    image: '',
    items: [
      singleItem({
        image: '',
        name: 'Dexterous prayer scroll',
        points: 80,
      }),
      singleItem({
        image: '',
        name: 'Arcane prayer scroll',
        points: 50,
      }),
      singleItem({
        image: '',
        name: 'Twisted buckler',
        points: 80,
      }),
      singleItem({
        image: '',
        name: 'Dragon hunter crossbow',
        points: 150,
      }),
      singleItem({
        image: '',
        name: "Dinh's bulwark",
        points: 80,
      }),
      singleItem({
        image: '',
        name: 'Ancestral hat',
        points: 120,
      }),
      singleItem({
        image: '',
        name: 'Ancestral robe top',
        points: 120,
      }),
      singleItem({
        image: '',
        name: 'Ancestral robe bottom',
        points: 120,
      }),
      singleItem({
        image: '',
        name: 'Dragon claws',
        points: 150,
      }),
      singleItem({
        image: '',
        name: 'Elder maul',
        points: 250,
      }),
      singleItem({
        image: '',
        name: 'Kodai insignia',
        points: 300,
      }),
      singleItem({
        image: '',
        name: 'Twisted bow',
        points: 400,
      }),
      singleItem({
        image: '',
        name: 'Twisted ancestral colour kit',
        points: 80,
      }),
      singleItem({
        image: '',
        name: 'Metamorphic dust',
        points: 300,
      }),
    ],
  },
  'Commander Zilyana': {
    image: '',
    items: [
      singleItem({
        image: '',
        name: 'Saradomin sword',
        points: 20,
      }),
      singleItem({
        image: '',
        name: "Saradomin's light",
        points: 20,
      }),
      singleItem({
        image: '',
        name: 'Armadyl crossbow',
        points: 50,
      }),
      singleItem({
        image: '',
        name: 'Saradomin hilt',
        points: 80,
      }),
    ],
  },
  'Corporeal Beast': {
    image: '',
    items: [
      singleItem({
        image: '',
        name: 'Spirit shield',
        points: 20,
      }),
      singleItem({
        image: '',
        name: 'Holy elixir',
        points: 50,
      }),
      compoundItem({
        image: '',
        name: 'Spectral spirit shield',
        points: 150,
        requiredItems: ['Spirit shield', 'Spectral sigil', 'Holy elixir'],
      }),
      compoundItem({
        image: '',
        name: 'Arcane spirit shield',
        points: 150,
        requiredItems: ['Spirit shield', 'Arcane sigil', 'Holy elixir'],
      }),
      compoundItem({
        image: '',
        name: 'Elysian spirit shield',
        points: 150,
        requiredItems: ['Spirit shield', 'Elysian sigil', 'Holy elixir'],
      }),
    ],
  },
  'Dagannoth Kings': {
    image: '',
    items: [
      singleItem({
        image: '',
        name: 'Archers ring',
        points: 10,
      }),
      singleItem({
        image: '',
        name: 'Berserker ring',
        points: 10,
      }),
      singleItem({
        image: '',
        name: 'Seers ring',
        points: 10,
      }),
      singleItem({
        image: '',
        name: 'Warrior ring',
        points: 10,
      }),
    ],
  },
  'Demonic Gorillas': {
    image: '',
    items: [
      compoundItem({
        image: '',
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
      ...Array.from({ length: 4 }).map<Item>((_, i) => ({
        image: '',
        name: `Zenyte shard (${i + 1})`,
        points: 50,
        requiredItems: [
          {
            amount: i + 1,
            clogName: 'Zenyte shard',
          },
        ],
      })),
    ],
  },
  'Desert Treasure 2': {
    image: '',
    items: [
      singleItem({
        image: '',
        name: "Awakener's orb",
        points: 10,
      }),
      singleItem({
        image: '',
        name: 'Blood quartz',
        points: 20,
      }),
      singleItem({
        image: '',
        name: 'Ice quartz',
        points: 20,
      }),
      singleItem({
        image: '',
        name: 'Shadow quartz',
        points: 20,
      }),
      singleItem({
        image: '',
        name: 'Smoke quartz',
        points: 20,
      }),
      singleItem({
        image: '',
        name: 'Chromium ingot',
        points: 20,
      }),
      singleItem({
        image: '',
        name: 'Virtus mask',
        points: 80,
      }),
      singleItem({
        image: '',
        name: 'Virtus robe top',
        points: 80,
      }),
      singleItem({
        image: '',
        name: 'Virtus robe bottom',
        points: 80,
      }),
      compoundItem({
        image: '',
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
        image: '',
        name: 'Magus ring',
        points: 100,
        requiredItems: ['Magus vestige', ['Chromium ingot', 3], 'Seers ring'],
        requiredLevels: {
          [Skill.Magic]: 85,
          [Skill.Crafting]: 75,
        },
      }),
      compoundItem({
        image: '',
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
        image: '',
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
        image: '',
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
        image: '',
        name: 'Ancient blood ornament kit',
        points: 2000,
        requiredCombatAchievements: [0],
      }),
    ],
  },
  'Fortis Colosseum': {
    image: '',
    items: [
      singleItem({
        image: '',
        name: 'Sunfire fanatic helm',
        points: 30,
      }),
      singleItem({
        image: '',
        name: 'Sunfire fanatic cuirass',
        points: 30,
      }),
      singleItem({
        image: '',
        name: 'Sunfire fanatic chausses',
        points: 30,
      }),
      singleItem({
        image: '',
        name: 'Echo crystal',
        points: 30,
      }),
      singleItem({
        image: '',
        name: 'Tonalztics of ralos',
        points: 100,
      }),
      singleItem({
        image: '',
        name: "Dizana's quiver",
        points: 3500,
      }),
      manualItem({
        image: '',
        name: "Blessed dizana's quiver",
        points: 3500,
      }),
    ],
  },
  'General Graardor': {
    image: '',
    items: [
      singleItem({
        image: '',
        name: 'Bandos chestplate',
        points: 50,
      }),
      singleItem({
        image: '',
        name: 'Bandos tassets',
        points: 50,
      }),
      singleItem({
        image: '',
        name: 'Bandos boots',
        points: 50,
      }),
      singleItem({
        image: '',
        name: 'Bandos hilt',
        points: 100,
      }),
    ],
  },
  'Grotesque Guardians': {
    image: '',
    items: [
      singleItem({
        image: '',
        name: 'Granite gloves',
        points: 10,
      }),
      singleItem({
        image: '',
        name: 'Granite ring',
        points: 10,
      }),
      singleItem({
        image: '',
        name: 'Granite hammer',
        points: 30,
      }),
      compoundItem({
        image: '',
        name: 'Guardian boots',
        points: 50,
        requiredItems: ['Bandos boots', 'Black tourmaline core'],
      }),
    ],
  },
  Kraken: {
    image: '',
    items: [
      singleItem({
        image: '',
        name: 'Trident of the seas (full)',
        points: 20,
      }),
      singleItem({
        image: '',
        name: 'Kraken tentacle',
        points: 30,
      }),
    ],
  },
  "Kree'arra": {
    image: '',
    items: [
      singleItem({
        image: '',
        name: 'Armadyl helmet',
        points: 50,
      }),
      singleItem({
        image: '',
        name: 'Armadyl chestplate',
        points: 50,
      }),
      singleItem({
        image: '',
        name: 'Armadyl chainskirt',
        points: 50,
      }),
      singleItem({
        image: '',
        name: 'Armadyl hilt',
        points: 80,
      }),
    ],
  },
  "K'ril Tsutsaroth": {
    image: '',
    items: [
      singleItem({
        image: '',
        name: 'Steam battlestaff',
        points: 20,
      }),
      singleItem({
        image: '',
        name: 'Zamorakian spear',
        points: 30,
      }),
      singleItem({
        image: '',
        name: 'Staff of the dead',
        points: 50,
      }),
      singleItem({
        image: '',
        name: 'Zamorak hilt',
        points: 80,
      }),
    ],
  },
  Sarachnis: {
    image: '',
    items: [
      singleItem({
        image: '',
        name: 'Sarachnis cudgel',
        points: 20,
      }),
    ],
  },
  'The Gauntlet': {
    image: '',
    items: [
      singleItem({
        image: '',
        name: 'Crystal weapon seed',
        points: 20,
      }),
      singleItem({
        image: '',
        name: 'Crystal armour seed',
        points: 20,
      }),
      {
        image: '',
        name: 'Enhanced crystal weapon seed (1)',
        points: 150,
        requiredItems: [
          {
            amount: 1,
            clogName: 'Enhanced crystal weapon seed',
          },
        ],
      },
      {
        image: '',
        name: 'Enhanced crystal weapon seed (2)',
        points: 150,
        requiredItems: [
          {
            amount: 2,
            clogName: 'Enhanced crystal weapon seed',
          },
        ],
      },
    ],
  },
  'Theatre of Blood': {
    image: '',
    items: [
      singleItem({
        image: '',
        name: 'Avernic defender hilt',
        points: 50,
      }),
      singleItem({
        image: '',
        name: 'Justiciar faceguard',
        points: 60,
      }),
      singleItem({
        image: '',
        name: 'Justiciar chestguard',
        points: 60,
      }),
      singleItem({
        image: '',
        name: 'Justiciar legguards',
        points: 60,
      }),
      singleItem({
        image: '',
        name: 'Ghrazi rapier',
        points: 100,
      }),
      singleItem({
        image: '',
        name: 'Sanguinesti staff',
        points: 100,
      }),
      singleItem({
        image: '',
        name: 'Scythe of vitur (uncharged)',
        points: 300,
      }),
      singleItem({
        image: '',
        name: 'Holy ornament kit',
        points: 100,
      }),
      singleItem({
        image: '',
        name: 'Sanguine ornament kit',
        points: 150,
      }),
      singleItem({
        image: '',
        name: 'Sanguine dust',
        points: 300,
      }),
    ],
  },
  'Thermonuclear Smoke Devil': {
    image: '',
    items: [
      singleItem({
        image: '',
        name: 'Occult necklace',
        points: 30,
      }),
      singleItem({
        image: '',
        name: 'Smoke battlestaff',
        points: 30,
      }),
    ],
  },
  'Tormented Demons': {
    image: '',
    items: [
      compoundItem({
        image: '',
        name: 'Burning claws',
        points: 100,
        requiredItems: [['Burning claw', 2]],
      }),
      ...Array.from({ length: 3 }).map<Item>((_, i) => ({
        image: '',
        name: `Tormented synampse (${i + 1})`,
        points: 50,
        requiredItems: [
          {
            amount: i + 1,
            clogName: 'Tormented synampse',
          },
        ],
      })),
    ],
  },
  'TzHaar Challenges': {
    image: '',
    items: [
      singleItem({
        image: '',
        name: 'Fire cape',
        points: 20,
      }),
      singleItem({
        image: '',
        name: 'Infernal cape',
        points: 7000,
      }),
      combatAchievementItem({
        image: '',
        name: '6 Jads',
        points: 100,
        requiredCombatAchievements: [0],
      }),
    ],
  },
  Vorkath: {
    image: '',
    items: [
      singleItem({
        image: '',
        name: "Vorkath's head",
        points: 20,
      }),
      singleItem({
        image: '',
        name: 'Dragonbone necklace',
        points: 100,
      }),
    ],
  },
  Zulrah: {
    image:
      'https://oldschool.runescape.wiki/images/Zulrah_%28serpentine%29.png',
    items: [
      singleItem({
        image: '',
        name: 'Toxic blowpipe',
        points: 80,
        clogName: 'Tanzanite fang',
        requiredLevels: {
          [Skill.Fletching]: 73,
        },
      }),
      singleItem({
        image: '',
        name: 'Magic fang',
        points: 80,
      }),
      singleItem({
        image: '',
        name: 'Serpentine visage',
        points: 60,
      }),
      singleItem({
        image: '',
        name: 'Tanzanite mutagen',
        points: 150,
      }),
      singleItem({
        image: '',
        name: 'Magma mutagen',
        points: 150,
      }),
    ],
  },
};
