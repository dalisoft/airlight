import fs from "node:fs/promises";
import legacy from "../legacy.js";

const { env, globals = {}, plugins, rules, settings = {} } = legacy;

/** @type Record<string, string> */
const _rules = {};
/** @type Record<string, string> */
const _settings = {};

const unsupportedPlugins = [
	"no-secrets",
	"optimize-regex",
	"@eslint-community",
];
const remapRules = [
	{ old: "import-x", offset: 8, replace: "import", skip: false },
	{ old: "n", offset: 1, replace: "node", skip: false },
	...unsupportedPlugins.map((plugin) => ({
		old: plugin,
		offset: plugin.length,
		replace: null,
		skip: true,
	})),
].map((remap) => ({
	...remap,
	old: `${remap.old}/`,
	offset: remap.offset + 1,
	replace: `${remap.replace}/`,
}));

/**
 * @param {Record<string, string>} newMap
 * @param {Record<string, string>} oldMap
 */
const remapFn = (oldMap, newMap) => {
	loop1: for (const key in oldMap) {
		for (const { old, offset, replace, skip } of remapRules) {
			if (key.substring(0, offset) && skip) {
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

await fs.writeFile(
	"oxlintrc.json",
	JSON.stringify(
		{
			env,
			globals,
			plugins: plugins
				.filter(
					(/** @type {string} */ plugin) =>
						!unsupportedPlugins.includes(plugin),
				)
				.map((/** @type {string} */ plugin) =>
					plugin === "import-x" ? "import" : plugin === "n" ? "node" : plugin,
				),
			rules: _rules,
			settings: _settings,
		},
		null,
		2,
	),
);
