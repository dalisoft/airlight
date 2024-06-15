// @ts-check
import eslintImportX from 'eslint-plugin-import-x';
import tseslint from 'typescript-eslint';

export default tseslint.config({
  name: 'eslint-plugin-import-x',
  plugins: {
    'import-x': eslintImportX
  },
  settings: {
    'import-x/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import-x/resolver': {
      // Load <rootdir>/tsconfig.json
      typescript: true,
      node: true
    }
  },
  rules: {
    // Error on imports that don't match the underlying file system
    // https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-unresolved.md
    'import-x/no-unresolved': 'error'
  }
});
