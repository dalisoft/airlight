export default function getdirname(){
  try {
    throw new Error('__get__dirname__')
  } catch (e) {
    const currStackTrace = e.stack.split("at ")[2];

    const lastSlashIndex = currStackTrace.lastIndexOf('/');
    const realdirname = currStackTrace.substr(0, lastSlashIndex);

    return realdirname.replace('file://', '')
  }
}
