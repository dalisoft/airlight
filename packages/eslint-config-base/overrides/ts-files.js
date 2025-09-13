// @ts-check
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig({
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
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true
      }
    ],
    '@typescript-eslint/no-shadow': ['error', { hoist: 'functions' }],
    '@typescript-eslint/no-empty-function': ['error'],
    '@typescript-eslint/consistent-indexed-object-style': ['error'],
    '@typescript-eslint/restrict-plus-operands': ['error'],
    indent: 'off',
    'no-shadow': 'off',
    'no-empty-function': 'off',

    // Replace Airbnb 'dot-notation' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/dot-notation.md
    'dot-notation': 'off',
    '@typescript-eslint/dot-notation': 'error',

    // Replace Airbnb 'no-implied-eval' and 'no-new-func' rules with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-implied-eval.md
    'no-implied-eval': 'off',
    'no-new-func': 'off',
    '@typescript-eslint/no-implied-eval': 'error',

    // Replace Airbnb 'no-throw-literal' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-throw-literal.md
    'no-throw-literal': 'off',
    '@typescript-eslint/only-throw-error': 'error',

    // Replace Airbnb 'no-return-await' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/return-await.md
    'no-return-await': 'off',
    '@typescript-eslint/return-await': ['error', 'in-try-catch'],

    // The `@typescript-eslint/naming-convention` rule allows `leadingUnderscore` and `trailingUnderscore` settings. However, the existing `no-underscore-dangle` rule already takes care of this.
    '@typescript-eslint/naming-convention': [
      'error',
      // Allow camelCase variables (23.2), PascalCase variables (23.8), and UPPER_CASE variables (23.10)
      {
        selector: 'variable',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE']
      },
      // Allow camelCase functions (23.2), and PascalCase functions (23.8)
      {
        selector: 'function',
        format: ['camelCase', 'PascalCase']
      },
      // Airbnb recommends PascalCase for classes (23.3), and although Airbnb does not make TypeScript recommendations, we are assuming this rule would similarly apply to anything "type like", including interfaces, type aliases, and enums
      {
        selector: 'typeLike',
        format: ['PascalCase']
      }
    ]
  }
});
