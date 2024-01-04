// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-console */
import { exec } from 'node:child_process';
import util from 'node:util';

const fgReset = '\x1b[0m';
const fgRed = '\x1b[31m';
const fgYellow = '\x1b[33m';
const fgBlue = '\x1b[34m';

const logError = (...args) => {
  console.log(fgRed, ...args, fgReset);
};
const logWarn = (...args) => {
  console.log(fgYellow, ...args, fgReset);
};
const logDebug = (...args) => {
  console.log(fgBlue, ...args, fgReset);
};

const reinspectLog = (log) =>
  log
    .replaceAll(/\[error\]/g, `${fgRed}[error]${fgReset}`)
    .replaceAll(/\[warn\]/g, `${fgYellow}[warn]${fgReset}`)
    .replaceAll(/\[debug\]/g, `${fgBlue}[debug]${fgReset}`);

const execAsync = util.promisify(exec);

const execCommand = (command) =>
  execAsync(command)
    .catch((error) => error)
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
  // eslint-disable-next-line @typescript-eslint/naming-convention
  fgReset,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  fgRed
};
