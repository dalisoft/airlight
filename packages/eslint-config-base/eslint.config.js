// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import comments from '@eslint-community/eslint-plugin-eslint-comments/configs';
// @ts-check
import eslintJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';
import airbnbRulesConfig from './airbnb-rules.js';
import cjsFiles from './overrides/cjs-files.js';
import noTsChecks from './overrides/no-ts-checks.js';
import tsFiles from './overrides/ts-files.js';
import importX from './plugins/import-x.js';
import noSecrets from './plugins/no-secrets.js';
import optimizeRegex from './plugins/optimize-regex.js';
import promise from './plugins/promise.js';
import settings from './settings.js';

export default tseslint.config(
  eslintJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...airbnbRulesConfig,
  comments.recommended,
  ...promise,
  eslintConfigPrettier,
  ...importX,
  ...noSecrets,
  ...optimizeRegex,
  {
    name: 'eslint-config-airlight-base',
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parser: tseslint.parser
    },
    rules: {
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
  ...noTsChecks,
  ...cjsFiles
);
