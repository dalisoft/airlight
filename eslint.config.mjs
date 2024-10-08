import airlightNode from 'eslint-config-airlight-node';

export default [
  ...airlightNode,
  {
    name: 'eslint-config-airlight-root',
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    },
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      complexity: ['error', { max: 7 }],
      'max-lines-per-function': [
        'error',
        { max: 48, skipBlankLines: true, skipComments: true, IIFEs: true }
      ]
    },
    ignores: ['.history', '.release-me', 'scripts']
  }
];
