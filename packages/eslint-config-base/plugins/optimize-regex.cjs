const { fixupPluginRules } = require('@eslint/compat');
// @ts-check
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const optimizeRegEx = require('eslint-plugin-optimize-regex');
const tseslint = require('typescript-eslint');

module.exports = tseslint.config({
  name: 'eslint-plugin-optimize-regex',
  files: ['*.cjs', '*.js', '*.mjs', '*.ts', '*.jsx', '*.tsx'],
  plugins: {
    'optimize-regex': fixupPluginRules(optimizeRegEx)
  }
});
