/**
 * @jest-environment node
 */

import { constants } from '@/config/constants';
import { server } from '@/mocks/server';
import * as formData from '@/mocks/misc/form-data';
import { RedisKeyNamespace } from '@/config/redis';
import { http, HttpResponse, PathParams } from 'msw';
import { Routes } from 'discord-api-types/v10';
import * as discordFixtures from '@/mocks/discord';
import { getRankName } from '@/app/rank-calculator/utils/get-rank-name';
import { Rank } from '@/config/enums';
import { submitRankCalculator } from './submit-rank-calculator';

it('saves the submission to the database', async () => {
  server.use(
    http.post<PathParams, [string, string][], [{ result: 'OK' }]>(
      `${constants.redisUrl}/pipeline`,
      async ({ request }) => {
        const [[type, key]] = await request.json();

        if (
          type === 'JSON.SET' &&
          key === `${RedisKeyNamespace.Submission}:1-2-3-4-5`
        ) {
          return HttpResponse.json([{ result: 'OK' }]);
        }

        throw new Error(
          `No mock provided for ${request.url} and params ${[type, key]}`,
        );
      },
    ),
    http.post(
      `${constants.discord.baseUrl}${Routes.channelMessages('discord-channel-id')}`,
      () => HttpResponse.json(discordFixtures.sendMessageFixture),
    ),
  );

  const result = await submitRankCalculator({
    ...formData.midGamePlayer,
    points: 100000,
    rank: getRankName(Rank.Owner),
  });

  expect(result).toMatchObject({
    error: null,
    data: null,
    success: true,
  });
});

it('returns an error if the save was not successful', async () => {
  server.use(
    http.post<PathParams, [string, string][], [{ result: null }]>(
      `${constants.redisUrl}/pipeline`,
      async ({ request }) => {
        const [[type, key]] = await request.json();

        if (
          type === 'JSON.SET' &&
          key === `${RedisKeyNamespace.Submission}:1-2-3-4-5`
        ) {
          return HttpResponse.json([{ result: null }]);
        }

        throw new Error(
          `No mock provided for ${request.url} and params ${[type, key]}`,
        );
      },
    ),
  );

  const result = await submitRankCalculator({
    ...formData.midGamePlayer,
    points: 100000,
    rank: getRankName(Rank.Owner),
  });

  expect(result).toMatchObject({
    error: 'Failed to save submission',
    success: false,
  });
});

it('returns an error if a network error occurs whilst saving the submission', async () => {
  jest.spyOn(console, 'error').mockImplementationOnce(jest.fn);

  server.use(
    http.post(`${constants.redisUrl}/pipeline`, () => HttpResponse.error()),
  );

  const result = await submitRankCalculator({
    ...formData.midGamePlayer,
    points: 100000,
    rank: getRankName(Rank.Owner),
  });

  expect(result).toMatchObject({
    error: 'Something went wrong',
    success: false,
  });
}, 15000);

it('returns an error if a network error occurs whilst sending the discord message', async () => {
  jest.spyOn(console, 'error').mockImplementationOnce(jest.fn);

  server.use(
    http.post<PathParams, [string, string][], [{ result: 'OK' }]>(
      `${constants.redisUrl}/pipeline`,
      async ({ request }) => {
        const [[type, key]] = await request.json();

        if (
          type === 'JSON.SET' &&
          key === `${RedisKeyNamespace.Submission}:1-2-3-4-5`
        ) {
          return HttpResponse.json([{ result: 'OK' }]);
        }

        throw new Error(
          `No mock provided for ${request.url} and params ${[type, key]}`,
        );
      },
    ),
    http.post(
      `${constants.discord.baseUrl}${Routes.channelMessages('discord-channel-id')}`,
      () => HttpResponse.error(),
    ),
  );

  const result = await submitRankCalculator({
    ...formData.midGamePlayer,
    points: 100000,
    rank: getRankName(Rank.Owner),
  });

  expect(result).toMatchObject({
    error: 'Something went wrong',
    success: false,
  });
}, 15000);