import { fixupPluginRules } from '@eslint/compat';
// @ts-check
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import optimizeRegEx from 'eslint-plugin-optimize-regex';
import tseslint from 'typescript-eslint';

export default tseslint.config({
  name: 'eslint-plugin-optimize-regex',
  files: ['*.cjs', '*.js', '*.mjs', '*.ts', '*.jsx', '*.tsx'],
  plugins: {
    'optimize-regex': fixupPluginRules(optimizeRegEx)
  }
});
