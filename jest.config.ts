import { JestConfigWithTsJest, pathsToModuleNameMapper } from 'ts-jest';
import nextJest from 'next/jest';
import { compilerOptions } from './tsconfig.json';

const createJestConfig = nextJest({
  dir: './',
});

const config = {
  testEnvironment: 'jest-fixed-jsdom',
  preset: 'ts-jest',
  roots: ['<rootDir>'],
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: '<rootDir>',
    }),
    '\\.(css|less|sass|scss)$': '<rootDir>/__mocks__/style-mock.js',
  },
  setupFiles: ['<rootDir>/jest.setup-env.ts'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironmentOptions: {
    customExportConditions: ['msw'],
  },
} satisfies JestConfigWithTsJest;

export default createJestConfig(config);
