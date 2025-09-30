import { server } from '@/mocks/server';
import { http, HttpResponse } from 'msw';
import { clientConstants } from '@/config/constants.client';
import { DroppedItemJSON, DroppedItemResponse } from '@/app/schemas/wiki';
import { z } from 'zod';
import { CollectionLogItemName } from '@/app/schemas/osrs';
import { RequiredItem } from '@/app/schemas/items';
import { calculateItemPoints } from './calculate-item-points';
import {
  fetchItemDropRates,
  generateRequiredItemList,
} from '../data-sources/fetch-dropped-item-info';

type ItemResult = Omit<
  z.input<typeof DroppedItemJSON>,
  'Drop type' | 'Dropped item'
>;

type SetupItem = [itemName: CollectionLogItemName, results: ItemResult[]];

function setup(items: SetupItem[]) {
  const responseMock = items.reduce<z.input<typeof DroppedItemResponse>>(
    (acc, [itemName, results]) => {
      results.forEach(
        ({ 'Dropped from': dropSource, Rarity: rarity, ...data }) => {
          acc.bucket.push({
            drop_json: JSON.stringify({
              ...data,
              Rarity: rarity,
              'Dropped from': dropSource,
              'Dropped item': itemName,
            } satisfies z.input<typeof DroppedItemJSON>),
          });
        },
      );

      return acc;
    },
    { bucket: [] },
  );

  server.use(
    http.get(`${clientConstants.wiki.baseUrl}/api.php`, () =>
      HttpResponse.json(responseMock),
    ),
  );
}

const testCases = [
  {
    expectedPoints: 7,
    itemName: 'Berserker ring',
    itemSources: [
      {
        item: 'Berserker ring',
        results: [
          {
            'Dropped from': 'Dagannoth Rex',
            Rarity: '1/128',
            Rolls: 1,
            'Alt Rarity': '',
          },
        ],
      },
    ],
  },
  {
    expectedPoints: 329,
    itemName: 'Abyssal orphan',
    itemSources: [
      {
        item: 'Abyssal orphan',
        results: [
          {
            'Dropped from': 'Unsired',
            Rarity: '5/128',
            Rolls: 1,
            'Alt Rarity': '',
          },
        ],
      },
    ],
  },
  {
    expectedPoints: 127,
    itemName: 'Jar of miasma',
    itemSources: [
      {
        item: 'Jar of miasma',
        results: [
          {
            'Dropped from': 'Unsired',
            Rarity: '13/128',
            Rolls: 1,
            'Alt Rarity': '',
          },
        ],
      },
    ],
  },
  {
    expectedPoints: 64,
    itemName: 'Abyssal dagger',
    itemSources: [
      {
        item: 'Abyssal dagger',
        targetDropSources: ['Unsired'],
        results: [
          {
            'Dropped from': 'Unsired',
            Rarity: '26/128',
            Rolls: 1,
            'Alt Rarity': '',
          },
        ],
      },
    ],
  },
  {
    expectedPoints: 80,
    itemName: 'Abyssal bludgeon',
    itemSources: [
      {
        item: 'Bludgeon axon',
        results: [
          {
            'Dropped from': 'Unsired',
            Rarity: '62/128',
            Rolls: 1,
            'Alt Rarity': '',
          },
        ],
      },
      {
        item: 'Bludgeon claw',
        results: [
          {
            'Dropped from': 'Unsired',
            Rarity: '62/128',
            Rolls: 1,
            'Alt Rarity': '',
          },
        ],
      },
      {
        item: 'Bludgeon spine',
        results: [
          {
            'Dropped from': 'Unsired',
            Rarity: '62/128',
            Rolls: 1,
            'Alt Rarity': '',
          },
        ],
      },
    ],
  },
  {
    expectedPoints: 173,
    itemName: "Hydra's claw",
    itemSources: [
      {
        item: "Hydra's claw",
        results: [
          {
            'Dropped from': 'Alchemical Hydra',
            Rarity: '1/1001',
            Rolls: 1,
            'Alt Rarity': '',
          },
        ],
      },
    ],
  },
  {
    expectedPoints: 32,
    itemName: 'Brimstone ring',
    itemSources: [
      {
        item: "Hydra's eye",
        targetDropSources: ['Alchemical Hydra'],
        results: [
          {
            'Dropped from': 'Alchemical Hydra',
            Rarity: '1/181',
            Rolls: 1,
            'Alt Rarity': '',
          },
        ],
      },
      {
        item: "Hydra's fang",
        targetDropSources: ['Alchemical Hydra'],
        results: [
          {
            'Dropped from': 'Alchemical Hydra',
            Rarity: '1/181',
            Rolls: 1,
            'Alt Rarity': '',
          },
        ],
      },
      {
        item: "Hydra's heart",
        targetDropSources: ['Alchemical Hydra'],
        results: [
          {
            'Dropped from': 'Alchemical Hydra',
            Rarity: '1/181',
            Rolls: 1,
            'Alt Rarity': '',
          },
        ],
      },
    ],
  },
  {
    expectedPoints: 89,
    itemName: 'Hydra tail',
    itemSources: [
      {
        item: 'Hydra tail',
        targetDropSources: ['Alchemical Hydra'],
        results: [
          {
            'Dropped from': 'Alchemical Hydra',
            Rarity: '1/513',
            Rolls: 1,
            'Alt Rarity': '',
          },
        ],
      },
    ],
  },
  {
    expectedPoints: 89,
    itemName: 'Hydra leather',
    itemSources: [
      {
        item: 'Hydra leather',
        targetDropSources: ['Alchemical Hydra'],
        results: [
          {
            'Dropped from': 'Alchemical Hydra',
            Rarity: '1/514',
            Rolls: 1,
            'Alt Rarity': '',
          },
        ],
      },
    ],
  },
  {
    expectedPoints: 345,
    itemName: 'Jar of chemicals',
    itemSources: [
      {
        item: 'Jar of chemicals',
        results: [
          {
            'Dropped from': 'Alchemical Hydra',
            Rarity: '1/2000',
            Rolls: 1,
            'Alt Rarity': '',
          },
        ],
      },
    ],
  },
  {
    expectedPoints: 518,
    itemName: 'Ikkle hydra',
    itemSources: [
      {
        item: 'Ikkle hydra',
        results: [
          {
            'Dropped from': 'Alchemical Hydra',
            Rarity: '1/3000',
            Rolls: 1,
            'Alt Rarity': '',
          },
        ],
      },
    ],
  },
  {
    expectedPoints: 540,
    itemName: 'Soulreaper axe',
    itemSources: [
      {
        item: "Leviathan's lure",
        results: [
          {
            'Dropped from': 'The Leviathan',
            Rarity: '1/768',
            Rolls: 1,
            'Alt Rarity': '',
          },
        ],
      },
      {
        item: "Siren's staff",
        results: [
          {
            'Dropped from': 'The Whisperer',
            Rarity: '1/512',
            Rolls: 1,
            'Alt Rarity': '',
          },
        ],
      },
      {
        item: "Executioner's axe head",
        results: [
          {
            'Dropped from': 'Vardorvis',
            Rarity: '1/1088',
            Rolls: 1,
            'Alt Rarity': '',
          },
        ],
      },
      {
        item: 'Eye of the duke',
        results: [
          {
            'Dropped from': 'Duke Sucellus',
            Rarity: '1/720',
            Rolls: 1,
            'Alt Rarity': '',
          },
        ],
      },
    ],
  },
] satisfies NonEmptyArray<{
  itemName: string;
  itemSources: NonEmptyArray<{
    item: CollectionLogItemName;
    results: NonEmptyArray<ItemResult>;
    targetDropSources?: string[];
  }>;
  expectedPoints: number;
}>;

