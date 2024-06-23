import baseConfig from 'eslint-config-airlight-base';
import tsFiles from 'eslint-config-airlight-base/overrides/ts-files.js';
import baseConfigSettings from 'eslint-config-airlight-base/settings.js';
import globals from 'globals';

// Modify it for performance and code clean reason
if (tsFiles?.[0]?.files) {
  tsFiles[0].files.push('*.tsx');
}

export default [
  baseConfig,
  {
    extends: ['prettier/react'],
    plugins: ['react-hooks', 'react-refresh', 'jest'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.es2015,
        ...globals.browser,
        ...globals.jest
      }
    },
    rules: {
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
          format: ['StrictPascalCase'],
          leadingUnderscore: 'forbid'
        },
        {
          selector: 'variable',
          format: ['strictCamelCase'],
          leadingUnderscore: 'forbid'
        },
        {
          selector: 'variable',
          types: ['boolean', 'number'],
          modifiers: ['const'],
          format: ['UPPER_CASE', 'strictCamelCase'],
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
      'react/jsx-pascal-case': ['error'],
      'react/jsx-no-useless-fragment': ['error'],
      'react/no-deprecated': ['error'],
      'react/jsx-filename-extension': [
        'error',
        { extensions: ['.jsx', '.tsx'] }
      ],
      'react-refresh/only-export-components': 'warn'
    },
    settings: {
      node: {
        tryExtensions: [
          ...baseConfigSettings.node.tryExtensions,
          '.jsx',
          '.tsx'
        ]
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
      'import-x/external-module-folders': [
        'node_modules',
        'node_modules/@types'
      ]
    }
  },
  {
    files: ['*.jsx', '*.tsx'],
    rules: {
      'import-x/extensions': [
        'error',
        'always',
        {
          ignorePackages: true,
          ts: 'never',
          tsx: 'never',
          jsx: 'never'
        }
      ]
    }
  },
  {
    files: ['*.tsx'],
    rules: {
      'react/prop-types': 'off'
    }
  }
];
