// @ts-check
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const noSecrets = require('eslint-plugin-no-secrets');
const tseslint = require('typescript-eslint');

module.exports = tseslint.config({
  name: 'eslint-plugin-no-secrets',
  files: ['*.cjs', '*.js', '*.mjs', '*.ts', '*.jsx', '*.tsx'],
  plugins: {
    'no-secrets': noSecrets
  },
  rules: {
    'no-secrets/no-secrets': 'error'
  }
});
