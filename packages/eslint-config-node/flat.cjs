// @ts-check
const baseConfig = require('eslint-config-airlight-base');
const baseConfigSettings = require('eslint-config-airlight-base/settings.cjs');
const nodePlugin = require('eslint-plugin-n');
const globals = require('globals');

module.exports = [
  ...baseConfig,
  nodePlugin.configs['flat/recommended'],
  {
    name: 'eslint-config-airlight-node',
    plugins: {},
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
    settings: baseConfigSettings
  },
  {
    files: ['**/*.cjs'],
    rules: {
      '@typescript-eslint/no-var-requires': 'error'
    }
  }
];
