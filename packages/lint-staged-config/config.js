// @ts-check
const linterCommandsMap = {
  eslint: 'eslint --color',
  stylelint: 'stylelint --color',
  markdown: 'dprint check --log-level=warn',
  htmllint: 'htmlhint',
  jsonymllint: 'spectral lint --ignore-unknown-format',
  dockerfile: 'dockerfilelint',
  prettier: 'prettier -c',
  biome: 'biome check --diagnostic-level=warn'
};

/**
 * @param {Array<keyof typeof linterCommandsMap>} lintNames
 */
const applyLinterCommands = (lintNames = []) =>
  lintNames
    .map(
      (/** @type {keyof typeof linterCommandsMap} */ lint) =>
        linterCommandsMap[lint]
    )
    .filter((command) => command);

const languagesSupport = [
  'ts',
  'js',
  'tsx',
  'jsx',
  'json',
  'yml',
  'css',
  'scss',
  'sass',
  'less',
  'md',
  'dockerfile'
];

// eslint-disable-next-line complexity
module.exports = (languages = languagesSupport) => {
  const config = {};

  for (const language of languages) {
    let regex = '*.';
    let commands;

    switch (language) {
      case 'js':
      case 'ts':
      case 'jsx':
      case 'tsx':
        regex += language;
        commands = applyLinterCommands(['eslint', 'biome']);
        break;
      case 'json':
        regex += language;
        commands = applyLinterCommands(['biome']);
        break;
      case 'yaml':
      case 'yml':
        regex += language;
        commands = applyLinterCommands(['jsonymllint']);
        break;
      case 'html':
        throw new Error('Due of security issues, we currently disabled it');
      // regex += language;
      // commands = applyLinterCommands(['htmllint', 'prettier']);
      // break;
      case 'css':
      case 'scss':
      case 'sass':
      case 'less':
        regex += language;
        commands = applyLinterCommands(['stylelint', 'prettier']);
        break;
      case 'md':
        regex += language;
        commands = applyLinterCommands(['markdown']);
        break;
      case 'dockerfile':
        regex = 'Dockerfile';
        commands = applyLinterCommands(['dockerfile']);
        break;
      default:
        return;
    }

    // @ts-expect-error It has a dynamic entry
    config[regex] = commands;
  }

  return config;
};
