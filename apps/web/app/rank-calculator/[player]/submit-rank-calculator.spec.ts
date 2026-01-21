/**
 * @jest-environment node
 */

import { clientConstants } from '@/config/constants.client';
import { serverConstants } from '@/config/constants.server';
import { server } from '@/mocks/server';
import { http, HttpResponse } from 'msw';
import { Routes } from 'discord-api-types/v10';
import { mockUUID } from '@/test-utils/mock-uuid';
import * as auth from '@/auth';
import * as discordFixtures from '@/mocks/discord';
import { publishRankSubmissionAction } from './actions/publish-rank-submission-action';

beforeEach(() => {
  jest.spyOn(auth, 'auth').mockReturnValue({ user: { id: mockUUID } } as never);

  server.use(
    http.post(
      `${clientConstants.discord.baseUrl}${Routes.channelMessages('discord-channel-id')}`,
      () => HttpResponse.json(discordFixtures.sendMessageFixture),
    ),
  );

  return { player: 'cousinofkos' };
});

it('saves the submission to the database', async () => {
  const result = await publishRankSubmissionAction('Air', 'Zezima', {
    rank: 'Owner',
    totalPoints: 100000,
  });

  expect(result?.validationErrors).toBeUndefined();
  expect(result?.serverError).toBeUndefined();
  expect(result?.data).toMatchObject({ success: true });
});

it('returns an error if the save was not successful', async () => {
  server.use(
    http.post(
      `${clientConstants.discord.baseUrl}${Routes.channelMessages('discord-channel-id')}`,
      () => HttpResponse.error(),
    ),
  );

  const result = await publishRankSubmissionAction('Air', 'Zezima', {
    totalPoints: 100000,
    rank: 'Owner',
  });

  expect(result?.validationErrors).toBeUndefined();
  expect(result?.serverError).toBeDefined();
  expect(result?.data).toBeUndefined();
});

xit('returns an error if a network error occurs whilst saving the submission', async () => {
  jest.spyOn(console, 'error').mockImplementationOnce(jest.fn);

  server.use(
    http.post(`${serverConstants.redisUrl}/pipeline`, () =>
      HttpResponse.error(),
    ),
  );

  const result = await publishRankSubmissionAction('Air', 'Zezima', {
    totalPoints: 100000,
    rank: 'Owner',
  });

  expect(result?.data).toMatchObject({
    error: 'Something went wrong',
    success: false,
  });
}, 15000);

it('returns an error if a network error occurs whilst sending the discord message', async () => {
  jest.spyOn(console, 'error').mockImplementationOnce(jest.fn);

  server.use(
    http.post(
      `${clientConstants.discord.baseUrl}${Routes.channelMessages('discord-channel-id')}`,
      () => HttpResponse.error(),
    ),
  );

  const result = await publishRankSubmissionAction('Air', 'Zezima', {
    totalPoints: 100000,
    rank: 'Owner',
  });

  expect(result?.validationErrors).toBeUndefined();
  expect(result?.serverError).toBeDefined();
  expect(result?.data).toBeUndefined();
}, 15000);
