const linterCommandsMap = {
  eslint: 'eslint --color',
  stylelint: 'stylelint --color',
  markdownlint: 'markdownlint-cli2',
  htmllint: 'htmlhint',
  jsonymllint: 'spectral lint --ignore-unknown-format',
  dockerfile: 'dockerfilelint',
  prettier: 'prettier -c'
};

const defaultArgumentsMap = {
  dockerfile: 'Dockerfile',
  markdownlint: '{*.md,**/*.md} "#node_modules"'
};

const DEFAULT_LINTERS = [
  'eslint',
  // 'stylelint',
  'markdownlint',
  'htmllint',
  'jsonymllint',
  'prettier'
  // 'dockerfile'
];

module.exports = (linters = DEFAULT_LINTERS, path = '.') => {
  return linters
    .map(
      (linter) =>
        linterCommandsMap[linter] &&
        `npx ${linterCommandsMap[linter]} ${
          defaultArgumentsMap[linter] && path === '.'
            ? defaultArgumentsMap[linter]
            : path
        }`
    )
    .map((cmd, index) => ({ cmd, name: linters[index] }))
    .filter((lint) => lint.cmd);
};
