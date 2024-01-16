import resolve from '../resolve.mjs';

// eslint-disable-next-line no-console
console.log(
  [`${process.cwd()}/package.json`],
  resolve(process.cwd(), 'package.json')
);
