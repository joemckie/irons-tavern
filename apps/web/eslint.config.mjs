// @ts-check

import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import { flatConfig as eslintPluginNext } from '@next/eslint-plugin-next';

export default tseslint.config(
  js.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    ignores: [
      'node_modules',
      'dist',
      'build',
      'coverage',
      'public',
      'out',
      '.next',
      '.turbo',
      'next-env.d.ts',
    ],
  },
);
