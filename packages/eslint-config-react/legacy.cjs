// @ts-check
const baseConfig = require('eslint-config-airlight-base/legacy');
const baseConfigSettings = require('eslint-config-airlight-base/settings.cjs');
const rules = require('./rules.cjs');

// @ts-expect-error What it needs idk
/** @type {import('eslint-define-config').ESLintConfig} */
module.exports = {
  ...baseConfig,
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  // @ts-expect-error It should work but does not
  extends: baseConfig.extends.concat(['prettier/react']),
  // @ts-expect-error It should work but does not
  plugins: baseConfig.plugins.concat(['react-hooks', 'react-refresh', 'jest']),
  env: {
    es2015: true,
    es2020: true,
    browser: true,
    jest: true
  },
  rules,
  // @ts-expect-error It should work but does not
  overrides: baseConfig.overrides.concat([
    {
      files: ['*.jsx', '*.tsx'],
      rules: {
        'import-x/extensions': [
          'error',
          'never',
          {
            ignorePackages: true,
            json: 'always',
            svg: 'always',
            css: 'always'
          }
        ]
      }
    },
    {
      files: ['*.tsx'],
      rules: {
        'react/prop-types': 'off'
      }
    }
  ]),
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
};
