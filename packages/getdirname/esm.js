export default function getdirname() {
  try {
    throw new Error('__get__dirname__');
  } catch (e) {
    const currStackTrace = e.stack.split('at ');

    let stackTraceRun = currStackTrace.shift();
    while (true) {
      if (currStackTrace[0].indexOf('file://') !== -1) {
        stackTraceRun = currStackTrace.shift();
      } else {
        break;
      }
    }

    if (!stackTraceRun) {
      return null;
    }

    const lastSlashIndex = stackTraceRun.lastIndexOf('/');

    if (lastSlashIndex !== -1) {
      const realdirname = stackTraceRun.substr(0, lastSlashIndex);
      return realdirname.replace('file://', '');
    }
  }

  return null;
}
