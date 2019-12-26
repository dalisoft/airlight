const reqBodyPipe = function reqBodyPipe(stream) {
  stream.write(this.body);
  stream.end();
  return stream;
};
const reqPipe = function reqPipe(stream) {
  this.stream.pipe(stream);
  return stream;
};

export default ({ req: request = true, res: response = true } = {}) => {
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
