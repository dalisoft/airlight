// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair
/* eslint-disable max-lines-per-function */
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
 * @param {string[]} lintNames
 */
const applyLinterCommands = (lintNames = []) =>
  lintNames
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    .map((lint) => linterCommandsMap[lint])
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

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    config[regex] = commands;
  }

  return config;
};
