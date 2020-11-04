import nodeWebToken from 'node-webtokens';

const decodeJWE = (token, key) =>
  new Promise((resolve, reject) => {
    nodeWebToken.parse(token).verify(key, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      resolve(decoded);
    });
  });

export { decodeJWE as decode };
