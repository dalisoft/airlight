// @ts-expect-error Cannot find namespace 'SharedConfig'
/** @type {Partial<Record<string, SharedConfig.RuleEntry>>} */
module.exports = {
  '@eslint-community/eslint-comments/no-unused-disable': 'error',
  '@eslint-community/eslint-comments/disable-enable-pair': 'warn',
  '@typescript-eslint/explicit-function-return-type': 'off',
  '@typescript-eslint/explicit-module-boundary-types': 'off',
  '@typescript-eslint/no-shadow': 'off',
  '@typescript-eslint/no-empty-function': 'off',
  '@typescript-eslint/indent': ['off'],
  '@typescript-eslint/class-literal-property-style': ['error'],
  '@stylistic/comma-dangle': ['error', 'never'],
  '@stylistic/comma-spacing': ['error', { before: false, after: true }],
  '@typescript-eslint/no-non-null-asserted-optional-chain': ['error'],
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

    { max: 60, skipBlankLines: true, skipComments: true, IIFEs: true }
  ],
  'max-lines': [
    'error',
    { max: 100, skipBlankLines: true, skipComments: true }
  ],
  'no-useless-concat': 'error',
  'no-console': process.env.CI ? 'error' : 'warn',
  'no-template-curly-in-string': 'error',
  'no-underscore-dangle': 'off',
  'no-shadow': ['error', { hoist: 'functions' }],
  'no-empty-function': ['error'],
  camelcase: 'off',
  'import-x/prefer-default-export': 'warn',
  'import-x/no-mutable-exports': 'error'
};
