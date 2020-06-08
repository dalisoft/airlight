import { parse } from "node-webtokens";

const decodeJWE = (token, key) =>
  new Promise((resolve, reject) => {
    parse(token).verify(key, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      resolve(decoded);
    });
  });

export { decodeJWE as decode };
