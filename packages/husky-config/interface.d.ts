declare const preCommit = 'pre-commit';
declare const commitMsg = 'commit-msg';

interface IHook {
  [preCommit]: 'lint-staged';
  [commitMsg]: 'commitlint -E HUSKY_GIT_PARAMS';
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
declare class HuskyConfig {
  static hooks: IHook;
}

export = HuskyConfig;