it.each(testCases)(
  'assigns "$itemName" $expectedPoints points',
  async ({ expectedPoints, itemSources }) => {
    const itemSourcesTuple = itemSources.map<SetupItem>(({ item, results }) => [
      item,
      results,
    ]);

    setup(itemSourcesTuple);

    const notableItems = generateRequiredItemList();
    const dropRates = await fetchItemDropRates([...notableItems]);
    const points = calculateItemPoints(
      dropRates,
      itemSources.map((itemSource) => ({
        amount: 1,
        clogName: itemSource.item,
        targetDropSources:
          'targetDropSources' in itemSource
            ? [itemSource.targetDropSources]
            : undefined,
      })) as NonEmptyArray<RequiredItem>,
    );

    expect(points).toEqual(expectedPoints);
  },
);

it('calculates the correct points when a specific drop source has been selected', async () => {
  const item = 'Abyssal dagger';

  setup([
    [
      item,
      [
        {
          'Dropped from': 'Abyssal demon',
          Rarity: '1/32000',
          Rolls: 1,
          'Alt Rarity': '',
        },
        {
          'Dropped from': 'Unsired',
          Rarity: '26/128',
          Rolls: 1,
          'Alt Rarity': '',
        },
      ],
    ],
  ]);

  const dropRates = await fetchItemDropRates([...generateRequiredItemList()]);
  const points = calculateItemPoints(dropRates, [
    { amount: 1, clogName: item, targetDropSources: ['Unsired'] },
  ]);
  const expectedPoints = 64;

  expect(points).toEqual(expectedPoints);
});

