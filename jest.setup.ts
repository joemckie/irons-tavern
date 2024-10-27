import '@testing-library/jest-dom/jest-globals';
import { afterAll, beforeAll } from '@jest/globals';
import { server } from './mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
