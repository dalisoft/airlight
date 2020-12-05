#!/usr/bin/env node

const smartlint = require('.');
const { execAsync } = require('./util');
const util = require('./util');
const [bin, callee, ...args] = process.argv;
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
  execAsync(lintCommand)
    .then(console.log)
    .catch((err) => {
      const [, error, ...messages] = err.message.split('\n\n');

      util.error(error);

      messages.forEach((message) => console.log(message));
    });
}
