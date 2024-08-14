// @ts-check
const tseslint = require('typescript-eslint');

module.exports = tseslint.config({
  name: 'eslint-override-cjs-files',
  files: ['**/*.cjs'],
  rules: {
    'import-x/extensions': 'off',
    '@typescript-eslint/no-require-imports': 'off'
  }
});
