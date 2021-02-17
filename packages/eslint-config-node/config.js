const baseConfig = require('eslint-config-airlight-base');

module.exports = {
  ...baseConfig,
  extends: baseConfig.extends.concat([
    'plugin:node/recommended',
    'plugin:security-node/recommended'
  ]),
  plugins: baseConfig.plugins.concat(['security-node']),
  overrides: baseConfig.overrides.concat([
    {
      files: ['*.js'],
      rules: {
        'import/extensions': [
          'error',
          'never',
          {
            js: 'always',
            json: 'always',
            wasm: 'always'
          }
        ]
      }
    },
    {
      files: ['*.cjs'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off'
      }
    }
  ]),
  settings: {
    ...baseConfig.settings,
    node: {
      tryExtensions: baseConfig.settings.node.tryExtensions.concat([
        '.cjs',
        '.mjs'
      ])
    },
    'import/resolver': {
      node: {
        extensions: baseConfig.settings[
          'import/resolver'
        ].node.extensions.concat(['.cjs', '.mjs'])
      }
    },
    'import/extensions': baseConfig.settings['import/extensions'].concat([
      '.cjs',
      '.mjs'
    ])
  }
};
