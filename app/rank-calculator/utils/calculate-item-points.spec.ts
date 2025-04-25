import { server } from '@/mocks/server';
import { http, HttpResponse } from 'msw';
import { clientConstants } from '@/config/constants.client';
import { DroppedItemJSON, DroppedItemResponse } from '@/app/schemas/wiki';
import { z } from 'zod';
import { CollectionLogItemName } from '@/app/schemas/osrs';
import { calculateItemPoints } from './calculate-item-points';

type ItemResult = Omit<z.input<typeof DroppedItemJSON>, 'Drop type'>;

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
            results.map(
              ({
                'Alt Rarity': altRarity,
                'Dropped from': dropSource,
                Rarity: rarity,
              }) => [
                `${dropSource}#DROP 1 ${itemName} 1 ${rarity}`,
                {
                  printouts: {
                    'Drop JSON': [
                      JSON.stringify({
                        Rarity: rarity,
                        'Drop type': 'reward',
                        'Dropped from': dropSource,
                        'Alt Rarity': altRarity,
                      } satisfies z.input<typeof DroppedItemJSON>),
                    ],
                  },
                },
              ],
            ),
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
            'Alt Rarity': '',
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
            'Alt Rarity': '',
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
            'Alt Rarity': '',
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
            'Alt Rarity': '',
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
            'Alt Rarity': '',
            'Dropped from': 'Unsired',
            Rarity: '62/128',
          },
        ],
      },
      {
        item: 'Bludgeon claw',
        results: [
          {
            'Alt Rarity': '',
            'Dropped from': 'Unsired',
            Rarity: '62/128',
          },
        ],
      },
      {
        item: 'Bludgeon spine',
        results: [
          {
            'Alt Rarity': '',
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
            'Alt Rarity': '',
            'Dropped from': 'Alchemical Hydra',
            Rarity: '1/1001',
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
          'Alt Rarity': '',
          'Dropped from': 'Abyssal demon',
          Rarity: '1/32000',
        },
        {
          'Alt Rarity': '',
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
          'Alt Rarity': '',
          'Dropped from': 'Unsired',
          Rarity: '62/128',
        },
      ],
    ],
    [
      'Bludgeon claw',
      [
        {
          'Alt Rarity': '',
          'Dropped from': 'Unsired',
          Rarity: '62/128',
        },
      ],
    ],
    [
      'Bludgeon spine',
      [
        {
          'Alt Rarity': '',
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
