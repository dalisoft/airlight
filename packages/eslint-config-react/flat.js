// @ts-check
import baseConfig from 'eslint-config-airlight-base';
import tsFiles from 'eslint-config-airlight-base/overrides/ts-files.js';
import baseConfigSettings from 'eslint-config-airlight-base/settings.json' with { type: 'json' };
import globals from 'globals';
import rules from './rules.json' with { type: 'json' };

// Modify it for performance and code clean reason
if (tsFiles?.[0]?.files) {
  tsFiles[0].files.push('*.tsx');
}

export default [
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
      ...baseConfigSettings,
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
