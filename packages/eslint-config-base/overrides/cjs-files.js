// @ts-check

export default [
  {
    name: 'eslint-override-cjs-files',
    files: ['**/*.cjs'],
    rules: {
      'import-x/extensions': 'off',
      '@typescript-eslint/no-require-imports': 'off'
    }
  }
];
