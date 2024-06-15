// @ts-check
import tseslint from 'typescript-eslint';

export default tseslint.config({
  name: 'eslint-override-no-ts-checks',
  files: ['*.js', '*.jsx', '*.mjs', '*.cjs'],
  extends: [tseslint.configs.disableTypeChecked]
});
