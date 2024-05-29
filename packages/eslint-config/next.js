const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    'eslint-config-turbo',
    'eslint:recommended',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:storybook/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ],
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    node: true,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
      node: {
        extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  ignorePatterns: [
    // Ignore dotfiles
    '.*.js',
    'node_modules/',
    'dist/',
  ],
  overrides: [
    { files: ['*.js?(x)', '*.ts?(x)'] },
    {
      files: ['*.ts', '*.tsx'],
      plugins: ['only-warn', '@typescript-eslint', 'unused-imports'],
      rules: {
        'import/no-default-export': 'off',
        'import/no-unresolved': 'off',
        'no-nested-ternary': 'off',
        'import/no-named-as-default': 'off',
        'no-unused-vars': 'off',
        'unused-imports/no-unused-imports': 'warn',
        'unused-imports/no-unused-vars': [
          'warn',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
          },
        ],
        '@typescript-eslint/no-floating-promises': 'off',
        'eslint-comments/require-description': 'off',
        'react/jsx-sort-props': 'off',
        'react/no-leaked-render': 'off',
        camelcase: 'off',
        '@next/next/no-html-link-for-pages': 'off',
        '@typescript-eslint/no-extraneous-class': 'warn',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        'tailwindcss/no-custom-classname': 'off',
        'sort-imports': [
          'error',
          {
            ignoreCase: true,
            ignoreDeclarationSort: true,
          },
        ],
        'import/order': [
          'warn',
          {
            alphabetize: {
              order: 'asc',
              caseInsensitive: true,
            },
          },
        ],
      },
    },
  ],
};
