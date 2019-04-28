import { verify } from 'jsonwebtoken';
import { decrypt } from './utils';

const verifyJWT = (
  token: string,
  secretOrPrivate: string | any,
  options?: object,
  encoded?: boolean,
) =>
  new Promise((resolve, reject) => {
    verify(
      encoded ? decrypt(secretOrPrivate, token) : token,
      secretOrPrivate,
      options,
      (err: any, res: string): string | any => {
        if (err) {
          return reject(err);
        }
        resolve(res);
      },
    );
  });

export { verifyJWT as verify };
