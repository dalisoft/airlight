// @ts-check
import noSecrets from 'eslint-plugin-no-secrets';

/** @type {import('eslint').Linter.Config<import('eslint').Linter.RulesRecord>[]} */
export default [
  {
    name: 'eslint-plugin-no-secrets',
    files: ['*.cjs', '*.js', '*.mjs', '*.ts', '*.jsx', '*.tsx'],
    plugins: {
      'no-secrets': noSecrets
    },
    rules: {
      'no-secrets/no-secrets': 'error'
    }
  }
];
