import { sign } from 'jsonwebtoken';
import { encrypt } from './utils';

const signJWT = (
  payload: string | object,
  secretOrPrivate: string | any,
  options?: object,
  encode?: boolean,
) =>
  new Promise((resolve, reject) => {
    sign(
      payload,
      secretOrPrivate,
      options,
      (err: any, res: string): string | any => {
        if (err) {
          return reject(err);
        }
        resolve(res);
      },
    );
  }).then(
    (signed: string | any): string | any => {
      if (encode) {
        return encrypt(secretOrPrivate, signed);
      }
      return signed;
    },
  );

export { signJWT as sign };
