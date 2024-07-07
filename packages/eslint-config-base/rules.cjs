// @ts-expect-error Cannot find namespace 'SharedConfig'
/** @type {Partial<Record<string, SharedConfig.RuleEntry>>} */
module.exports = {
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
  '@typescript-eslint/comma-spacing': ['error', { before: false, after: true }],
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
  complexity: ['error', { max: 7 }],
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
};
