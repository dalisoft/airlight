export default (...middlewares) => {
  return async (res, req) => {
    let isAborted = false;
    res.onAborted(() => {
      isAborted = true;
    });

    let _middleware;
    for await (const middleware of middlewares) {
      if (isAborted) {
        break;
      }

      _middleware = await middleware(res, req);

      if (_middleware === res) {
        break;
      }
    }
  };
};
