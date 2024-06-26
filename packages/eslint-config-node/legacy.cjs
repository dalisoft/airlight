// @ts-check
const { defineConfig } = require('eslint-define-config');

// @ts-expect-error It is javascript config
const baseConfig = require('eslint-config-airlight-base/legacy');
const baseConfigSettings = require('eslint-config-airlight-base/settings.cjs');

module.exports = defineConfig({
  ...baseConfig,
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
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
});
