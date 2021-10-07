const linterCommandsMap = {
  eslint: 'eslint --color',
  stylelint: 'stylelint --color',
  markdownlint: 'markdownlint-cli2',
  htmllint: 'htmlhint',
  jsonymllint: 'spectral lint --ignore-unknown-format',
  dockerfile: 'dockerfilelint',
  prettier: 'prettier -c',
  lslint: 'ls-lint'
};

const defaultArgumentsMap = {
  dockerfile: 'Dockerfile',
  markdownlint: '{*.md,**/*.md} "#node_modules"',
  stylelint: '{**/*,*}.{css,sass,scss,md,html}'
};

const defaultLinters = [
  'lslint',
  'eslint',
  // 'stylelint',
  'markdownlint',
  // 'htmllint',
  // 'jsonymllint',
  'prettier'
  // 'dockerfile'
];

module.exports = (linters = defaultLinters, path = '.') =>
  linters
    .map(
      (linter) =>
        linterCommandsMap[linter] &&
        `${linterCommandsMap[linter]} ${
          defaultArgumentsMap[linter] && path === '.'
            ? defaultArgumentsMap[linter]
            : path
        }`
    )
    .map((cmd, index) => ({ cmd, name: linters[index] }))
    .filter((lint) => lint.cmd);
