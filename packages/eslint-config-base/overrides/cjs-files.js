// @ts-check
import tseslint from 'typescript-eslint';

export default tseslint.config({
  name: 'eslint-override-cjs-files',
  files: ['*.cjs'],
  rules: {
    'import-x/extensions': 'off'
  }
});
