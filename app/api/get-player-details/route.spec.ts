/**
 * @jest-environment node
 */

import { NextRequest } from 'next/server';
import { server } from '@/mocks/server';
import { http, HttpResponse } from 'msw';
import { constants } from '@/config/constants';
import {
  AchievementDiaryMap,
  FormData,
  PlayerData,
} from '@/types/rank-calculator';
import { merge } from 'lodash';
import { CombatAchievementTier, DiaryTier } from '@/types/osrs';
import { WikiSyncResponse } from '@/types/wiki';
import { CollectionLogResponse } from '@/types/collection-log';
import * as formData from '@/mocks/misc/form-data';
import * as wikiSync from '@/mocks/wiki-sync';
import * as collectionLog from '@/mocks/collection-log';
import * as templePlayerStats from '@/mocks/temple-player-stats';
import { ApiSuccess } from '@/types/api';
import { combatAchievementListFixture } from '@/mocks/wiki-data/combat-achievement-list';
import { GET } from './route';
import { ClanMember } from '../update-member-list/route';
import { PlayerStatsResponse } from '@/types/temple-api';

function setup() {
  const player = 'cousinofkos';
  const request = {
    nextUrl: {
      searchParams: new URLSearchParams({
        player,
      }),
    },
  } as NextRequest;

  // Clear the mocks before running tests to prevent inaccurate results
  server.use(
    http.get('https://*.public.blob.vercel-storage.com/members-*.json', () =>
      HttpResponse.json<ClanMember[]>([]),
    ),
    http.post(`${constants.redisUrl}/pipeline`, async () =>
      HttpResponse.json<{ result: null }[]>([{ result: null }]),
    ),
    http.get(
      `${constants.wikiSync.baseUrl}/runelite/player/${player}/STANDARD`,
      () => HttpResponse.json(wikiSync.emptyResponseFixture),
    ),
    http.get(
      `${constants.collectionLogBaseUrl}/collectionlog/user/${player}`,
      () => HttpResponse.json(collectionLog.emptyResponseFixture),
    ),
    http.get('https://templeosrs.com/api/player_stats.php', () =>
      HttpResponse.json(templePlayerStats.emptyResponseFixture),
    ),
  );

  return {
    request,
    player,
  };
}

it('returns the highest achievement diary values from the previous submission and API data', async () => {
  const { request, player } = setup();

  const savedSubmission = merge<unknown, FormData, DeepPartial<FormData>>(
    {},
    formData.midGamePlayer,
    {
      achievementDiaries: {
        'Kourend & Kebos': DiaryTier.Hard,
        'Lumbridge & Draynor': DiaryTier.Elite,
      },
    },
  );

  server.use(
    http.post(`${constants.redisUrl}/pipeline`, () =>
      HttpResponse.json<{ result: FormData }[]>([{ result: savedSubmission }]),
    ),
    http.get(
      `${constants.wikiSync.baseUrl}/runelite/player/${player}/STANDARD`,
      () =>
        HttpResponse.json<WikiSyncResponse>(
          merge<unknown, WikiSyncResponse, DeepPartial<WikiSyncResponse>>(
            {},
            wikiSync.midGamePlayerFixture,
            {
              achievement_diaries: {
                'Kourend & Kebos': {
                  Elite: {
                    complete: true,
                  },
                },
                'Lumbridge & Draynor': {
                  Elite: {
                    complete: false,
                  },
                },
              },
            },
          ),
        ),
    ),
  );

  const response = await GET(request);
  const result: ApiSuccess<PlayerData> = await response.json();

  expect(result.error).toBeNull();
  expect(result.data.achievementDiaries).toMatchObject<
    Partial<AchievementDiaryMap>
  >({
    'Kourend & Kebos': DiaryTier.Elite,
    'Lumbridge & Draynor': DiaryTier.Elite,
  });
});

it('merges the acquired items from the previous submission and API data', async () => {
  const { player, request } = setup();

  server.use(
    http.post(`${constants.redisUrl}/pipeline`, () =>
      HttpResponse.json<{ result: string }[]>([
        {
          result: JSON.stringify({
            acquiredItems: {
              'Bandos hilt': true,
            },
          } satisfies DeepPartial<FormData>),
        },
      ]),
    ),
    http.get(
      `${constants.collectionLogBaseUrl}/collectionlog/user/${player}`,
      () =>
        HttpResponse.json<DeepPartial<CollectionLogResponse>>({
          collectionLog: {
            tabs: {
              Bosses: {
                'General Graardor': {
                  items: [
                    {
                      name: 'Bandos hilt',
                      obtained: false,
                      id: 0,
                      obtainedAt: null,
                      quantity: 0,
                      sequence: 0,
                    },
                    {
                      name: 'Bandos chestplate',
                      obtained: true,
                      quantity: 1,
                      id: 0,
                      obtainedAt: null,
                      sequence: 0,
                    },
                  ],
                },
              },
            },
          },
        }),
    ),
  );
  const response = await GET(request);
  const result: ApiSuccess<PlayerData> = await response.json();

  expect(result.data.acquiredItems).toEqual([
    'Bandos chestplate',
    'Bandos hilt',
  ]);
});

