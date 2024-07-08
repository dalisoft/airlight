// @ts-expect-error It says will work only with ESM
const { FlatCompat } = require('@eslint/eslintrc');
const { fixupConfigRules } = require('@eslint/compat');

// @ts-check
const tseslint = require('typescript-eslint');

const compat = new FlatCompat();

module.exports = tseslint.config(
  ...fixupConfigRules(
    compat.config({
      extends: ['plugin:promise/recommended'],
      ignorePatterns: ['tests/e2e']
    })
  )
);
