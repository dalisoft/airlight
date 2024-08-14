// @ts-check
const airbnbRules = require('./airbnb-rules.cjs');
const rules = require('./rules.cjs');
const tsFilesRules = require('./overrides/ts-files.cjs');
const cjsFilesRules = require('./overrides/cjs-files.cjs');
const settings = require('./settings.cjs');

// @ts-expect-error What it needs idk
/** @type {import('eslint-define-config').ESLintConfig} */
module.exports = {
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
    '@stylistic',
    'plugin:@eslint-community/eslint-comments/recommended',
    'plugin:promise/recommended',
    'prettier',
    'plugin:import-x/recommended',
    'plugin:import-x/typescript'
  ],
  plugins: ['@typescript-eslint', 'promise', 'optimize-regex', 'no-secrets'],
  rules: {
    ...airbnbRules,
    ...rules
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
