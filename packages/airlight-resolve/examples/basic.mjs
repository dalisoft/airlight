/* eslint-disable @eslint-community/eslint-comments/disable-enable-pair */
/* eslint-disable no-console */
import resolve from '../resolve.js';

// biome-ignore lint/suspicious/noConsole: For example it's OK to use console
console.log(
  [`${process.cwd()}/package.json`],
  resolve(process.cwd(), 'package.json')
);
