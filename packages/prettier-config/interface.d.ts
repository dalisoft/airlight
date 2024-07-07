// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-extraneous-class */
// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
declare class PrettierConfig {
  static singleQuote: true;

  static printWidth: 80;

  static trailingComma: 'none';

  static arrowParens: 'always';

  static bracketSpacing: true;

  static bracketSameLine: true;

  static useTabs: false;

  static embeddedLanguageFormatting: 'auto';

  static singleAttributePerLine: true;

  static endOfLine: 'lf';
}

export = PrettierConfig;
