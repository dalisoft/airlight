// @ts-check
import airbnbRules from './airbnb-rules.json' with { type: 'json' };
import cjsFilesRules from './overrides/cjs-files.js';
import tsFilesRules from './overrides/ts-files.js';
import rules from './rules.json' with { type: 'json' };
import settings from './settings.json' with { type: 'json' };

// @ts-expect-error What it needs idk
/** @type {import('eslint-define-config').ESLintConfig} */
export default {
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  env: {
    es2015: true,
    es2020: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@eslint-community/eslint-plugin-eslint-comments/recommended',
    'plugin:promise/recommended',
    'prettier',
    'plugin:import-x/recommended',
    'plugin:import-x/typescript'
  ],
  plugins: [
    '@typescript-eslint',
    'promise',
    'optimize-regex',
    'no-secrets',
    'import-x'
  ],
  rules: {
    ...airbnbRules,
    ...rules,
    'no-secrets/no-secrets': 'error',
    'import-x/no-unresolved': 'error'
  },
  overrides: [
    {
      // enable the rule specifically for TypeScript files
      files: ['*.ts'],
      extends: ['plugin:@typescript-eslint/strict-type-checked'],
      rules: tsFilesRules[0].rules
    },
    {
      files: ['*.js', '*.jsx', '*.mjs', '*.cjs'],
      extends: ['plugin:@typescript-eslint/disable-type-checked']
    },
    {
      files: ['*.cjs'],
      rules: cjsFilesRules[0].rules
    }
  ],
  settings
};
