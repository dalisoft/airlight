const linterCommandsMap = {
  eslint: 'eslint',
  stylelint: 'stylelint',
  markdownlint: 'markdownlint-cli2',
  htmllint: 'htmlhint',
  jsonymllint: 'spectral lint',
  dockerfile: 'dockerfilelint',
  prettier: 'prettier -c'
};

const DEFAULT_LINTERS = [
  'eslint',
  'stylelint',
  'markdownlint',
  'htmllint',
  'jsonymllint',
  'prettier',
  'dockerfile'
];

module.exports = (linters = DEFAULT_LINTERS, path = '.') => {
  return linters
    .map(
      (linter) =>
        linterCommandsMap[linter] && `npx ${linterCommandsMap[linter]} ${path}`
    )
    .filter((lint) => lint)
    .join(' && ');
};
