import { execFileSync } from 'node:child_process';
import fs from 'node:fs/promises';
import legacy from '../legacy.js';

const { env, globals = {}, plugins, rules, settings = {} } = legacy;

/** @type Record<string, string> */
const _rules = {};
/** @type Record<string, string> */
const _settings = {};

const unsupportedPlugins = [
  'no-secrets',
  'optimize-regex',
  '@eslint-community'
];
const remaps = [
  { old: 'import-x', offset: 8, replace: 'import', skip: false },
  { old: 'n', offset: 1, replace: 'node', skip: false },
  { old: 'react-hooks', offset: 11, replace: 'react', skip: false },
  { old: 'react-refresh', offset: 13, replace: 'react', skip: false },
  ...unsupportedPlugins.map((plugin) => ({
    old: plugin,
    offset: plugin.length,
    replace: null,
    skip: true
  }))
];
const remapRules = remaps.map((remap) => ({
  ...remap,
  old: `${remap.old}/`,
  offset: remap.offset + 1,
  replace: `${remap.replace}/`
}));

/**
 * @param {Record<string, string>} newMap
 * @param {Record<string, string>} oldMap
 */
const remapFn = (oldMap, newMap) => {
  loop1: for (const key in oldMap) {
    for (const { old, offset, replace, skip } of remapRules) {
      if (key.substring(0, offset) === old && skip) {
        continue loop1;
      } else if (key.substring(0, offset) === old) {
        newMap[replace + key.substring(offset)] = oldMap[key];
        continue loop1;
      }
    }
    newMap[key] = oldMap[key];
  }
};

remapFn(rules, _rules);
remapFn(settings, _settings);

// Newer oxlint fails on unknown rules, so keep only rules oxlint implements
await fs.writeFile('oxlintrc.json', '{}');
const oxlint = new URL('bin/oxlint', import.meta.resolve('oxlint/package.json'));
const supportedRules = JSON.parse(
  execFileSync(
    process.execPath,
    [oxlint.pathname, '--rules', '--format=json', '--config=oxlintrc.json'],
    { encoding: 'utf8' }
  )
).map((/** @type {{ scope: string, value: string }} */ rule) =>
  rule.scope === 'eslint' ? rule.value : `${rule.scope}/${rule.value}`
);
for (const key in _rules) {
  // `@typescript-eslint` extension rules are mapped to `eslint` rules too
  const ts = key.replace('@typescript-eslint/', '');
  if (![key, `typescript/${ts}`, ts].some((r) => supportedRules.includes(r))) {
    delete _rules[key];
  }
}

await fs.writeFile(
  'oxlintrc.json',
  JSON.stringify(
    {
      env,
      globals,
      plugins: plugins
        .filter(
          (/** @type {string} */ plugin) => !unsupportedPlugins.includes(plugin)
        )
        .map(
          (/** @type {string} */ plugin) =>
            remaps.find(
              (rule) => rule.old === plugin && !rule.skip && rule.replace
            )?.replace ?? plugin
        ),
      rules: _rules,
      settings: _settings
    },
    null,
    2
  )
);
