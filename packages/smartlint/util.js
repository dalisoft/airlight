// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-console */
const util = require('util');
const { exec } = require('child_process');

const fgReset = '\x1b[0m';
const fgRed = '\x1b[31m';
const fgYellow = '\x1b[33m';
const fgBlue = '\x1b[34m';

const error = (...args) => {
  console.log(fgRed, ...args, fgReset);
};
const warn = (...args) => {
  console.log(fgYellow, ...args, fgReset);
};
const debug = (...args) => {
  console.log(fgBlue, ...args, fgReset);
};

const reinspectLog = (log) =>
  log
    .replace(/\[error\]/g, `${fgRed}[error]${fgReset}`)
    .replace(/\[warn\]/g, `${fgYellow}[warn]${fgReset}`)
    .replace(/\[debug\]/g, `${fgBlue}[debug]${fgReset}`);

const execAsync = util.promisify(exec);

const execCommand = (command) =>
  execAsync(command)
    .catch((std) => std)
    // eslint-disable-next-line complexity
    .then(({ stdout, stderr }) => {
      if (stdout && stdout.length > 0) {
        process.stdout.write(reinspectLog(stdout));
      }
      if (stderr && stderr.length > 0) {
        process.stderr.write(reinspectLog(stderr));
        // eslint-disable-next-line n/no-process-exit
        return process.exit(1);
      }
      if (
        stdout.includes('error') &&
        !stdout.includes('0 error') &&
        !stdout.includes('no error') &&
        !stdout.includes('No results')
      ) {
        // eslint-disable-next-line n/no-process-exit
        return process.exit(1);
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
  // eslint-disable-next-line @typescript-eslint/naming-convention
  fgReset,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  fgRed
};
