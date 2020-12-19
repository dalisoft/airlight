type Lint =
  | 'eslint'
  | 'stylelint'
  | 'markdownlint'
  | 'htmllint'
  | 'jsonymllint'
  | 'prettier'
  | 'dockerfile';

interface ISmartLintReturn {
  cmd: string;
  name: Lint;
}
declare function smartlint(linters?: Lint, path?: string): ISmartLintReturn[];

export = smartlint;
