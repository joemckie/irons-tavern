import { JestConfigWithTsJest, pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

export default {
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
  roots: ['<rootDir>'],
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: '<rootDir>',
    }),
    '\\.(css|less|sass|scss)$': '<rootDir>/__mocks__/style-mock.js',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
} satisfies JestConfigWithTsJest;
