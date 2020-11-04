module.exports = function getdirname() {
  try {
    throw new Error('__get__dirname__');
  } catch (e) {
    var currStackTrace = e.stack.split('at ');

    var stackTraceRun = currStackTrace.shift();
    while (true) {
      if (currStackTrace[0].indexOf(' (/') !== -1) {
        stackTraceRun = currStackTrace.shift();
      } else {
        break;
      }
    }

    if (!stackTraceRun) {
      return null;
    }

    var lastSlashIndex = stackTraceRun.lastIndexOf('/');
    var firstBrace = stackTraceRun.indexOf(' (/');

    if (firstBrace !== -1 && lastSlashIndex !== -1) {
      firstBrace += 2;
      var realdirname = stackTraceRun.substr(
        firstBrace,
        lastSlashIndex - firstBrace
      );
      return realdirname;
    }
  }

  return null;
};
