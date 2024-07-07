const baseConfig = require('eslint-config-airlight-base/legacy');

module.exports = {
  ...baseConfig.rules,
  'n/no-unsupported-features/es-syntax': ['error', { ignores: ['modules'] }]
};
