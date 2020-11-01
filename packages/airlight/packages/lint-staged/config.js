const applyLinterCommands = (
  commands,
  { eslint, prettier, stylelint, markdown, spectal },
  exclude = {}
) => {
  if (eslint && !exclude.eslint) {
    commands.push('eslint');
  }
  if (stylelint && !exclude.stylelint) {
    commands.push('stylelint');
  }
  if (markdown && !exclude.markdown) {
    commands.push('markdownlint-cli2');
  }
  if (spectal && !exclude.spectal) {
    commands.push('spectral lint');
  }

  // Always prettier would be at last
  if (prettier && !exclude.prettier) {
    commands.push('prettier -c');
  }
};

module.exports = (
  linters = {
    eslint: true,
    prettier: true
  },
  langs = [
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
    'md'
  ]
) => {
  const config = {};

  languages.forEach((language) => {
    let regex = '*.{';
    const commands = [];

    switch (language) {
      case 'js':
      case 'ts':
      case 'jsx':
      case 'tsx':
        regex += language;
        applyLinterCommands(commands, linters, {
          stylelint: true,
          spectal: true,
          markdown: true
        });
        break;
      case 'json':
      case 'yml':
        regex += language;
        applyLinterCommands(commands, linters, {
          eslint: true,
          stylelint: true,
          markdown: true
        });
        break;
      case 'css':
      case 'scss':
      case 'sass':
      case 'less':
        regex += language;
        applyLinterCommands(commands, linters, {
          eslint: true,
          spectal: true,
          markdown: true
        });
        break;
      case 'md':
        regex += language;
        applyLinterCommands(commands, linters, {
          eslint: true,
          stylelint: true,
          spectal: true
        });
      default:
        return;
    }

    regex += '}';

    config[regex] = commands;
  });

  return config;
};
