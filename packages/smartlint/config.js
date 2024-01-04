const linterCommandsMap = {
  eslint: 'eslint --color',
  stylelint: 'stylelint --color',
  markdown: 'dprint check --log-level=warn',
  htmllint: 'htmlhint',
  jsonymllint: 'spectral lint --ignore-unknown-format',
  dockerfile: 'dockerfilelint',
  prettier: 'prettier -c',
  biome: 'biome check --diagnostic-level=warn',
  lslint: 'ls-lint'
};

const defaultArgumentsMap = {
  dockerfile: 'Dockerfile',
  markdown: '',
  stylelint: '{**/*,*}.{css,sass,scss,md,html}'
};

const defaultLinters = [
  'lslint',
  'eslint',
  // 'stylelint',
  'markdown',
  // 'htmllint',
  // 'jsonymllint',
  'biome'
  // 'dockerfile'
];

export default (linters = defaultLinters, path = '.') =>
  linters
    .map(
      (linter) =>
        linterCommandsMap[linter] &&
        `${linterCommandsMap[linter]} ${
          defaultArgumentsMap[linter] !== undefined && path === '.'
            ? defaultArgumentsMap[linter]
            : path
        }`
    )
    .map((cmd, index) => ({ cmd, name: linters[index] }))
    .filter((lint) => lint.cmd);
