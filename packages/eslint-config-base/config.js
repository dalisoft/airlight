module.exports = {
  parserOptions: {
    ecmaVersion: 2019
  },
  extends: [
    'eslint:recommended',
    'airbnb-base',
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
        leadingUnderscore: 'allow'
      },
      {
        selector: ['property'],
        format: ['snake_case']
      }
    ],
    '@typescript-eslint/explicit-function-return-type': ['off'],
    '@typescript-eslint/explicit-module-boundary-types': ['off'],
    '@typescript-eslint/indent': ['off'],
    '@typescript-eslint/comma-dangle': ['error', 'never'],
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/no-non-null-asserted-optional-chain': ['error'],
    '@typescript-eslint/restrict-plus-operands': ['error'],
    'operator-linebreak': ['off', 'after'],
    'prefer-template': 'error',
    'import/prefer-default-export': ['error'],
    'filename-rules/match': ['error', 'kebab-case'],
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ],
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
    'no-underscore-dangle': ['off'],
    'no-useless-concat': ['error'],
    'no-console': ['error'],
    'no-template-curly-in-string': 'error',
    'no-shadow': 'error'
  },
  overrides: [
    {
      // enable the rule specifically for TypeScript files
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': ['error'],
        '@typescript-eslint/explicit-module-boundary-types': ['error'],
        '@typescript-eslint/quotes': [
          'error',
          'single',
          {
            avoidEscape: true,
            allowTemplateLiterals: true
          }
        ],
        '@typescript-eslint/no-shadow': 'error',
        quotes: 'off',
        'no-shadow': 'off'
      }
    },
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
    }
  ],
  settings: {
    node: {
      tryExtensions: [
        '.ts',
        '.js',
        '.mjs',
        '.tsx',
        '.jsx',
        '.d.ts',
        '.html',
        '.md',
        '.json'
      ]
    }
  }
};