it('returns the combat achievement tier from the API data if it is higher than the previous submission', async () => {
  const { player, request } = setup();

  server.use(
    http.post(`${constants.redisUrl}/pipeline`, () =>
      HttpResponse.json<{ result: string }[]>([
        {
          result: JSON.stringify(
            merge<unknown, FormData, DeepPartial<FormData>>(
              {},
              formData.midGamePlayer,
              { combatAchievementTier: CombatAchievementTier.Grandmaster },
            ),
          ),
        },
      ]),
    ),
    http.get(
      `${constants.wikiSync.baseUrl}/runelite/player/${player}/STANDARD`,
      () =>
        HttpResponse.json<WikiSyncResponse>(
          merge<unknown, WikiSyncResponse, DeepPartial<WikiSyncResponse>>(
            {},
            wikiSync.midGamePlayerFixture,
            {
              combat_achievements: Object.values(
                combatAchievementListFixture.query.results,
              )
                .filter(
                  ({ printouts }) =>
                    printouts['Combat Achievement JSON'].length,
                )
                .map((_, i) => i),
            },
          ),
        ),
    ),
  );
  const response = await GET(request);
  const result: ApiSuccess<PlayerData> = await response.json();

  expect(result.data.combatAchievementTier).toEqual(
    CombatAchievementTier.Grandmaster,
  );
});

it('returns the combat achievement tier from the previous submission if it is higher than the API data', async () => {
  const { player, request } = setup();

  server.use(
    http.post(`${constants.redisUrl}/pipeline`, () =>
      HttpResponse.json<{ result: string }[]>([
        {
          result: JSON.stringify(
            merge<unknown, FormData, DeepPartial<FormData>>(
              {},
              formData.midGamePlayer,
              { combatAchievementTier: CombatAchievementTier.Hard },
            ),
          ),
        },
      ]),
    ),
    http.get(
      `${constants.wikiSync.baseUrl}/runelite/player/${player}/STANDARD`,
      () =>
        HttpResponse.json<WikiSyncResponse>({
          ...wikiSync.midGamePlayerFixture,
          combat_achievements: [1],
        }),
    ),
  );
  const response = await GET(request);
  const result: ApiSuccess<PlayerData> = await response.json();

  expect(result.data.combatAchievementTier).toEqual(CombatAchievementTier.Hard);
});

it('returns the collection log count from the previous submission if it is higher than the API data', async () => {
  const { player, request } = setup();

  server.use(
    http.post(`${constants.redisUrl}/pipeline`, () =>
      HttpResponse.json<{ result: string }[]>([
        {
          result: JSON.stringify(
            merge<unknown, FormData, DeepPartial<FormData>>(
              {},
              formData.midGamePlayer,
              { collectionLogCount: 100 },
            ),
          ),
        },
      ]),
    ),
    http.get(
      `${constants.collectionLogBaseUrl}/collectionlog/user/${player}`,
      () =>
        HttpResponse.json<CollectionLogResponse>(
          merge<
            unknown,
            CollectionLogResponse,
            DeepPartial<CollectionLogResponse>
          >({}, collectionLog.midGamePlayerFixture, {
            collectionLog: {
              uniqueObtained: 0,
            },
          }),
        ),
    ),
  );
  const response = await GET(request);
  const result: ApiSuccess<PlayerData> = await response.json();

  expect(result.data.collectionLogCount).toEqual(100);
});

it('returns the collection log count from the API data if it is higher than the previous submission', async () => {
  const { player, request } = setup();

  server.use(
    http.post(`${constants.redisUrl}/pipeline`, () =>
      HttpResponse.json<{ result: string }[]>([
        {
          result: JSON.stringify(
            merge<unknown, FormData, DeepPartial<FormData>>(
              {},
              formData.midGamePlayer,
              { collectionLogCount: 123 },
            ),
          ),
        },
      ]),
    ),
    http.get(
      `${constants.collectionLogBaseUrl}/collectionlog/user/${player}`,
      () =>
        HttpResponse.json<CollectionLogResponse>(
          merge<
            unknown,
            CollectionLogResponse,
            DeepPartial<CollectionLogResponse>
          >({}, collectionLog.midGamePlayerFixture, {
            collectionLog: {
              uniqueObtained: 1000,
            },
          }),
        ),
    ),
  );
  const response = await GET(request);
  const result: ApiSuccess<PlayerData> = await response.json();

  expect(result.data.collectionLogCount).toEqual(1000);
});

