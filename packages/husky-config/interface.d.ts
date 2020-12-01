interface IHook {
  'pre-commit': 'lint-staged';
  'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS';
}

declare class IHuskyConfig {
  static hooks: IHook;
}

export = IHuskyConfig;
