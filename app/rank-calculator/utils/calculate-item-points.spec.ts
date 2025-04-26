import { server } from '@/mocks/server';
import { http, HttpResponse } from 'msw';
import { clientConstants } from '@/config/constants.client';
import { DroppedItemJSON, DroppedItemResponse } from '@/app/schemas/wiki';
import { z } from 'zod';
import { CollectionLogItemName } from '@/app/schemas/osrs';
import { RequiredItem } from '@/app/schemas/items';
import { calculateItemPoints } from './calculate-item-points';
import { fetchItemDropRates } from '../data-sources/fetch-dropped-item-info';

type ItemResult = Omit<
  z.input<typeof DroppedItemJSON>,
  'Drop type' | 'Alt rarity' | 'Dropped item'
>;

type SetupItem = [itemName: CollectionLogItemName, results: ItemResult[]];

function setup(items: SetupItem[]) {
  const responseMock = items.reduce(
    (acc, [itemName, results]) => {
      results.forEach(({ 'Dropped from': dropSource, Rarity: rarity }) => {
        acc.query.results[`${dropSource}#DROP 1 ${itemName} 1 ${rarity}`] = {
          printouts: {
            'Drop JSON': [
              JSON.stringify({
                Rarity: rarity,
                'Dropped from': dropSource,
                'Dropped item': itemName,
              } satisfies z.input<typeof DroppedItemJSON>),
            ],
          },
        };
      });

      return acc;
    },
    {
      query: {
        results: {},
      },
    } as z.input<typeof DroppedItemResponse>,
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
        targetDropSource: 'Unsired',
        results: [
          {
            'Dropped from': 'Unsired',
            Rarity: '26/128',
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
          },
        ],
      },
      {
        item: 'Bludgeon claw',
        results: [
          {
            'Dropped from': 'Unsired',
            Rarity: '62/128',
          },
        ],
      },
      {
        item: 'Bludgeon spine',
        results: [
          {
            'Dropped from': 'Unsired',
            Rarity: '62/128',
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
          },
        ],
      },
    ],
  },
  {
    expectedPoints: 94,
    itemName: 'Brimstone ring',
    itemSources: [
      {
        item: "Hydra's eye",
        targetDropSource: 'Alchemical Hydra',
        results: [
          {
            'Dropped from': 'Alchemical Hydra',
            Rarity: '1/181',
          },
        ],
      },
      {
        item: "Hydra's fang",
        targetDropSource: 'Alchemical Hydra',
        results: [
          {
            'Dropped from': 'Alchemical Hydra',
            Rarity: '1/181',
          },
        ],
      },
      {
        item: "Hydra's heart",
        targetDropSource: 'Alchemical Hydra',
        results: [
          {
            'Dropped from': 'Alchemical Hydra',
            Rarity: '1/181',
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
        targetDropSource: 'Alchemical Hydra',
        results: [
          {
            'Dropped from': 'Alchemical Hydra',
            Rarity: '1/513',
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
        targetDropSource: 'Alchemical Hydra',
        results: [
          {
            'Dropped from': 'Alchemical Hydra',
            Rarity: '1/514',
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
          },
        ],
      },
      {
        item: "Siren's staff",
        results: [
          {
            'Dropped from': 'The Whisperer',
            Rarity: '1/512',
          },
        ],
      },
      {
        item: "Executioner's axe head",
        results: [
          {
            'Dropped from': 'Vardorvis',
            Rarity: '1/1088',
          },
        ],
      },
      {
        item: 'Eye of the duke',
        results: [
          {
            'Dropped from': 'Duke Sucellus',
            Rarity: '1/720',
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
    targetDropSource?: string;
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

    const dropRates =
      (await fetchItemDropRates(
        new Set(itemSourcesTuple.map(([item]) => item)),
      )) ?? {};
    const points = calculateItemPoints(
      dropRates,
      itemSources.map((itemSource) => ({
        amount: 1,
        clogName: itemSource.item,
        targetDropSource:
          'targetDropSource' in itemSource
            ? itemSource.targetDropSource
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
        },
        {
          'Dropped from': 'Unsired',
          Rarity: '26/128',
        },
      ],
    ],
  ]);

  const dropRates = (await fetchItemDropRates(new Set([item]))) ?? {};
  const points = calculateItemPoints(dropRates, [
    {
      amount: 1,
      clogName: item,
    },
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
        },
      ],
    ],
    [
      'Bludgeon claw',
      [
        {
          'Dropped from': 'Unsired',
          Rarity: '62/128',
        },
      ],
    ],
    [
      'Bludgeon spine',
      [
        {
          'Dropped from': 'Unsired',
          Rarity: '62/128',
        },
      ],
    ],
  ]);

  const dropRates =
    (await fetchItemDropRates(
      new Set(['Bludgeon axon', 'Bludgeon claw', 'Bludgeon spine']),
    )) ?? {};

  const points = calculateItemPoints(dropRates, [
    {
      amount: 1,
      clogName: 'Bludgeon axon',
      targetDropSource: 'Unsired',
    },
    {
      amount: 1,
      clogName: 'Bludgeon claw',
      targetDropSource: 'Unsired',
    },
    {
      amount: 1,
      clogName: 'Bludgeon spine',
      targetDropSource: 'Unsired',
    },
  ]);
  const expectedPoints = 80;

  expect(points).toEqual(expectedPoints);
});
