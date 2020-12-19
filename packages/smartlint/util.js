/* eslint-disable no-console, security-node/detect-crlf */
const util = require('util');
const { exec } = require('child_process');

const Reset = '\x1b[0m';
const FgRed = '\x1b[31m';
const FgYellow = '\x1b[33m';
const FgBlue = '\x1b[34m';

const error = (...args) => {
  console.log(FgRed, ...args, Reset);
};
const warn = (...args) => {
  console.log(FgYellow, ...args, Reset);
};
const debug = (...args) => {
  console.log(FgBlue, ...args, Reset);
};

const reinspectLog = (log) => {
  return log
    .replace(/\[error\]/g, `${FgRed}[error]${Reset}`)
    .replace(/\[warn\]/g, `${FgYellow}[warn]${Reset}`)
    .replace(/\[debug\]/g, `${FgBlue}[debug]${Reset}`);
};

const execAsync = util.promisify(exec);

const execCommand = (command) =>
  execAsync(command)
    .catch((std) => std)
    .then(({ stdout, stderr }) => {
      if (stdout && stdout.length > 0) {
        process.stdout.write(reinspectLog(stdout));
      }
      if (stderr && stderr.length > 0) {
        process.stderr.write(reinspectLog(stderr));
      }
      return null;
    });

module.exports = {
  error,
  warn,
  debug,
  reinspectLog,
  exec,
  execAsync,
  execCommand,
  Reset,
  FgRed
};
