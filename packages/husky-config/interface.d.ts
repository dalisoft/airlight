// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-extraneous-class */
declare const preCommit = 'pre-commit';
declare const commitMsg = 'commit-msg';

interface IHook {
  [preCommit]: 'lint-staged';
  [commitMsg]: 'commitlint -E HUSKY_GIT_PARAMS';
}

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
declare class HuskyConfig {
  static hooks: IHook;
}

export = HuskyConfig;
