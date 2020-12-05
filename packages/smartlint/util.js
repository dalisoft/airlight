/* eslint-disable no-console, security-node/detect-crlf */
const util = require('util');
const { exec } = require('child_process');

const Reset = '\x1b[0m';
const FgRed = '\x1b[31m';

const error = (...args) => {
  console.log(FgRed);
  console.log(...args);
  console.log(Reset);
};

const execAsync = util.promisify(exec);

module.exports = { error, execAsync };
