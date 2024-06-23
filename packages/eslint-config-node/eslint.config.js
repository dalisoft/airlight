// @ts-check
import baseConfig from 'eslint-config-airlight-base';
import baseConfigSettings from 'eslint-config-airlight-base/settings.js';
import nodePlugin from 'eslint-plugin-n';
import globals from 'globals';

export default [
  ...baseConfig,
  nodePlugin.configs['flat/recommended'],
  {
    name: 'eslint-config-airlight-node',
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.es2015,
        ...globals.es2020,
        ...globals.node,
        ...globals.jest
      }
    },
    rules: {
      'n/no-unsupported-features/es-syntax': [
        'error',
        { ignores: ['modules'] }
      ],
      'import-x/extensions': [
        'error',
        'always',
        {
          ignorePackages: true
        }
      ]
    },
    settings: {
      ...baseConfigSettings,
      node: {
        tryExtensions: baseConfigSettings.node.tryExtensions.concat([
          '.cjs',
          '.mjs'
        ])
      },
      'import-x/resolver': {
        node: {
          extensions: baseConfigSettings[
            'import-x/resolver'
          ].node.extensions.concat(['.cjs', '.mjs'])
        }
      },
      'import-x/extensions': baseConfigSettings['import-x/extensions'].concat([
        '.cjs',
        '.mjs'
      ])
    }
  },
  {
    files: ['*.cjs'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      'import-x/extensions': [
        'error',
        'never',
        {
          ignorePackages: true,
          pattern: {
            js: 'always',
            mjs: 'always'
          }
        }
      ]
    }
  }
];
