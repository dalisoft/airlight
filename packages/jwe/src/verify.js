import nodeWebToken from 'node-webtokens';

const verifyJWE = (token, key) =>
  new Promise((resolve, reject) => {
    nodeWebToken.parse(token).verify(key, (err, result) => {
      const validExpiration =
        result && result.payload
          ? Number(result.payload.exp - Math.floor(Date.now() / 1000)) > 0
          : true;
      if (!validExpiration) {
        const tokenExpiredError = new Error('Token expired');
        tokenExpiredError.code = 'TokenExpiredError';
        return reject(tokenExpiredError);
      }
      if (!result.valid) {
        const validationError = new Error('Validation error');
        validationError.code = 'ValidationError';
        return reject(validationError);
      }
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });

export { verifyJWE as verify };
