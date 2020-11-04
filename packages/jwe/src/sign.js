import nodeWebToken from 'node-webtokens';

const signJWE = (payload, key, options = {}) =>
  new Promise((resolve, reject) => {
    if (options.expiresIn) {
      let exp = options.expiresIn;
      const time = Math.floor(Date.now() / 1000);

      if (exp > time * 10) {
        exp = Math.floor(exp / 1000);
      } else {
        exp = time + exp;
      }

      payload.exp = exp;
    }
    nodeWebToken.generate(
      options.alg || 'PBES2-HS512+A256KW',
      options.enc || 'A256CBC-HS512',
      payload,
      key,
      (err, token) => {
        if (err) {
          return reject(err);
        }
        resolve(token);
      }
    );
  });

export { signJWE as sign };
