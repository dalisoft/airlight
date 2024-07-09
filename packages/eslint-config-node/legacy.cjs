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
  extends: baseConfig.extends.concat(['plugin:n/recommended']),
  env: {
    es2015: true,
    es2020: true,
    node: true,
    browser: false,
    jest: true
  },
  rules,
  // @ts-expect-error It should work but does not
  overrides: baseConfig.overrides.concat([
    {
      files: ['*.ts'],
      rules: {
        '@typescript-eslint/no-var-requires': 'error',
        'n/no-missing-import': 'off'
      }
    }
  ]),
  settings: baseConfigSettings
};
