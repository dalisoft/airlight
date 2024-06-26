export type Lint =
  | 'lslint'
  | 'eslint'
  | 'stylelint'
  | 'markdown'
  | 'htmllint'
  | 'jsonymllint'
  | 'biome'
  | 'prettier'
  | 'dockerfile';

export interface ISmartLintReturn {
  cmd: string;
  name: Lint;
}
declare function smartlint(linters?: Lint, path?: string): ISmartLintReturn[];

export default smartlint;
