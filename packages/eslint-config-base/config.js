module.exports = {
  parserOptions: {
    ecmaVersion: 2019
  },
  extends: [
    'eslint:recommended',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:eslint-comments/recommended',
    'plugin:promise/recommended',
    'prettier',
    'prettier/@typescript-eslint'
  ],
  plugins: [
    '@typescript-eslint',
    'eslint-comments',
    'promise',
    'import',
    'optimize-regex',
    'no-secrets',
    'filename-rules'
  ],
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
        selector: 'variable',
        format: ['strictCamelCase'],
        leadingUnderscore: 'forbid'
      },
      {
        selector: 'variable',
        types: ['boolean', 'number'],
        modifiers: ['const'],
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
    '@typescript-eslint/explicit-function-return-type': ['off'],
    '@typescript-eslint/explicit-module-boundary-types': ['off'],
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
    'filename-rules/match': ['error', 'kebab-case'],
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true
      }
    ],
    // eslint-disable-next-line @typescript-eslint/naming-convention
    indent: ['error', 2, { SwitchCase: 1 }],
    complexity: ['error', { max: 3 }],
    'max-depth': ['error', { max: 2 }],
    'max-nested-callbacks': ['error', { max: 2 }],
    'max-lines-per-function': [
      'error',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      { max: 20, skipBlankLines: true, skipComments: true, IIFEs: true }
    ],
    'max-lines': [
      'error',
      { max: 160, skipBlankLines: true, skipComments: true }
    ],
    'no-useless-concat': 'error',
    'no-console': 'error',
    'no-template-curly-in-string': 'error',
    'no-underscore-dangle': 'off',
    'no-shadow': 'error',
    camelcase: 'off',
    'import/prefer-default-export': ['error']
  },
  overrides: [
    {
      // enable the rule specifically for TypeScript files
      files: ['*.ts'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': ['error'],
        '@typescript-eslint/explicit-module-boundary-types': ['error'],
        '@typescript-eslint/await-thenable': ['error'],
        // eslint-disable-next-line @typescript-eslint/naming-convention
        '@typescript-eslint/indent': ['error', 2, { SwitchCase: 1 }],
        '@typescript-eslint/quotes': [
          'error',
          'single',
          {
            avoidEscape: true
          }
        ],
        '@typescript-eslint/consistent-indexed-object-style': ['error'],
        indent: 'off',
        '@typescript-eslint/no-shadow': 'error',
        quotes: 'off',
        'no-shadow': 'off'
      }
    }
  ],
  settings: {
    node: {
      tryExtensions: ['.ts', '.js', '.d.ts', '.html', '.md', '.json']
    },
    'import/resolver': {
      node: {
        extensions: ['.ts', '.js', '.d.ts', '.html', '.md', '.json']
      }
    },
    'import/extensions': ['.ts', '.js', '.d.ts', '.html', '.md', '.json'],
    'import/external-module-folders': ['node_modules', 'node_modules/@types']
  }
};
