// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
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
