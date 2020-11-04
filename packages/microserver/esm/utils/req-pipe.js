export const bodyPipe = function reqBodyPipe(stream) {
  stream.write(this.body);
  stream.end();
  return stream;
};

export const pipe = function reqPipe(stream) {
  this.stream.pipe(stream);
  return stream;
};
