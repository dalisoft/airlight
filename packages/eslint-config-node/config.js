const baseConfig = require('eslint-config-airlight-base');

module.exports = Object.assign(baseConfig, {
  extends: baseConfig.extends.concat([
    'plugin:node/recommended',
    'plugin:security-node/recommended'
  ]),
  plugins: baseConfig.plugins.concat(['security-node']),
  overrides: baseConfig.overrides.concat([
    {
      files: ['*.cjs'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off'
      }
    }
  ]),
  settings: {
    node: {
      tryExtensions: baseConfig.settings.node.tryExtensions.concat([
        '.ts',
        '.js',
        '.cjs',
        '.mjs',
        '.d.ts',
        '.html',
        '.md',
        '.json'
      ])
    }
  }
});