it('returns the ehb from the API data if it is higher than the previous submission', async () => {
  const { request } = setup();

  server.use(
    http.post(`${constants.redisUrl}/pipeline`, () =>
      HttpResponse.json<{ result: string }[]>([
        {
          result: JSON.stringify(
            merge<unknown, FormData, DeepPartial<FormData>>(
              {},
              formData.midGamePlayer,
              { ehb: 0 },
            ),
          ),
        },
      ]),
    ),
    http.get('https://templeosrs.com/api/player_stats.php', () =>
      HttpResponse.json<PlayerStatsResponse>({
        data: {
          ...templePlayerStats.midGamePlayerFixture.data,
          Im_ehb: 100,
        },
      }),
    ),
  );
  const response = await GET(request);
  const result: ApiSuccess<PlayerData> = await response.json();

  expect(result.data.ehb).toEqual(100);
});

it('returns the ehb from the previous submission if it is higher than the API data', async () => {
  const { request } = setup();

  server.use(
    http.post(`${constants.redisUrl}/pipeline`, () =>
      HttpResponse.json<{ result: string }[]>([
        {
          result: JSON.stringify(
            merge<unknown, FormData, DeepPartial<FormData>>(
              {},
              formData.midGamePlayer,
              { ehb: 100 },
            ),
          ),
        },
      ]),
    ),
    http.get('https://templeosrs.com/api/player_stats.php', () =>
      HttpResponse.json<PlayerStatsResponse>({
        data: {
          ...templePlayerStats.midGamePlayerFixture.data,
          Im_ehb: 0,
        },
      }),
    ),
  );
  const response = await GET(request);
  const result: ApiSuccess<PlayerData> = await response.json();

  expect(result.data.ehb).toEqual(100);
});

it('returns the ehp from the API data if it is higher than the previous submission', async () => {
  const { request } = setup();

  server.use(
    http.post(`${constants.redisUrl}/pipeline`, () =>
      HttpResponse.json<{ result: string }[]>([
        {
          result: JSON.stringify(
            merge<unknown, FormData, DeepPartial<FormData>>(
              {},
              formData.midGamePlayer,
              { ehp: 0 },
            ),
          ),
        },
      ]),
    ),
    http.get('https://templeosrs.com/api/player_stats.php', () =>
      HttpResponse.json<PlayerStatsResponse>({
        data: {
          ...templePlayerStats.midGamePlayerFixture.data,
          Im_ehp: 100,
        },
      }),
    ),
  );
  const response = await GET(request);
  const result: ApiSuccess<PlayerData> = await response.json();

  expect(result.data.ehp).toEqual(100);
});

it('returns the ehp from the previous submission if it is higher than the API data', async () => {
  const { request } = setup();

  server.use(
    http.post(`${constants.redisUrl}/pipeline`, () =>
      HttpResponse.json<{ result: string }[]>([
        {
          result: JSON.stringify(
            merge<unknown, FormData, DeepPartial<FormData>>(
              {},
              formData.midGamePlayer,
              { ehp: 100 },
            ),
          ),
        },
      ]),
    ),
    http.get('https://templeosrs.com/api/player_stats.php', () =>
      HttpResponse.json<PlayerStatsResponse>({
        data: {
          ...templePlayerStats.midGamePlayerFixture.data,
          Im_ehp: 0,
        },
      }),
    ),
  );
  const response = await GET(request);
  const result: ApiSuccess<PlayerData> = await response.json();

  expect(result.data.ehp).toEqual(100);
});

it.todo(
  'returns the total level from the API data if it is higher than the previous submission',
);

it.todo(
  'returns the total level from the previous submission if it is higher than the API data',
);

it('returns the collection log total items from the API data', async () => {
  const { player, request } = setup();

  server.use(
    http.get(
      `${constants.collectionLogBaseUrl}/collectionlog/user/${player}`,
      () =>
        HttpResponse.json<CollectionLogResponse>(
          merge<
            unknown,
            CollectionLogResponse,
            DeepPartial<CollectionLogResponse>
          >({}, collectionLog.midGamePlayerFixture, {
            collectionLog: {
              uniqueItems: 1234,
            },
          }),
        ),
    ),
  );
  const response = await GET(request);
  const result: ApiSuccess<PlayerData> = await response.json();

  expect(result.data.collectionLogTotal).toEqual(1234);
});

it.todo('returns the join date from the member list if present');

it.todo(
  'returns the join date from the previous submission if not found in member list',
);

it.todo(
  'returns no join date if not in member list and no previous submission',
);

it.todo('returns the player name from the member list if present');

it.todo(
  'returns the player name from the query parameters if not found in member list',
);

it.todo('returns the rank structure from the previous submission if found');

it.todo(
  'returns the default rank structure if no previous submission is found',
);
