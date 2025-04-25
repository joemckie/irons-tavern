import { server } from '@/mocks/server';
import { http, HttpResponse } from 'msw';
import { clientConstants } from '@/config/constants.client';
import { DroppedItemJSON, DroppedItemResponse } from '@/app/schemas/wiki';
import { z } from 'zod';
import { CollectionLogItemName } from '@/app/schemas/osrs';
import { calculateItemPoints } from './calculate-item-points';

type ItemResult = Omit<
  z.input<typeof DroppedItemJSON>,
  'Drop type' | 'Alt rarity'
>;

type SetupItem = [itemName: CollectionLogItemName, results: ItemResult[]];

type ItemPointsParameters = [
  itemName: CollectionLogItemName,
  targetDropSource?: string,
];

function setup(items: SetupItem[]) {
  const responseMock = items.reduce(
    (acc, [itemName, results]) => {
      const itemResponse = {
        query: {
          results: Object.fromEntries(
            results.map(({ 'Dropped from': dropSource, Rarity: rarity }) => [
              `${dropSource}#DROP 1 ${itemName} 1 ${rarity}`,
              {
                printouts: {
                  'Drop JSON': [
                    JSON.stringify({
                      Rarity: rarity,
                      'Drop type': 'reward',
                      'Dropped from': dropSource,
                    } satisfies z.input<typeof DroppedItemJSON>),
                  ],
                },
              },
            ]),
          ),
        },
      } satisfies z.input<typeof DroppedItemResponse>;

      acc[itemName] = itemResponse;

      return acc;
    },
    {} as Record<CollectionLogItemName, z.input<typeof DroppedItemResponse>>,
  );

  server.use(
    http.get(`${clientConstants.wiki.baseUrl}/api.php`, ({ request }) => {
      const wikiQueryMatcher = /Dropped item::([\w|\s|']+)/i;
      const [, requestedItemName] =
        new URL(request.url).searchParams
          .get('query')
          ?.match(wikiQueryMatcher) ?? [];

      if (requestedItemName in responseMock) {
        return HttpResponse.json(
          responseMock[requestedItemName as CollectionLogItemName],
        );
      }

      return HttpResponse.error();
    }),
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

    const points = await calculateItemPoints(
      itemSources.map<ItemPointsParameters>((itemSource) => [
        itemSource.item,
        'targetDropSource' in itemSource
          ? itemSource.targetDropSource
          : undefined,
      ]) as NonEmptyArray<ItemPointsParameters>,
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

  const points = await calculateItemPoints([[item, 'Unsired']]);
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

  const points = await calculateItemPoints([
    ['Bludgeon axon', 'Unsired'],
    ['Bludgeon claw', 'Unsired'],
    ['Bludgeon spine', 'Unsired'],
  ]);
  const expectedPoints = 80;

  expect(points).toEqual(expectedPoints);
});
