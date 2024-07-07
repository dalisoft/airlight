// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair
/* eslint-disable no-console */
import resolve from '../resolve.js';

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(
  [`${process.cwd()}/package.json`],
  resolve(process.cwd(), 'package.json')
);
