// @ts-check

export default {
  node: {
    tryExtensions: ['.ts', '.js', '.d.ts', '.html', '.md', '.json']
  },
  'import-x/resolver': {
    node: {
      extensions: ['.ts', '.js', '.d.ts', '.html', '.md', '.json']
    },
    typescript: {
      alwaysTryTypes: true,
      // use an array of glob patterns
      project: ['packages/*/tsconfig.json', 'tsconfig.json']
    }
  },
  'import-x/extensions': ['.ts', '.js', '.d.ts', '.html', '.md', '.json'],
  'import-x/external-module-folders': ['node_modules', 'node_modules/@types']
};
