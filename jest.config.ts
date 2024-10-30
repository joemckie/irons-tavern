import nextJest from 'next/jest';
import type { Config } from 'jest';

const createJestConfig = nextJest({
  dir: './',
});

const config = {
  coveragePathIgnorePatterns: [
    '<rootDir>/mocks',
    '<rootDir>/fixtures',
    '<rootDir>/test-utils',
  ],
  testEnvironment: 'jest-fixed-jsdom',
  setupFiles: ['<rootDir>/jest.polyfills.ts'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironmentOptions: {
    customExportConditions: ['node'],
  },
} satisfies Config;

export default createJestConfig(config);
