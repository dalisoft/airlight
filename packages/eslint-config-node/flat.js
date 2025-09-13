// @ts-check
import baseConfig from 'eslint-config-airlight-base';
import baseConfigSettings from 'eslint-config-airlight-base/settings.json' with { type: 'json' };
import nodePlugin from 'eslint-plugin-n';
import globals from 'globals';

/** @type {import('eslint').Linter.Config<import('eslint').Linter.RulesRecord>[]} */
export default [
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
      'n/no-unsupported-features/es-syntax': ['error', { ignores: ['modules'] }]
    },
    settings: baseConfigSettings
  },
  {
    files: ['**/*.ts'],
    rules: {
      'n/no-missing-import': 'off'
    }
  },
  {
    files: ['**/*.cjs'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off'
    }
  }
];
