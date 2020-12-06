const linterCommandsMap = {
  eslint: 'eslint --color --ext .js,.ts,.jsx,.tsx',
  stylelint: 'stylelint',
  markdownlint: 'markdownlint-cli2',
  htmllint: 'htmlhint',
  jsonymllint: 'spectral lint --ignore-unknown-format',
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
  // eslint-disable-next-line no-console
  console.log(
    // eslint-disable-next-line security-node/detect-crlf
    linters
      .map(
        (linter) =>
          linterCommandsMap[linter] &&
          `npx ${linterCommandsMap[linter]} ${path}`
      )
      .filter((lint) => lint)
      .join(' && ')
  );

  return linters
    .map(
      (linter) =>
        linterCommandsMap[linter] && `npx ${linterCommandsMap[linter]} ${path}`
    )
    .filter((lint) => lint)
    .join(' && ');
};
