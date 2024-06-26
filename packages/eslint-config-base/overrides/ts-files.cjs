// @ts-check
const tseslint = require('typescript-eslint');

module.exports = tseslint.config({
  name: 'eslint-override-ts-files',
  // enable the rule specifically for TypeScript files
  files: ['**/*.ts'],
  extends: [...tseslint.configs.strictTypeChecked],
  rules: {
    // The following rules are enabled in Airbnb config, but are already checked (more thoroughly) by the TypeScript compiler
    // Some of the rules also fail in TypeScript files, for example: https://github.com/typescript-eslint/typescript-eslint/issues/662#issuecomment-507081586
    // Rules are inspired by: https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/eslint-recommended.ts
    'constructor-super': 'off',
    'getter-return': 'off',
    'no-const-assign': 'off',
    'no-dupe-args': 'off',
    'no-dupe-class-members': 'off',
    'no-dupe-keys': 'off',
    'no-func-assign': 'off',
    'no-import-assign': 'off',
    'no-new-symbol': 'off',
    'no-obj-calls': 'off',
    'no-redeclare': 'off',
    'no-setter-return': 'off',
    'no-this-before-super': 'off',
    'no-undef': 'off',
    'no-unreachable': 'off',
    'no-unsafe-negation': 'off',
    'valid-typeof': 'off',
    // The following rules are enabled in Airbnb config, but are recommended to be disabled within TypeScript projects
    'import-x/named': 'off',
    'import-x/no-named-as-default-member': 'off',
    // Disable `import-x/no-unresolved`, see README.md for details
    'import-x/no-unresolved': 'off',
    '@typescript-eslint/explicit-function-return-type': ['error'],
    '@typescript-eslint/explicit-module-boundary-types': ['error'],
    '@typescript-eslint/await-thenable': ['error'],
    '@typescript-eslint/indent': [
      'error',
      2,
      {
        SwitchCase: 1,
        flatTernaryExpressions: false,
        offsetTernaryExpressions: true
      }
    ],
    '@typescript-eslint/quotes': [
      'error',
      'single',
      {
        avoidEscape: true
      }
    ],
    '@typescript-eslint/no-shadow': ['error', { hoist: 'functions' }],
    '@typescript-eslint/no-empty-function': ['error'],
    '@typescript-eslint/consistent-indexed-object-style': ['error'],
    indent: 'off',
    quotes: 'off',
    'no-shadow': 'off',
    'no-empty-function': 'off',
    'n/no-missing-import': 'off'
  }
});
