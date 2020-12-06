/* eslint-disable no-console, security-node/detect-crlf */
const util = require('util');
const { exec } = require('child_process');

const Reset = '\x1b[0m';
const FgRed = '\x1b[31m';
const FgYellow = '\x1b[33m';
const FgBlue = '\x1b[34m';

const error = (...args) => {
  console.log(FgRed);
  console.log(...args);
  console.log(Reset);
};
const warn = (...args) => {
  console.log(FgYellow);
  console.log(...args);
  console.log(Reset);
};
const debug = (...args) => {
  console.log(FgBlue);
  console.log(...args);
  console.log(Reset);
};

const reinspectLog = (log) => {
  return log
    .replace(/\[error\]/g, `${FgRed}[error]${Reset}`)
    .replace(/\[warn\]/g, `${FgYellow}[warn]${Reset}`)
    .replace(/\[debug\]/g, `${FgBlue}[debug]${Reset}`);
};

const execAsync = util.promisify(exec);

module.exports = {
  error,
  warn,
  debug,
  reinspectLog,
  exec,
  execAsync,
  Reset,
  FgRed
};
