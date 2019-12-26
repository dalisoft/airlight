export default ({ req: request = true, res: response = true } = {}) => {
  function reqBodyPipe(stream) {
    stream.write(this.body);
    stream.end();
    return stream;
  }
  function reqPipe(stream) {
    this.stream.pipe(stream);
    return stream;
  }
  return (res, req) => {
    if (request && req.body) {
      req.pipe = reqBodyPipe;
    } else if (request && req.stream) {
      req.pipe = reqPipe;
    }
    if (response) {
      //
    }
  };
};
