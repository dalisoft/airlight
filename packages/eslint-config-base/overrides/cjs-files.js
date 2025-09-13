// @ts-check
import { defineConfig } from 'eslint/config';

export default defineConfig({
  name: 'eslint-override-cjs-files',
  files: ['**/*.cjs'],
  rules: {
    'import-x/extensions': 'off',
    '@typescript-eslint/no-require-imports': 'off'
  }
});
