// @ts-check
// @ts-except-error no typings
import baseConfig from 'eslint-config-airlight-base/legacy' with { type: 'json' };
import baseConfigSettings from 'eslint-config-airlight-base/settings.json' with { type: 'json' };

// @ts-expect-error What it needs idk
/** @type {import('eslint-define-config').ESLintConfig} */
export default {
  ...baseConfig,
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  extends: baseConfig.extends.concat(['plugin:n/recommended']),
  env: {
    ...baseConfig.env,
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
      files: ['*.cjs'],
      rules: {
        // @ts-expect-error: Missing types or JSON types not working properly
        '@typescript-eslint/no-var-requires': 'off'
      }
    },
    {
      files: ['*.ts'],
      rules: {
        // @ts-expect-error: Missing types or JSON types not working properly
        'n/no-missing-import': 'off'
      }
    }
  ]),
  settings: baseConfigSettings
};
