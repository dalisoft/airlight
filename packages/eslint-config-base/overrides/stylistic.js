// @ts-expect-error Cannot find namespace 'SharedConfig'
/** @type {Partial<Record<string, SharedConfig.RuleEntry>>} */
export default {
  // Replace Airbnb 'brace-style' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/brace-style.md
  'brace-style': 'off',
  '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],

  // Replace Airbnb 'comma-dangle' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/comma-dangle.md
  // The TypeScript version also adds 3 new options, all of which should be set to the same value as the base config
  'comma-dangle': 'off',
  '@stylistic/comma-dangle': [
    'error',
    {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'always-multiline',
      enums: 'always-multiline',
      generics: 'always-multiline',
      tuples: 'always-multiline'
    }
  ],

  // Replace Airbnb 'comma-spacing' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/comma-spacing.md
  'comma-spacing': 'off',
  '@stylistic/comma-spacing': ['error', { before: false, after: true }],

  // Replace Airbnb 'func-call-spacing' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/func-call-spacing.md
  'func-call-spacing': 'off',
  '@stylistic/function-call-spacing': ['error', 'never'],

  // Replace Airbnb 'quotes' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/quotes.md
  quotes: 'off',
  '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],

  // Replace Airbnb 'semi' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/semi.md
  semi: 'off',
  '@stylistic/semi': ['error', 'always'],

  // Replace Airbnb 'space-before-function-paren' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/space-before-function-paren.md
  'space-before-function-paren': 'off',
  '@stylistic/space-before-function-paren': [
    'error',
    {
      anonymous: 'always',
      named: 'never',
      asyncArrow: 'always'
    }
  ],

  // Replace Airbnb 'keyword-spacing' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/keyword-spacing.md
  'keyword-spacing': 'off',
  '@stylistic/keyword-spacing': [
    'error',
    {
      before: true,
      after: true,
      overrides: {
        return: { after: true },
        throw: { after: true },
        case: { after: true }
      }
    }
  ],

  // Replace Airbnb 'lines-between-class-members' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/lines-between-class-members.md
  'lines-between-class-members': 'off',
  '@stylistic/lines-between-class-members': [
    'error',
    'always',
    { exceptAfterSingleLine: false }
  ],

  // Replace Airbnb 'space-infix-ops' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/space-infix-ops.md
  'space-infix-ops': 'off',
  '@stylistic/space-infix-ops': 'error',

  // Replace Airbnb 'object-curly-spacing' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/object-curly-spacing.md
  'object-curly-spacing': 'off',
  '@stylistic/object-curly-spacing': ['error', 'always'],

  // Replace Airbnb 'space-before-blocks' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/space-before-blocks.md
  'space-before-blocks': 'off',
  '@stylistic/space-before-blocks': 'error',

  // Replace Airbnb 'no-extra-semi' rule with '@typescript-eslint' version
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-extra-semi.md
  'no-extra-semi': 'off',
  '@stylistic/no-extra-semi': 'error'
};
