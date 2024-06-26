#!/usr/bin/env node
import smartlint from '../config.js';
import * as util from '../util.js';

const [, , ...args] = process.argv;
let path;

if (args.length === 1) {
  if (args[0].substring(0, 2) !== '--') {
    path = args.shift();
  }
} else {
  for (let i = 0; i < args.length; i += 2) {
    if (args[i].substring(0, 2) !== '--') {
      path = args[i];
      args.splice(i, 1);
      break;
    }
  }
}

const options = {};

const invalid = (/** @type {string} */ code) => {
  let message = 'Unknown error';

  switch (code) {
    case 'invalid-option': {
      message =
        'Invalid option, please use like `smartlint --linters=eslint,prettier ./src';
      break;
    }
    default: {
      break;
    }
  }

  util.error(message);
  return null;
};
const argsHandle = (/** @type {unknown} */ arg) => arg || '';

for (let i = 0; i < args.length; i += 1) {
  // @ts-expect-error Need to type
  const [key, value] = argsHandle(args[i]).split('=');
  if (key.substring(0, 2) !== '--') {
    invalid('invalid-option');
    break;
  }
  // @ts-expect-error Need to type
  options[key.substring(2)] = value.split(',');
}

// @ts-expect-error Need to type
const linterCommands = smartlint(options.linters, path);

if (linterCommands && linterCommands.length > 0) {
  for await (const { cmd, name } of linterCommands) {
    util.debug(`Linter ${name} is started linting...`);
    await util.execCommand(cmd);
    util.debug(`Linter ${name} is done!`);
  }
}
