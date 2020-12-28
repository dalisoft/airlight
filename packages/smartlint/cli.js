#!/usr/bin/env node

/* eslint-disable-next-line node/no-unpublished-require */
const smartlint = require('.');
const util = require('./util');

const [, , ...args] = process.argv;
const path = args.pop();

const options = {};

const invalid = (code) => {
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
const argsHandle = (arg) => arg || '';

for (let i = 0; i < args.length; i += 1) {
  const [key, value] = argsHandle(args[i]).split('=');
  if (key.substr(0, 2) !== '--') {
    return invalid('invalid-option');
  }
  options[key.substr(2)] = value.split(',');
}

const linterCommands = smartlint(options.linters, path);

if (linterCommands && linterCommands.length > 0) {
  (async function run() {
    // eslint-disable-next-line no-restricted-syntax
    for await (const { cmd, name } of linterCommands) {
      util.debug(`Linter ${name} is started linting...`);
      await util.execCommand(cmd);
      util.debug(`Linter ${name} is done!`);
    }
  })();
  return true;
}

return null;
