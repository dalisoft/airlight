// @ts-check
const baseConfig = require('eslint-config-airlight-base');
const baseConfigSettings = require('eslint-config-airlight-base/settings.cjs');
const tsFiles = require('eslint-config-airlight-base/overrides/ts-files.cjs');
const globals = require('globals');
const rules = require('./rules.cjs');

// Modify it for performance and code clean reason
if (tsFiles?.[0]?.files) {
  tsFiles[0].files.push('*.tsx');
}

module.exports = [
  baseConfig,
  {
    extends: ['prettier/react'],
    plugins: ['react-hooks', 'react-refresh', 'jest'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.es2015,
        ...globals.es2020,
        ...globals.browser,
        ...globals.jest
      }
    },
    rules,
    settings: {
      node: {
        tryExtensions: [
          ...baseConfigSettings.node.tryExtensions,
          '.jsx',
          '.tsx'
        ]
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
      'import-x/external-module-folders': [
        'node_modules',
        'node_modules/@types'
      ]
    }
  },
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
];
