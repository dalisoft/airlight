/* eslint-disable @eslint-community/eslint-comments/disable-enable-pair */
/* eslint-disable no-console */
import { exec } from 'node:child_process';
import util from 'node:util';

const fgReset = '\x1b[0m';
const fgRed = '\x1b[31m';
const fgYellow = '\x1b[33m';
const fgBlue = '\x1b[34m';

const logError = (/** @type {string[]} */ ...args) => {
  // biome-ignore lint/suspicious/noConsole: We use colored logs
  console.log(fgRed, ...args, fgReset);
};
const logWarn = (/** @type {string[]} */ ...args) => {
  // biome-ignore lint/suspicious/noConsole: We use colored logs
  console.log(fgYellow, ...args, fgReset);
};
const logDebug = (/** @type {string[]} */ ...args) => {
  // biome-ignore lint/suspicious/noConsole: We use colored logs
  console.log(fgBlue, ...args, fgReset);
};

const reinspectLog = (/** @type {string} */ log) =>
  log
    .replaceAll(/\[error\]/g, `${fgRed}[error]${fgReset}`)
    .replaceAll(/\[warn\]/g, `${fgYellow}[warn]${fgReset}`)
    .replaceAll(/\[debug\]/g, `${fgBlue}[debug]${fgReset}`);

const execAsync = util.promisify(exec);

const execCommand = (/** @type {string} */ command) =>
  execAsync(command)
    .catch((error) => error)
    // eslint-disable-next-line complexity
    .then(({ stdout, stderr }) => {
      if (stdout && stdout.length > 0) {
        process.stdout.write(reinspectLog(stdout));
      }
      if (stderr && stderr.length > 0) {
        process.stderr.write(reinspectLog(stderr));
        throw new Error('Error has exited');
      }
      if (
        stdout.includes('error') &&
        !stdout.includes('0 error') &&
        !stdout.includes('no error') &&
        !stdout.includes('No results')
      ) {
        throw new Error('Error has exited');
      }
      return undefined;
    });

export {
  logError as error,
  logWarn as warn,
  logDebug as debug,
  reinspectLog,
  exec,
  execAsync,
  execCommand,
  fgReset,
  fgRed
};
