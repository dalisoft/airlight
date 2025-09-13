// @ts-check
import baseConfig from 'eslint-config-airlight-base/legacy' with { type: 'json' };
import baseConfigSettings from 'eslint-config-airlight-base/settings.json' with { type: 'json' };
import rules from './rules.json' with { type: 'json' };

// @ts-expect-error What it needs idk
/** @type {import('eslint-define-config').ESLintConfig} */
export default {
  ...baseConfig,
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  extends: baseConfig.extends.concat(['prettier/react']),
  plugins: baseConfig.plugins.concat(['react-hooks', 'react-refresh', 'jest']),
  env: {
    ...baseConfig.env,
    es2015: true,
    es2020: true,
    browser: true,
    jest: true
  },
  rules: {
    ...baseConfig.rules,
    ...rules
  },
  overrides: baseConfig.overrides.concat([
    {
      files: ['*.jsx', '*.tsx'],
      rules: {
        // @ts-expect-error: Typings mismatch or JSON type mismatch
        'import-x/extensions': [
          'error',
          'never',
          {
            ignorePackages: true,
            json: 'always',
            svg: 'always',
            css: 'always'
          }
        ]
      }
    },
    {
      files: ['*.tsx'],
      rules: {
        // @ts-expect-error: Typings mismatch or JSON type mismatch
        'react/prop-types': 'off'
      }
    }
  ]),
  settings: {
    ...baseConfigSettings,
    node: {
      tryExtensions: [...baseConfigSettings.node.tryExtensions, '.jsx', '.tsx']
    },
    'import-x/resolver': {
      node: {
        extensions: [
          ...baseConfigSettings['import-x/resolver'].node.extensions,
          '.jsx',
          '.tsx'
        ]
      },
      typescript: {
        alwaysTryTypes: true,
        // use an array of glob patterns
        project: 'packages/*/tsconfig.json'
      }
    },
    'import-x/extensions': [
      ...baseConfigSettings['import-x/extensions'],
      '.jsx',
      '.tsx',
      '.css',
      '.scss',
      '.svg'
    ],
    'import-x/external-module-folders': ['node_modules', 'node_modules/@types']
  }
};
