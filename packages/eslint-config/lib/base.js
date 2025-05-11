export const createBaseESLintConfig = (dir) => ({
  extends: [
    'airbnb',
    'airbnb/hooks',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'next/core-web-vitals',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@stylistic', '@typescript-eslint'],
  settings: {
    'import/resolver': {
      typescript: {
        project: [dir],
      },
    },
  },
  rules: {
    '@stylistic/type-annotation-spacing': [
      'warn',
      {
        after: true,
      },
    ],
    camelcase: [
      'error',
      {
        allow: ['^unstable_'],
        properties: 'never',
      },
    ],
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'import/prefer-default-export': 'off',
    'import/extensions': ['error', 'never', { json: 'always' }],
    'implicit-arrow-linebreak': 'off',
    'operator-linebreak': 'off',
    'react/display-name': 'warn',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          'cypress.config.ts',
          'jest.config.ts',
          'jest.setup*.ts',
          'jest.polyfills.ts',
          'test-utils/**',
          'cypress/**',
          '**/*.spec.ts',
          '**/*.spec.tsx',
          'mocks/**',
        ],
      },
    ],
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        controlComponents: ['Input', 'DatePicker', 'Checkbox'],
        labelComponents: ['Label'],
        depth: 3,
      },
    ],
  },
});
