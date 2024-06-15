// @ts-check
import tseslint from 'typescript-eslint';

export default tseslint.config({
  name: 'eslint-override-ts-files',
  // enable the rule specifically for TypeScript files
  files: ['*.ts'],
  rules: {
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
