export default () => {
  return (res, req) => {
    if (req.body) {
      req.pipe = stream => {
        stream.write(req.body);
        stream.end();
      };
    } else {
      req.pipe = stream => req.stream.pipe(stream);
    }
  };
};
