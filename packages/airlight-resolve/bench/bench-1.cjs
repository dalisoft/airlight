// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable filename-rules/match, no-console */

const resolve = require('../resolve.cjs');

const ITERATEE = 1_000_000;
const CWD = process.cwd();

const input = [
  `${CWD}/package.json`,
  'eslint-config-airlight-node',
  'oxc-resolver',
  `${CWD}/node_modules/biome-config-airlight`
];

console.time('nodejs resolve total');
for (const file of input) {
  console.time(`nodejs resolve ${file}`);
  for (let i = 0; i < ITERATEE; i++) {
    require.resolve(file);
  }
  console.timeEnd(`nodejs resolve ${file}`);
}
console.timeEnd('nodejs resolve total');

console.time('airlight-resolve total');
for (const file of input) {
  console.time(`airlight-resolve ${file}`);
  for (let i = 0; i < ITERATEE; i++) {
    resolve(file);
  }
  console.timeEnd(`airlight-resolve ${file}`);
}
console.timeEnd('airlight-resolve total');
