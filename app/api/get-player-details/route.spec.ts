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
  RankStructure,
} from '@/types/rank-calculator';
import { merge, set } from 'lodash';
import { CombatAchievementTier, DiaryTier } from '@/types/osrs';
import { WikiSyncResponse } from '@/types/wiki';
import { CollectionLogResponse } from '@/types/collection-log';
import * as formData from '@/mocks/misc/form-data';
import * as wikiSync from '@/mocks/wiki-sync';
import * as collectionLog from '@/mocks/collection-log';
import * as templePlayerStats from '@/mocks/temple-player-stats';
import { ApiError, ApiSuccess } from '@/types/api';
import { combatAchievementListFixture } from '@/mocks/wiki-data/combat-achievement-list';
import { GameMode, PlayerStatsResponse } from '@/types/temple-api';
import { Rank } from '@/config/enums';
import { GET } from './route';
import { ClanMember } from '../update-member-list/route';

function setup() {
  const player = 'cousinofkos';
  const request = new NextRequest(
    `${constants.publicUrl}/api/get-player-details?player=${player}`,
  );

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

it('returns no achievement diaries if there is no WikiSync data and no previous submission', async () => {
  const { request, player } = setup();

  server.use(
    http.get(
      `${constants.collectionLogBaseUrl}/collectionlog/user/${player}`,
      () =>
        HttpResponse.json<CollectionLogResponse>(
          collectionLog.midGamePlayerFixture,
        ),
    ),
  );

  const response = await GET(request);
  const result: ApiSuccess<PlayerData> = await response.json();

  expect(result.error).toBeNull();
  expect(result.data.achievementDiaries).toBeNull();
});

it('returns the highest achievement diary values from the previous submission and API data', async () => {
  const { request, player } = setup();

  server.use(
    http.post(`${constants.redisUrl}/pipeline`, () =>
      HttpResponse.json<[{ result: string }]>([
        {
          result: JSON.stringify(
            merge<
              unknown,
              Omit<FormData, 'rank' | 'points'>,
              DeepPartial<Omit<FormData, 'rank' | 'points'>>
            >({}, formData.midGamePlayer, {
              achievementDiaries: {
                'Kourend & Kebos': DiaryTier.Medium,
                'Lumbridge & Draynor': DiaryTier.Elite,
              },
            }),
          ),
        },
      ]),
    ),
    http.get(
      `${constants.wikiSync.baseUrl}/runelite/player/${player}/STANDARD`,
      () =>
        HttpResponse.json<WikiSyncResponse>(
          set(
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
            ['achievement_diaries', 'Lumbridge & Draynor', 'Elite', 'tasks'],
            [],
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
      HttpResponse.json<[{ result: string }]>([
        {
          result: JSON.stringify({
            acquiredItems: {
              'Bandos hilt': true,
              'Bandos boots': false,
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
                    {
                      name: 'Bandos boots',
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
    'Bandos boots',
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
            merge<
              unknown,
              Omit<FormData, 'rank' | 'points'>,
              DeepPartial<Omit<FormData, 'rank' | 'points'>>
            >({}, formData.midGamePlayer, {
              combatAchievementTier: CombatAchievementTier.Grandmaster,
            }),
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
            merge<
              unknown,
              Omit<FormData, 'rank' | 'points'>,
              DeepPartial<Omit<FormData, 'rank' | 'points'>>
            >({}, formData.midGamePlayer, {
              combatAchievementTier: CombatAchievementTier.Hard,
            }),
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
            merge<
              unknown,
              Omit<FormData, 'rank' | 'points'>,
              DeepPartial<Omit<FormData, 'rank' | 'points'>>
            >({}, formData.midGamePlayer, { collectionLogCount: 100 }),
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
            merge<
              unknown,
              Omit<FormData, 'rank' | 'points'>,
              DeepPartial<Omit<FormData, 'rank' | 'points'>>
            >({}, formData.midGamePlayer, { collectionLogCount: 123 }),
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
            merge<
              unknown,
              Omit<FormData, 'rank' | 'points'>,
              DeepPartial<Omit<FormData, 'rank' | 'points'>>
            >({}, formData.midGamePlayer, { ehb: 0 }),
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
            merge<
              unknown,
              Omit<FormData, 'rank' | 'points'>,
              DeepPartial<Omit<FormData, 'rank' | 'points'>>
            >({}, formData.midGamePlayer, { ehb: 100 }),
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
            merge<
              unknown,
              Omit<FormData, 'rank' | 'points'>,
              DeepPartial<Omit<FormData, 'rank' | 'points'>>
            >({}, formData.midGamePlayer, { ehp: 0 }),
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
            merge<
              unknown,
              Omit<FormData, 'rank' | 'points'>,
              DeepPartial<Omit<FormData, 'rank' | 'points'>>
            >({}, formData.midGamePlayer, { ehp: 100 }),
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

it('returns the total level from the API data if it is higher than the previous submission', async () => {
  const { request } = setup();

  server.use(
    http.post(`${constants.redisUrl}/pipeline`, () =>
      HttpResponse.json<{ result: string }[]>([
        {
          result: JSON.stringify(
            merge<
              unknown,
              Omit<FormData, 'rank' | 'points'>,
              DeepPartial<Omit<FormData, 'rank' | 'points'>>
            >({}, formData.midGamePlayer, { totalLevel: 100 }),
          ),
        },
      ]),
    ),
    http.get('https://templeosrs.com/api/player_stats.php', () =>
      HttpResponse.json<PlayerStatsResponse>({
        data: {
          ...templePlayerStats.midGamePlayerFixture.data,
          Overall_level: 1000,
        },
      }),
    ),
  );
  const response = await GET(request);
  const result: ApiSuccess<PlayerData> = await response.json();

  expect(result.data.totalLevel).toEqual(1000);
});

it('returns the total level from the previous submission if it is higher than the API data', async () => {
  const { request } = setup();

  server.use(
    http.post(`${constants.redisUrl}/pipeline`, () =>
      HttpResponse.json<{ result: string }[]>([
        {
          result: JSON.stringify(
            merge<
              unknown,
              Omit<FormData, 'rank' | 'points'>,
              DeepPartial<Omit<FormData, 'rank' | 'points'>>
            >({}, formData.midGamePlayer, { totalLevel: 1000 }),
          ),
        },
      ]),
    ),
    http.get('https://templeosrs.com/api/player_stats.php', () =>
      HttpResponse.json<PlayerStatsResponse>({
        data: {
          ...templePlayerStats.midGamePlayerFixture.data,
          Overall_level: 100,
        },
      }),
    ),
  );
  const response = await GET(request);
  const result: ApiSuccess<PlayerData> = await response.json();

  expect(result.data.totalLevel).toEqual(1000);
});

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

it('returns the join date from the member list if present', async () => {
  const { player, request } = setup();

  server.use(
    http.get('https://*.public.blob.vercel-storage.com/members-*.json', () =>
      HttpResponse.json<ClanMember[]>([
        {
          joinedDate: '01-Jan-2020',
          rank: Rank.Air,
          rsn: player,
        },
      ]),
    ),
    http.post(`${constants.redisUrl}/pipeline`, () =>
      HttpResponse.json<{ result: string }[]>([
        {
          result: JSON.stringify(
            merge<
              unknown,
              Omit<FormData, 'rank' | 'points'>,
              DeepPartial<Omit<FormData, 'rank' | 'points'>>
            >({}, formData.midGamePlayer, { joinDate: new Date('2021-01-01') }),
          ),
        },
      ]),
    ),
  );
  const response = await GET(request);
  const result: ApiSuccess<PlayerData> = await response.json();

  expect(result.data.joinDate).toEqual(new Date('2020-01-01').toISOString());
});

it('returns the join date from the previous submission if not found in member list', async () => {
  const { request } = setup();

  server.use(
    http.post(`${constants.redisUrl}/pipeline`, () =>
      HttpResponse.json<{ result: string }[]>([
        {
          result: JSON.stringify(
            merge<
              unknown,
              Omit<FormData, 'rank' | 'points'>,
              DeepPartial<Omit<FormData, 'rank' | 'points'>>
            >({}, formData.midGamePlayer, { joinDate: new Date('2021-01-01') }),
          ),
        },
      ]),
    ),
  );
  const response = await GET(request);
  const result: ApiSuccess<PlayerData> = await response.json();

  expect(result.data.joinDate).toEqual(new Date('2021-01-01').toISOString());
});

it('returns no join date if not in member list and no previous submission is found', async () => {
  const { request } = setup();

  const response = await GET(request);
  const result: ApiSuccess<PlayerData> = await response.json();

  expect(result.data.joinDate).toBeNull();
});

it('returns the player name from the member list if present', async () => {
  const { request } = setup();

  server.use(
    http.post(`${constants.redisUrl}/pipeline`, () =>
      HttpResponse.json<{ result: string }[]>([
        { result: JSON.stringify(formData.midGamePlayer) },
      ]),
    ),
    http.get('https://*.public.blob.vercel-storage.com/members-*.json', () =>
      HttpResponse.json<ClanMember[]>([
        {
          joinedDate: '01-Jan-2020',
          rank: Rank.Air,
          rsn: 'CousinOfKos',
        },
      ]),
    ),
  );
  const response = await GET(request);
  const result: ApiSuccess<PlayerData> = await response.json();

  expect(result.data.playerName).toEqual('CousinOfKos');
});

it('returns the player name from the query parameters if not found in member list', async () => {
  const { player, request } = setup();

  server.use(
    http.post(`${constants.redisUrl}/pipeline`, () =>
      HttpResponse.json<{ result: string }[]>([
        { result: JSON.stringify(formData.midGamePlayer) },
      ]),
    ),
  );
  const response = await GET(request);
  const result: ApiSuccess<PlayerData> = await response.json();

  expect(result.data.playerName).toEqual(player);
});

it('returns the player name from the query parameters if there is a network error whilst loading the member list', async () => {
  jest.spyOn(console, 'error').mockImplementationOnce(jest.fn);

  const { player, request } = setup();

  server.use(
    http.get('https://*.public.blob.vercel-storage.com/members-*.json', () =>
      HttpResponse.error(),
    ),
    http.post(`${constants.redisUrl}/pipeline`, () =>
      HttpResponse.json<{ result: string }[]>([
        { result: JSON.stringify(formData.midGamePlayer) },
      ]),
    ),
  );
  const response = await GET(request);
  const result: ApiSuccess<PlayerData> = await response.json();

  expect(result.data.playerName).toEqual(player);
});

it('returns the rank structure from the previous submission if found', async () => {
  const { request } = setup();

  server.use(
    http.post(`${constants.redisUrl}/pipeline`, () =>
      HttpResponse.json<{ result: string }[]>([
        {
          result: JSON.stringify(
            merge<
              unknown,
              Omit<FormData, 'rank' | 'points'>,
              DeepPartial<Omit<FormData, 'rank' | 'points'>>
            >({}, formData.midGamePlayer, {
              rankStructure: RankStructure.Admin,
            }),
          ),
        },
      ]),
    ),
  );
  const response = await GET(request);
  const result: ApiSuccess<PlayerData> = await response.json();

  expect(result.data.rankStructure).toEqual(RankStructure.Admin);
});

it('returns the default rank structure if no previous submission is found', async () => {
  const { request } = setup();
  const response = await GET(request);
  const result: ApiSuccess<PlayerData> = await response.json();

  expect(result.data.rankStructure).toEqual(RankStructure.Standard);
});

it('returns an empty response if no third party data is found', async () => {
  const { request } = setup();
  const response = await GET(request);
  const result: ApiSuccess<PlayerData> = await response.json();
  const emptyResponse = {
    achievementDiaries: null,
    acquiredItems: null,
    joinDate: null,
    collectionLogCount: null,
    collectionLogTotal: null,
    combatAchievementTier: null,
    ehb: null,
    ehp: null,
    totalLevel: null,
    playerName: null,
    rankStructure: RankStructure.Standard,
  } satisfies PlayerData;

  expect(response.status).toBe(404);
  expect(result).toMatchObject<ApiSuccess<PlayerData>>({
    success: true,
    error: null,
    data: emptyResponse,
  });
});

it('returns an error if no player is provided', async () => {
  const response = await GET(
    new NextRequest(`${constants.publicUrl}/api/get-player-details`),
  );
  const result: ApiSuccess<PlayerData> = await response.json();

  expect(response.status).toBe(400);
  expect(result).toMatchObject<ApiError>({
    error: 'No player provided',
    success: false,
  });
});

it('returns the correct efficiency values for GIM accounts', async () => {
  const { request } = setup();

  server.use(
    http.get('https://templeosrs.com/api/player_stats.php', () =>
      HttpResponse.json<DeepPartial<PlayerStatsResponse>>({
        data: {
          ...templePlayerStats.midGamePlayerFixture.data,
          info: {
            'Game mode': GameMode.GroupIronman,
          },
          Ehb: 12,
          Ehp: 34,
          Im_ehb: 56,
          Im_ehp: 78,
          Uim_ehp: 90,
        },
      }),
    ),
  );
  const response = await GET(request);
  const result: ApiSuccess<PlayerData> = await response.json();

  expect(result.data.ehb).toEqual(12);
  expect(result.data.ehp).toEqual(34);
});

it('returns the correct efficiency values for UIM accounts', async () => {
  const { request } = setup();

  server.use(
    http.get('https://templeosrs.com/api/player_stats.php', () =>
      HttpResponse.json<DeepPartial<PlayerStatsResponse>>({
        data: {
          ...templePlayerStats.midGamePlayerFixture.data,
          info: {
            'Game mode': GameMode.UltimateIronman,
          },
          Ehb: 12,
          Ehp: 34,
          Im_ehb: 56,
          Im_ehp: 78,
          Uim_ehp: 90,
        },
      }),
    ),
  );
  const response = await GET(request);
  const result: ApiSuccess<PlayerData> = await response.json();

  expect(result.data.ehb).toEqual(56);
  expect(result.data.ehp).toEqual(90);
});

it('returns the correct efficiency values for HCIM accounts', async () => {
  const { request } = setup();

  server.use(
    http.get('https://templeosrs.com/api/player_stats.php', () =>
      HttpResponse.json<DeepPartial<PlayerStatsResponse>>({
        data: {
          ...templePlayerStats.midGamePlayerFixture.data,
          info: {
            'Game mode': GameMode.HardcoreIronman,
          },
          Ehb: 12,
          Ehp: 34,
          Im_ehb: 56,
          Im_ehp: 78,
          Uim_ehp: 90,
        },
      }),
    ),
  );
  const response = await GET(request);
  const result: ApiSuccess<PlayerData> = await response.json();

  expect(result.data.ehb).toEqual(56);
  expect(result.data.ehp).toEqual(78);
});

it('returns the correct efficiency values for ironman accounts', async () => {
  const { request } = setup();

  server.use(
    http.get('https://templeosrs.com/api/player_stats.php', () =>
      HttpResponse.json<DeepPartial<PlayerStatsResponse>>({
        data: {
          ...templePlayerStats.midGamePlayerFixture.data,
          info: {
            'Game mode': GameMode.Ironman,
          },
          Ehb: 12,
          Ehp: 34,
          Im_ehb: 56,
          Im_ehp: 78,
          Uim_ehp: 90,
        },
      }),
    ),
  );
  const response = await GET(request);
  const result: ApiSuccess<PlayerData> = await response.json();

  expect(result.data.ehb).toEqual(56);
  expect(result.data.ehp).toEqual(78);
});

it('returns no efficiency values for unknown accounts', async () => {
  const { request } = setup();

  server.use(
    http.get('https://templeosrs.com/api/player_stats.php', () =>
      HttpResponse.json<DeepPartial<PlayerStatsResponse>>({
        data: {
          ...templePlayerStats.midGamePlayerFixture.data,
          info: {
            'Game mode': 4 as GameMode,
          },
          Ehb: 12,
          Ehp: 34,
          Im_ehb: 56,
          Im_ehp: 78,
          Uim_ehp: 90,
        },
      }),
    ),
  );
  const response = await GET(request);
  const result: ApiSuccess<PlayerData> = await response.json();

  expect(result.data.ehb).toEqual(null);
  expect(result.data.ehp).toEqual(null);
});

it('rounds the ehb value', async () => {
  const { request } = setup();

  server.use(
    http.get('https://templeosrs.com/api/player_stats.php', () =>
      HttpResponse.json<DeepPartial<PlayerStatsResponse>>({
        data: {
          ...templePlayerStats.midGamePlayerFixture.data,
          Im_ehb: 90.99,
        },
      }),
    ),
  );
  const response = await GET(request);
  const result: ApiSuccess<PlayerData> = await response.json();

  expect(result.data.ehb).toEqual(91);
});

it('rounds the ehp value', async () => {
  const { request } = setup();

  server.use(
    http.get('https://templeosrs.com/api/player_stats.php', () =>
      HttpResponse.json<DeepPartial<PlayerStatsResponse>>({
        data: {
          ...templePlayerStats.midGamePlayerFixture.data,
          Im_ehp: 13.37,
        },
      }),
    ),
  );
  const response = await GET(request);
  const result: ApiSuccess<PlayerData> = await response.json();

  expect(result.data.ehp).toEqual(13);
});

it('handles errors when the player stats API is not available', async () => {
  jest.spyOn(console, 'error').mockImplementationOnce(jest.fn);

  const { player, request } = setup();

  server.use(
    http.get(
      `${constants.wikiSync.baseUrl}/runelite/player/${player}/STANDARD`,
      () => HttpResponse.json(wikiSync.midGamePlayerFixture),
    ),
    http.get(
      `${constants.collectionLogBaseUrl}/collectionlog/user/${player}`,
      () => HttpResponse.json(collectionLog.midGamePlayerFixture),
    ),
    http.get('https://templeosrs.com/api/player_stats.php', () =>
      HttpResponse.error(),
    ),
  );

  const response = await GET(request);
  const result: ApiSuccess<PlayerData> = await response.json();

  expect(response.status).toBe(200);
  expect(result.success).toBe(true);
  expect(result.data.ehb).toBe(null);
  expect(result.data.ehp).toBe(null);
  expect(result.data.totalLevel).toBe(null);
});

it('handles errors when the WikiSync API is not available', async () => {
  jest.spyOn(console, 'error').mockImplementationOnce(jest.fn);

  const { player, request } = setup();

  server.use(
    http.get(
      `${constants.wikiSync.baseUrl}/runelite/player/${player}/STANDARD`,
      () => HttpResponse.error(),
    ),
    http.get(
      `${constants.collectionLogBaseUrl}/collectionlog/user/${player}`,
      () => HttpResponse.json(collectionLog.midGamePlayerFixture),
    ),
    http.get('https://templeosrs.com/api/player_stats.php', () =>
      HttpResponse.json(templePlayerStats.midGamePlayerFixture),
    ),
  );

  const response = await GET(request);
  const result: ApiSuccess<PlayerData> = await response.json();

  expect(response.status).toBe(200);
  expect(result.success).toBe(true);
  expect(result.data).toMatchObject<Partial<PlayerData>>({
    // Quest items are derived from WikiSync so these should not be present
    acquiredItems: expect.not.arrayContaining([
      'Book of the dead',
      'Barrows gloves',
    ]),
    achievementDiaries: null,
    combatAchievementTier: null,
  });
  // Regular items are derived from the collection log so these should be present
  expect(result.data.acquiredItems).toEqual(
    expect.arrayContaining(['Bandos hilt']),
  );
});

it('handles errors when the Collection Log API is not available', async () => {
  jest.spyOn(console, 'error').mockImplementationOnce(jest.fn);

  const { player, request } = setup();

  server.use(
    http.get(
      `${constants.wikiSync.baseUrl}/runelite/player/${player}/STANDARD`,
      () => HttpResponse.json(wikiSync.midGamePlayerFixture),
    ),
    http.get(
      `${constants.collectionLogBaseUrl}/collectionlog/user/${player}`,
      () => HttpResponse.error(),
    ),
    http.get('https://templeosrs.com/api/player_stats.php', () =>
      HttpResponse.json(templePlayerStats.midGamePlayerFixture),
    ),
  );

  const response = await GET(request);
  const result: ApiSuccess<PlayerData> = await response.json();

  expect(response.status).toBe(200);
  expect(result.success).toBe(true);
  expect(result.data).toMatchObject<Partial<PlayerData>>({
    // Regular items are derived from the collection log so these should not be present
    acquiredItems: expect.not.arrayContaining(['Bandos hilt']),
    collectionLogCount: 0,
    collectionLogTotal: 0,
  });
  // Quest items are derived from WikiSync so these should be present
  expect(result.data.acquiredItems).toEqual(
    expect.arrayContaining(['Book of the dead']),
  );
});

it('returns no combat achievement tier if there is a network error when requesting the wiki data', async () => {
  jest
    .spyOn(console, 'error')
    .mockImplementationOnce(jest.fn)
    .mockImplementationOnce(jest.fn);

  const { player, request } = setup();

  server.use(
    http.get(
      `${constants.wikiSync.baseUrl}/runelite/player/${player}/STANDARD`,
      () => HttpResponse.json(wikiSync.midGamePlayerFixture),
    ),
    http.get(`${constants.wiki.baseUrl}/api.php`, () => HttpResponse.error()),
  );

  const response = await GET(request);
  const result: ApiSuccess<PlayerData> = await response.json();

  expect(response.status).toBe(200);
  expect(result.success).toBe(true);
  expect(result.data.combatAchievementTier).toBeNull();
});