it('calculates the correct points for items consisting of multiple drops', async () => {
  setup([
    [
      'Bludgeon axon',
      [
        {
          'Dropped from': 'Unsired',
          Rarity: '62/128',
          Rolls: 1,
          'Alt Rarity': '',
        },
      ],
    ],
    [
      'Bludgeon claw',
      [
        {
          'Dropped from': 'Unsired',
          Rarity: '62/128',
          Rolls: 1,
          'Alt Rarity': '',
        },
      ],
    ],
    [
      'Bludgeon spine',
      [
        {
          'Dropped from': 'Unsired',
          Rarity: '62/128',
          Rolls: 1,
          'Alt Rarity': '',
        },
      ],
    ],
  ]);

  const dropRates = await fetchItemDropRates([...generateRequiredItemList()]);

  const points = calculateItemPoints(dropRates, [
    { amount: 1, clogName: 'Bludgeon axon', targetDropSources: ['Unsired'] },
    { amount: 1, clogName: 'Bludgeon claw', targetDropSources: ['Unsired'] },
    { amount: 1, clogName: 'Bludgeon spine', targetDropSources: ['Unsired'] },
  ]);
  const expectedPoints = 80;

  expect(points).toEqual(expectedPoints);
});

it('calculates points for items dropped from multiple sources by finding the mean points', async () => {
  setup([
    [
      'Virtus robe top',
      [
        {
          'Dropped from': 'Duke Sucellus',
          Rarity: '1/2,160',
          Rolls: 1,
          'Alt Rarity': '',
        },
        {
          'Dropped from': 'The Leviathan',
          Rarity: '1/2,304',
          Rolls: 1,
          'Alt Rarity': '',
        },
        {
          'Dropped from': 'The Whisperer',
          Rarity: '1/1,536',
          Rolls: 1,
          'Alt Rarity': '',
        },
        {
          'Dropped from': 'Vardorvis',
          Rarity: '1/3,264',
          Rolls: 1,
          'Alt Rarity': '',
        },
      ],
    ],
  ]);

  const dropRates = await fetchItemDropRates([...generateRequiredItemList()]);

  const points = calculateItemPoints(dropRates, [
    { amount: 1, clogName: 'Virtus robe top' },
  ]);
  const expectedPoints = 405;

  expect(points).toEqual(expectedPoints);
});

it('divides the total points by the amount of rolls per drop', async () => {
  setup([
    [
      'Granite hammer',
      [
        {
          'Dropped from': 'Grotesque Guardians',
          Rarity: '1/750',
          Rolls: 2,
          'Alt Rarity': '',
        },
      ],
    ],
  ]);

  const dropRates = await fetchItemDropRates([...generateRequiredItemList()]);
  const points = calculateItemPoints(dropRates, [
    { amount: 1, clogName: 'Granite hammer' },
  ]);
  const expectedPoints = 56;

  expect(points).toEqual(expectedPoints);
});

it('does not modify the drop rate if "ignoreDropRateModifier" is true', async () => {
  setup([
    [
      'Thread of elidinis',
      [
        {
          'Dropped from': 'Chest (Tombs of Amascut)',
          Rarity: '1/10',
          Rolls: 1,
          'Alt Rarity': '',
        },
      ],
    ],
  ]);

  const dropRates = await fetchItemDropRates([...generateRequiredItemList()]);
  const points = calculateItemPoints(dropRates, [
    { amount: 1, clogName: 'Thread of elidinis', ignoreDropRateModifier: true },
  ]);
  const expectedPoints = 25;

  expect(points).toEqual(expectedPoints);
});

it('does not multiply the points by amount of items if "ignoreAmountMultiplier" is true', async () => {
  setup([
    [
      'Zenyte shard',
      [
        {
          'Dropped from': 'Demonic gorilla',
          Rarity: '1/300',
          Rolls: 1,
          'Alt Rarity': '',
        },
      ],
    ],
  ]);

  const dropRates = await fetchItemDropRates([...generateRequiredItemList()]);
  const points = calculateItemPoints(dropRates, [
    { amount: 2, clogName: 'Zenyte shard', ignoreAmountMultiplier: true },
  ]);
  const expectedPoints = 25;

  expect(points).toEqual(expectedPoints);
});

it('multiplies the points by amount of items if "amount" is greater than 1 and "ignoreAmountMultiplier" is not true', async () => {
  setup([
    [
      'Zenyte shard',
      [
        {
          'Dropped from': 'Demonic gorilla',
          Rarity: '1/300',
          Rolls: 1,
          'Alt Rarity': '',
        },
      ],
    ],
  ]);

  const dropRates = await fetchItemDropRates([...generateRequiredItemList()]);
  const points = calculateItemPoints(dropRates, [
    { amount: 2, clogName: 'Zenyte shard' },
  ]);
  const expectedPoints = 49;

  expect(points).toEqual(expectedPoints);
});
