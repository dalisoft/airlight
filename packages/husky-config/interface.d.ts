declare const preCommit = 'pre-commit';
declare const commitMsg = 'commit-msg';

interface IHook {
  [preCommit]: 'lint-staged';
  [commitMsg]: 'commitlint -E HUSKY_GIT_PARAMS';
}

declare class HuskyConfig {
  static hooks: IHook;
}

export = HuskyConfig;
