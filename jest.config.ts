import { JestConfigWithTsJest } from 'ts-jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const config = {
  testEnvironment: 'jest-fixed-jsdom',
  setupFiles: ['<rootDir>/jest.setup-env.ts'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironmentOptions: {
    customExportConditions: ['node'],
  },
} satisfies JestConfigWithTsJest;

export default createJestConfig(config);
