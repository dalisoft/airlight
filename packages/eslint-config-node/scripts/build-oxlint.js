import fs from 'node:fs/promises';
import legacy from '../legacy.js';

const { env, globals = {}, plugins, rules, settings = {} } = legacy;

/** @type Record<string, string> */
const _rules = {};
/** @type Record<string, string> */
const _settings = {};

for (const key in rules) {
  if (key.startsWith('import-x')) {
    _rules[key.replace('-x', '')] = rules[key];
  } else {
    _rules[key] = rules[key];
  }
}
for (const key in settings) {
  if (key.startsWith('import-x')) {
    _settings[key.replace('-x', '')] = settings[key];
  } else {
    _settings[key] = settings[key];
  }
}

await fs.writeFile(
  'oxlintrc.json',
  JSON.stringify(
    {
      env,
      globals,
      plugins: plugins.map((/** @type {string} */ plugin) =>
        plugin === 'import-x' ? 'import' : plugin
      ),
      rules: _rules,
      settings: _settings
    },
    null,
    2
  )
);
