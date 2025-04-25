import { server } from '@/mocks/server';
import { http, HttpResponse } from 'msw';
import { clientConstants } from '@/config/constants.client';
import { DroppedItemJSON, DroppedItemResponse } from '@/app/schemas/wiki';
import { z } from 'zod';
import { CollectionLogItemName } from '@/app/schemas/osrs';
import { calculateItemPoints } from './calculate-item-points';

type ItemResult = Omit<z.input<typeof DroppedItemJSON>, 'Drop type'>;

function setup(
  itemName: CollectionLogItemName,
  results: NonEmptyArray<ItemResult>,
) {
  const responseMock = {
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

  server.use(
    http.get(`${clientConstants.wiki.baseUrl}/api.php`, ({ request }) => {
      const wikiQueryMatcher = /Dropped item::([\w|\s|']+)/i;
      const [, requestedItemName] =
        new URL(request.url).searchParams
          .get('query')
          ?.match(wikiQueryMatcher) ?? [];

      if (requestedItemName === itemName) {
        return HttpResponse.json(responseMock);
      }

      return HttpResponse.error();
    }),
  );
}

const testCases = [
  {
    itemName: 'Berserker ring',
    results: [
      {
        'Alt Rarity': '',
        'Dropped from': 'Dagannoth Rex',
        Rarity: '1/128',
      },
    ],
    expectedPoints: 7,
  },
  {
    itemName: 'Abyssal orphan',
    results: [
      {
        'Alt Rarity': '',
        'Dropped from': 'Unsired',
        Rarity: '5/128',
      },
    ],
    expectedPoints: 329,
  },
  {
    itemName: 'Jar of miasma',
    results: [
      {
        'Alt Rarity': '',
        'Dropped from': 'Unsired',
        Rarity: '13/128',
      },
    ],
    expectedPoints: 127,
  },
  {
    itemName: 'Abyssal dagger',
    results: [
      {
        'Alt Rarity': '',
        'Dropped from': 'Unsired',
        Rarity: '26/128',
      },
    ],
    expectedPoints: 64,
  },
  {
    itemName: "Hydra's claw",
    results: [
      {
        'Alt Rarity': '',
        'Dropped from': 'Alchemical Hydra',
        Rarity: '1/1001',
      },
    ],
    expectedPoints: 173,
  },
] satisfies NonEmptyArray<{
  itemName: CollectionLogItemName;
  results: NonEmptyArray<ItemResult>;
  expectedPoints: number;
}>;

it.each(testCases)(
  'calculates the correct points for "$itemName"',
  async ({ expectedPoints, results, itemName }) => {
    setup(itemName, results);

    const points = await calculateItemPoints(itemName);

    expect(points).toEqual(expectedPoints);
  },
);

it('calculates the correct points when a specific drop source has been selected', async () => {
  const itemName = 'Abyssal dagger';

  setup(itemName, [
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
  ]);

  const points = await calculateItemPoints(itemName, 'Unsired');
  const expectedPoints = 64;

  expect(points).toEqual(expectedPoints);
});
