// @ts-check
const { defineConfig } = require('eslint-define-config');

// @ts-expect-error It is javascript config
const baseConfig = require('eslint-config-airlight-base/legacy');
const baseConfigSettings = require('eslint-config-airlight-base/settings.cjs');

module.exports = defineConfig({
  ...baseConfig,
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  extends: baseConfig.extends.concat(['prettier/react']),
  plugins: baseConfig.plugins.concat(['react-hooks', 'react-refresh', 'jest']),
  env: {
    es2015: true,
    es2020: true,
    browser: true,
    jest: true
  },
  rules: {
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: ['function', 'method'],
        format: ['strictCamelCase'],
        leadingUnderscore: 'forbid'
      },
      {
        selector: 'property',
        format: ['snake_case', 'strictCamelCase'],
        leadingUnderscore: 'forbid'
      },
      {
        selector: 'objectLiteralProperty',
        format: ['StrictPascalCase'],
        leadingUnderscore: 'forbid'
      },
      {
        selector: 'variable',
        format: ['strictCamelCase'],
        leadingUnderscore: 'forbid'
      },
      {
        selector: 'variable',
        types: ['boolean', 'number'],
        modifiers: ['const'],
        format: ['UPPER_CASE', 'strictCamelCase'],
        leadingUnderscore: 'forbid'
      },
      {
        selector: 'typeLike',
        format: ['StrictPascalCase'],
        leadingUnderscore: 'forbid'
      },
      {
        selector: 'interface',
        format: ['PascalCase'],
        leadingUnderscore: 'forbid',
        custom: {
          regex: '^I[A-Z]',
          match: true
        }
      }
    ],
    'react/jsx-pascal-case': ['error'],
    'react/jsx-no-useless-fragment': ['error'],
    'react/no-deprecated': ['error'],
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
    'react-refresh/only-export-components': 'warn'
  },
  settings: {
    node: {
      tryExtensions: [...baseConfigSettings.node.tryExtensions, '.jsx', '.tsx']
    },
    'import-x/resolver': {
      node: {
        extensions: [
          ...baseConfigSettings['import-x/resolver'].node.extensions,
          '.jsx',
          '.tsx'
        ]
      },
      typescript: {
        alwaysTryTypes: true,
        // use an array of glob patterns
        project: 'packages/*/tsconfig.json'
      }
    },
    'import-x/extensions': [
      ...baseConfigSettings['import-x/extensions'],
      '.jsx',
      '.tsx',
      '.css',
      '.scss',
      '.svg'
    ],
    'import-x/external-module-folders': ['node_modules', 'node_modules/@types']
  }
});
