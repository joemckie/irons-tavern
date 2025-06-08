// @ts-check

import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  js.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: {
            // Prevent async server actions from throwing errors
            attributes: false,
          },
        },
      ],
    },
  },
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        project: `${import.meta.dirname}/tsconfig.spec.json`,
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
