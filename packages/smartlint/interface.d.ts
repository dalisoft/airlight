type Lint =
  | 'eslint'
  | 'stylelint'
  | 'markdownlint'
  | 'htmllint'
  | 'jsonymllint'
  | 'prettier'
  | 'dockerfile';

declare function smartlint(linters?: Lint, path?: string): string;

export = smartlint;
