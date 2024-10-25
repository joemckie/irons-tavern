import type { JestConfigWithTsJest } from 'ts-jest';

export default {
  testEnvironment: 'node',
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
} satisfies JestConfigWithTsJest;
