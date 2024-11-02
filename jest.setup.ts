import '@testing-library/jest-dom';
import { server } from './mocks/server';

jest.mock('crypto', () => ({
  randomUUID: jest.fn().mockReturnValue('1-2-3-4-5'),
}));

if (/\*|msw/.test(process.env.DEBUG ?? '')) {
  server.events.on('request:start', ({ request }) => {
    console.log('Outgoing:', request.method, request.url);
  });

  server.events.on('response:mocked', ({ request, response }) => {
    console.log(
      '%s %s received %s %s',
      request.method,
      request.url,
      response.status,
      response.statusText,
    );
  });
}

server.events.on('unhandledException', ({ request, error }) => {
  console.log('%s %s errored! See details below.', request.method, request.url);
  console.error(error);
});

beforeAll(() =>
  server.listen({
    onUnhandledRequest: 'error',
  }),
);

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
