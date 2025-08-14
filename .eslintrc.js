module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'next/core-web-vitals',
    'plugin:react/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'airbnb-typescript',
    'prettier',
    'plugin:storybook/recommended',
  ],
  plugins: ['@typescript-eslint', 'import', 'simple-import-sort', 'no-relative-import-paths', 'prettier'],
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 17,
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
  },
  settings: {
    react: {
      version: '19.1.0',
    },
  },
  rules: {
    indent: 'off',
    'prettier/prettier': ['error', { tabWidth: 2, useTabs: false }],
    'no-console': ['error', { allow: ['warn', 'error'] }],

    semi: ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    quotes: ['error', 'single', { avoidEscape: true }],
    'object-curly-spacing': ['error', 'always'],

    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['app-types'],
            message: "Please use import from 'types' module instead.",
          },
        ],
      },
    ],

    'no-relative-import-paths/no-relative-import-paths': [
      'warn',
      {
        allowSameFolder: true,
        allowedDepth: 1,
        rootDir: './src',
        prefix: '',
      },
    ],

    'no-param-reassign': 'off',
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': 'off',

    'no-promise-executor-return': 'error',
    'max-nested-callbacks': 'error',
    'no-return-await': 'error',

    '@typescript-eslint/no-explicit-any': 'error',

    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/exhaustive-deps': 'off',

    'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],

    'react-hooks/rules-of-hooks': 'error',

    'react/function-component-definition': ['error', { namedComponents: 'arrow-function' }],
  },
  overrides: [
    // Allow require() syntax in .config.js files
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    // Config for simple-import-sort plugin
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      rules: {
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              // Third-party libraries and frameworks
              ['^react$', '^next', '^@mantine/core$', '^@mantine/', '^@?\\w'],
              // Particular business entities
              ['^resources'],
              // Shared components under the web application
              ['^components'],
              // Static files
              ['^public'],
              // Internal app modules
              ['^contexts', '^services', '^theme', '^utils'],
              // Other app modules
              [
                '^routes', // App pages structure
                '^query-client', // React Query Client
                '^config',
              ],
              // Relative imports
              ['^\\.\\.(?!/?$)', '^\\.\\./?$', '^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
              // Style imports.
              ['^.+\\.?(css|scss|sass)$'],
              // Side effect imports.
              ['^\\u0000'],
            ],
          },
        ],
      },
    },

    {
      files: ['**/types.ts'],
      rules: {
        'no-restricted-imports': 'off',
      },
    },
  ],
};
