import '@testing-library/jest-dom/jest-globals';
import { afterAll, beforeAll, afterEach } from '@jest/globals';
import { server } from './mocks/server';

beforeAll(() =>
  server.listen({
    onUnhandledRequest: 'error',
  }),
);
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
