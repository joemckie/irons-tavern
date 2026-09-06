import nextJest from 'next/jest.js';
import { Config } from '@jest/types';
import { merge } from 'lodash';

const createJestConfig = nextJest({ dir: './' });

const config = {
  coveragePathIgnorePatterns: [
    '<rootDir>/mocks',
    '<rootDir>/fixtures',
    '<rootDir>/test-utils',
  ],
  testEnvironment: 'jest-fixed-jsdom',
  setupFiles: ['<rootDir>/jest.polyfills.ts'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironmentOptions: { customExportConditions: ['node'] },
} satisfies Config.InitialOptions;

const buildConfig = async () => {
  const baseConfig = await createJestConfig(config)();

  return merge({}, baseConfig, {
    transformIgnorePatterns: [
      ' /node_modules/(?!(next-auth|@auth/core/(.*)|oauth4webapi))',
    ],
  });
};

export default buildConfig;
