// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const comments = require('@eslint-community/eslint-plugin-eslint-comments/configs');
// @ts-check
const eslintJs = require('@eslint/js');
const eslintConfigPrettier = require('eslint-config-prettier');
const globals = require('globals');
const tseslint = require('typescript-eslint');
const airbnbRules = require('./airbnb-rules.cjs');
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
    rules: {
      ...airbnbRules,
      '@eslint-community/eslint-comments/no-unused-disable': 'error',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: ['function', 'method'],
          format: ['strictCamelCase'],
          leadingUnderscore: 'forbid'
        },
        {
          selector: 'property',
          format: ['snake_case', 'strictCamelCase'],
          leadingUnderscore: 'forbid'
        },
        {
          selector: 'objectLiteralProperty',
          format: [],
          leadingUnderscore: 'forbid'
        },
        {
          selector: 'variable',
          modifiers: ['const'],
          types: ['boolean', 'number'],
          format: ['UPPER_CASE'],
          leadingUnderscore: 'forbid'
        },
        {
          selector: 'typeLike',
          format: ['StrictPascalCase'],
          leadingUnderscore: 'forbid'
        },
        {
          selector: 'interface',
          format: ['PascalCase'],
          leadingUnderscore: 'forbid',
          custom: {
            regex: '^I[A-Z]',
            match: true
          }
        }
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-shadow': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/indent': ['off'],
      '@typescript-eslint/class-literal-property-style': ['error'],
      '@typescript-eslint/comma-dangle': ['error', 'never'],
      '@typescript-eslint/comma-spacing': [
        'error',
        { before: false, after: true }
      ],
      '@typescript-eslint/no-unused-vars': ['error'],
      '@typescript-eslint/no-non-null-asserted-optional-chain': ['error'],
      '@typescript-eslint/restrict-plus-operands': ['error'],
      'operator-linebreak': ['off', 'after'],
      'prefer-template': 'error',
      quotes: [
        'error',
        'single',
        {
          avoidEscape: true
        }
      ],
      indent: [
        'error',
        2,
        {
          SwitchCase: 1,
          flatTernaryExpressions: false,
          offsetTernaryExpressions: true
        }
      ],
      complexity: ['error', { max: 5 }],
      'max-depth': ['error', { max: 3 }],
      'max-nested-callbacks': ['error', { max: 3 }],
      'max-lines-per-function': [
        'error',

        { max: 40, skipBlankLines: true, skipComments: true, IIFEs: true }
      ],
      'max-lines': [
        'error',
        { max: 160, skipBlankLines: true, skipComments: true }
      ],
      'no-useless-concat': 'error',
      'no-console': process.env.CI ? 'error' : 'warn',
      'no-template-curly-in-string': 'error',
      'no-underscore-dangle': 'off',
      'no-shadow': ['error', { hoist: 'functions' }],
      'no-empty-function': ['error'],
      camelcase: 'off',
      'import-x/prefer-default-export': 'warn'
    },
    settings
  },
  ...tsFiles,
  ...cjsFiles
);
