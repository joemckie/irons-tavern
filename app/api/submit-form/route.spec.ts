/**
 * @jest-environment node
 */

import { constants } from '@/config/constants';
import { server } from '@/mocks/server';
import * as formData from '@/mocks/misc/form-data';
import { ApiSuccess } from '@/types/api';
import { RedisKeyNamespace } from '@/config/redis';
import { NextRequest } from 'next/server';
import { http, HttpResponse, PathParams } from 'msw';
import { Routes } from 'discord-api-types/v10';
import * as discordFixtures from '@/mocks/discord';
import { getRankName } from '@/app/rank-calculator/utils/get-rank-name';
import { Rank } from '@/config/enums';
import { POST, SubmitFormData } from './route';

it('saves the submission to the database', async () => {
  const player = 'cousinofkos';

  server.use(
    http.post<PathParams, [string, string][], [{ result: 'OK' }]>(
      `${constants.redisUrl}/pipeline`,
      async ({ request }) => {
        const [[type, key]] = await request.json();

        if (
          type === 'JSON.SET' &&
          key === `${RedisKeyNamespace.Submission}:${player}`
        ) {
          return HttpResponse.json([{ result: 'OK' }]);
        }

        throw new Error(`No mock provided for ${request.url}`);
      },
    ),
    http.post(
      `${constants.discordUrl}${Routes.channelMessages('discord-channel-id')}`,
      () => HttpResponse.json(discordFixtures.sendMessageFixture),
    ),
  );

  const body = {
    formData: formData.midGamePlayer,
    points: 100000,
    rank: getRankName(Rank.Owner),
  } satisfies SubmitFormData;
  const request = new NextRequest(`${constants.publicUrl}/api/submit-form`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
  const response = await POST(request);
  const result: ApiSuccess<void> = await response.json();

  expect(response.status).toBe(200);
  expect(result).toMatchObject({
    error: null,
    data: null,
    success: true,
  });
});

it('returns an error if the save was not successful', async () => {
  const player = 'cousinofkos';

  server.use(
    http.post<PathParams, [string, string][], [{ result: null }]>(
      `${constants.redisUrl}/pipeline`,
      async ({ request }) => {
        const [[type, key]] = await request.json();

        if (
          type === 'JSON.SET' &&
          key === `${RedisKeyNamespace.Submission}:${player}`
        ) {
          return HttpResponse.json([{ result: null }]);
        }

        throw new Error(`No mock provided for ${request.url}`);
      },
    ),
  );

  const body = {
    formData: formData.midGamePlayer,
    points: 100000,
    rank: getRankName(Rank.Owner),
  } satisfies SubmitFormData;
  const request = new NextRequest(`${constants.publicUrl}/api/submit-form`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
  const response = await POST(request);
  const result: ApiSuccess<void> = await response.json();

  expect(response.status).toBe(500);
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

  const body = {
    formData: formData.midGamePlayer,
    points: 100000,
    rank: getRankName(Rank.Owner),
  } satisfies SubmitFormData;
  const request = new NextRequest(`${constants.publicUrl}/api/submit-form`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
  const response = await POST(request);
  const result: ApiSuccess<void> = await response.json();

  expect(response.status).toBe(500);
  expect(result).toMatchObject({
    error: 'Something went wrong',
    success: false,
  });
}, 15000);

it('returns an error if a network error occurs whilst sending the discord message', async () => {
  jest.spyOn(console, 'error').mockImplementationOnce(jest.fn);

  const player = 'cousinofkos';

  server.use(
    http.post<PathParams, [string, string][], [{ result: 'OK' }]>(
      `${constants.redisUrl}/pipeline`,
      async ({ request }) => {
        const [[type, key]] = await request.json();

        if (
          type === 'JSON.SET' &&
          key === `${RedisKeyNamespace.Submission}:${player}`
        ) {
          return HttpResponse.json([{ result: 'OK' }]);
        }

        throw new Error(`No mock provided for ${request.url}`);
      },
    ),
    http.post(
      `${constants.discordUrl}${Routes.channelMessages('discord-channel-id')}`,
      () => HttpResponse.error(),
    ),
  );

  const body = {
    formData: formData.midGamePlayer,
    points: 100000,
    rank: getRankName(Rank.Owner),
  } satisfies SubmitFormData;
  const request = new NextRequest(`${constants.publicUrl}/api/submit-form`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
  const response = await POST(request);
  const result: ApiSuccess<void> = await response.json();

  expect(response.status).toBe(500);
  expect(result).toMatchObject({
    error: 'Something went wrong',
    success: false,
  });
}, 15000);
