export const useConnectMiddleware = (middleware) => {
  return (res, req) =>
    new Promise((resolve) =>
      middleware(req, res, (err, done) => {
        if (err) {
          res.end(JSON.stringify({ message: err.message, code: err.code }));
          return resolve(res);
        }
        if (done !== false) {
          return resolve();
        }
        return undefined;
      })
    );
};
