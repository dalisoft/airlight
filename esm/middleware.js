export default (...middlewares) => {
  return async (res, req) => {
    let _middleware;
    for await (const middleware of middlewares) {
      _middleware = await middleware(req, res);

      if (_middleware === res) {
        res.close();
        break;
      }
    }
  };
};
