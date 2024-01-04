// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable filename-rules/match, no-console */

const resolve = require('../resolve.cjs');

const ITERATEE = 1_000_000;

console.time('nodejs resolve');
for (let i = 0; i < ITERATEE; i++) {
  require.resolve(`${process.cwd()}/package.json`);
}
console.timeEnd('nodejs resolve');

console.time('airlight-resolve');
for (let i = 0; i < ITERATEE; i++) {
  resolve(`${process.cwd()}/package.json`);
}
console.timeEnd('airlight-resolve');
