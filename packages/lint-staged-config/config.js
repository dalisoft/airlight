const linterCommandsMap = {
  eslint: 'eslint --color',
  stylelint: 'stylelint --color',
  markdownlint: 'markdownlint-cli2',
  htmllint: 'htmlhint',
  jsonymllint: 'spectral lint --ignore-unknown-format',
  dockerfile: 'dockerfilelint',
  prettier: 'prettier -c'
};

const applyLinterCommands = (lint_names = []) => {
  return lint_names
    .map((lint) => linterCommandsMap[lint])
    .filter((command) => command);
};

const LANGUAGES_SUPPORT = [
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

module.exports = (languages = LANGUAGES_SUPPORT) => {
  const config = {};

  languages.forEach((language) => {
    let regex = '*.';
    let commands;

    switch (language) {
      case 'js':
      case 'ts':
      case 'jsx':
      case 'tsx':
        regex += language;
        commands = applyLinterCommands(['eslint', 'prettier']);
        break;
      case 'json':
      case 'yaml':
      case 'yml':
        regex += language;
        commands = applyLinterCommands(['jsonymllint', 'prettier']);
        break;
      case 'html':
        regex += language;
        commands = applyLinterCommands(['htmllint', 'prettier']);
        break;
      case 'css':
      case 'scss':
      case 'sass':
      case 'less':
        regex += language;
        commands = applyLinterCommands(['stylelint', 'prettier']);
        break;
      case 'md':
        regex += language;
        commands = applyLinterCommands(['markdownlint', 'prettier']);
        break;
      case 'dockerfile':
        regex = 'Dockerfile';
        commands = applyLinterCommands(['dockerfile']);
        break;
      default:
        return;
    }

    config[regex] = commands;
  });

  return config;
};
