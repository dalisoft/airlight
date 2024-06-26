// @ts-check
const baseConfig = require('eslint-config-airlight-base/legacy');
const baseConfigSettings = require('eslint-config-airlight-base/settings.cjs');

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
  rules: {
    ...baseConfig.rules,
    'n/no-unsupported-features/es-syntax': ['error', { ignores: ['modules'] }]
  },
  // @ts-expect-error It should work but does not
  overrides: baseConfig.overrides.concat([
    {
      files: ['*.js'],
      rules: {
        'import/extensions': [
          'error',
          'never',
          {
            js: 'always',
            json: 'always',
            wasm: 'always'
          }
        ]
      }
    },
    {
      files: ['*.cjs'],
      rules: {
        '@typescript-eslint/no-var-requires': 'error'
      }
    }
  ]),
  settings: baseConfigSettings
};
