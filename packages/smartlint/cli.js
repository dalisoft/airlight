#!/usr/bin/env node

/* eslint-disable-next-line node/no-unpublished-require */
const smartlint = require('.');
const util = require('./util');

const [, , ...args] = process.argv;
let path;

if (args.length === 1) {
  if (args[0].substr(0, 2) !== '--') {
    path = args.shift();
  }
} else {
  for (let i = 0; i < args.length; i += 2) {
    // eslint-disable-next-line max-depth
    if (args[i].substr(0, 2) !== '--') {
      path = args[i];
      args.splice(i, 1);
      break;
    }
  }
}

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
    // eslint-disable-next-line no-process-exit
    return process.exit(0);
  })();
  return true;
}

return null;
