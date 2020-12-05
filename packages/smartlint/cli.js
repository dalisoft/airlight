#!/usr/bin/env node
/* eslint-disable no-console, node/no-unpublished-require */

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

const lintCommand = smartlint(options.linters, path);

if (lintCommand) {
  util
    .execAsync(lintCommand)
    .then(console.log)
    .catch((err) => {
      const [, error, ...messages] = err.message.split('\n\n');

      util.error(error);

      // eslint-disable-next-line security-node/detect-crlf
      messages.forEach((logMessage) => console.log(logMessage));
    });
}

return null;
