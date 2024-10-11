import {
  Item,
  ItemsResponse,
  RequiredItem,
  Skill,
} from '@/types/rank-calculator';

function singleItem({ name, points, image }: Omit<Item, 'requiredItems'>) {
  return {
    image,
    name,
    points,
    requiredItems: [
      {
        amount: 1,
        clogName: name,
      },
    ],
  } satisfies Item;
}

function compoundItem({
  image,
  name,
  points,
  requiredItems,
}: Omit<Item, 'requiredItems'> & {
  requiredItems: NonEmptyArray<string>;
}) {
  return {
    image,
    name,
    points,
    requiredItems: requiredItems.map((clogName) => ({
      amount: 1,
      clogName,
    })) as NonEmptyArray<RequiredItem>,
  } satisfies Item;
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
  Zulrah: {
    image:
      'https://oldschool.runescape.wiki/images/Zulrah_%28serpentine%29.png',
    items: [
      compoundItem({
        image: '',
        name: 'Toxic blowpipe',
        points: 80,
        requiredItems: ['Tanzanite fang'],
        requiredLevels: {
          [Skill.Fletching]: 73,
        },
      }),
      singleItem({
        image: '',
        name: 'Magic fang',
        points: 60,
      }),
    ],
  },
};
