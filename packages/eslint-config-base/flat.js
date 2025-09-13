// @ts-check
import eslintJs from '@eslint/js';
// @ts-expect-error: TODO: No typings yet
import comments from '@eslint-community/eslint-plugin-eslint-comments/configs';
import stylistic from '@stylistic/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier';
import { importX } from 'eslint-plugin-import-x';
import optimizeRegEx from 'eslint-plugin-optimize-regex';
// @ts-expect-error: TODO: No typings yet
import promise from 'eslint-plugin-promise';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import airbnbRules from './airbnb-rules.json' with { type: 'json' };
import cjsFiles from './overrides/cjs-files.js';
import stylisticRules from './overrides/stylistic.js';
import tsFiles from './overrides/ts-files.js';
import noSecrets from './plugins/no-secrets.mjs';
import rules from './rules.json' with { type: 'json' };
import settings from './settings.json' with { type: 'json' };

/** @type {import('eslint').Linter.Config<import('eslint').Linter.RulesRecord>[]} */
export default [
  eslintJs.configs.recommended,
  ...tseslint.configs.recommended,
  comments.recommended,
  promise.configs['flat/recommended'],
  stylistic.configs.recommended,
  eslintConfigPrettier,
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  ...noSecrets,
  // @ts-expect-error: TODO: No typings match
  optimizeRegEx.configs.recommended,
  {
    name: 'eslint-config-airlight-base',
    plugins: {
      '@typescript-eslint': tseslint.plugin
    },
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parser: tseslint.parser,
      globals: {
        ...globals.es2015,
        ...globals.es2020
      }
    },
    rules: {
      ...airbnbRules,
      ...rules,
      ...stylisticRules,
      '@stylistic/comma-dangle': ['error', 'never'],
      '@stylistic/comma-spacing': ['error', { before: false, after: true }],
      'import-x/no-unresolved': 'error'
    },
    settings: {
      ...settings,
      'import-x/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx']
      },
      'import-x/resolver': {
        typescript: true,
        node: true
      }
    }
  },
  ...tsFiles,
  ...cjsFiles
];
