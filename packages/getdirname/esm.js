export default function getdirname(){
  try {
    throw new Error('__get__dirname__')
  } catch (e) {
    var currStackTrace = e.stack.split("at ")[2];
    var currStack = currStackTrace.match(/\((.*)\:[0-9]/);
    var matchCurrStack = currStack && currStack[1];

    var lastSlashIndex = matchCurrStack.lastIndexOf('/');
    var realdirname = matchCurrStack.substr(0, lastSlashIndex);

    return realdirname
  }
}
