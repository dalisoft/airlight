// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const comments = require('@eslint-community/eslint-plugin-eslint-comments/configs');
// @ts-check
const eslintJs = require('@eslint/js');
const eslintConfigPrettier = require('eslint-config-prettier');
const globals = require('globals');
const tseslint = require('typescript-eslint');
const airbnbRules = require('./airbnb-rules.cjs');
const rules = require('./rules.cjs');
const cjsFiles = require('./overrides/cjs-files.cjs');
const tsFiles = require('./overrides/ts-files.cjs');
const importX = require('./plugins/import-x.cjs');
const noSecrets = require('./plugins/no-secrets.cjs');
const optimizeRegEx = require('./plugins/optimize-regex.cjs');
const promise = require('./plugins/promise.cjs');
const settings = require('./settings.cjs');

module.exports = tseslint.config(
  eslintJs.configs.recommended,
  ...tseslint.configs.recommended,
  comments.recommended,
  ...promise,
  eslintConfigPrettier,
  ...importX,
  ...noSecrets,
  ...optimizeRegEx,
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
    // @ts-expect-error It should be shared for consistenty
    rules: {
      ...airbnbRules,
      ...rules
    },
    settings
  },
  ...tsFiles,
  ...cjsFiles
);
