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
    http.post<PathParams, [string, string][], { result: 'OK' }[]>(
      `${constants.redisUrl}/pipeline`,
      async ({ request }) => {
        const [[type, key]] = await request.json();

        if (
          type === 'JSON.SET' &&
          key === `${RedisKeyNamespace.Submission}:${player}`
        ) {
          return HttpResponse.json<{ result: 'OK' }[]>([{ result: 'OK' }]);
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
