import { constants } from '@/config/constants';
import { server } from '@/mocks/server';
import * as formData from '@/mocks/misc/form-data';
import { ApiSuccess } from '@/types/api';
import { RedisKeyNamespace } from '@/config/redis';
import { NextRequest } from 'next/server';
import { http, HttpResponse, PathParams } from 'msw';
import { POST } from './route';

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
  );

  const request = new NextRequest(`${constants.publicUrl}/api/submit-form`, {
    method: 'POST',
    body: JSON.stringify(formData.midGamePlayer),
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

  const request = new NextRequest(`${constants.publicUrl}/api/submit-form`, {
    method: 'POST',
    body: JSON.stringify(formData.midGamePlayer),
  });
  const response = await POST(request);
  const result: ApiSuccess<void> = await response.json();

  expect(response.status).toBe(500);
  expect(result).toMatchObject({
    error: 'Failed to save submission',
    success: false,
  });
});

it('returns an error if a network error occurs', async () => {
  jest.spyOn(console, 'error').mockImplementationOnce(jest.fn);

  server.use(
    http.post(`${constants.redisUrl}/pipeline`, async () =>
      HttpResponse.error(),
    ),
  );

  const request = new NextRequest(`${constants.publicUrl}/api/submit-form`, {
    method: 'POST',
    body: JSON.stringify(formData.midGamePlayer),
  });
  const response = await POST(request);
  const result: ApiSuccess<void> = await response.json();

  expect(response.status).toBe(500);
  expect(result).toMatchObject({
    error: 'Something went wrong',
    success: false,
  });
}, 15000);
