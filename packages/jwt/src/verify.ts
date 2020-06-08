import {
  verify,
  VerifyOptions,
  VerifyErrors,
  GetPublicKeyOrSecret,
} from 'jsonwebtoken';
import { decrypt } from './utils';

const verifyJWT = (
  token: string,
  secretOrPrivate: GetPublicKeyOrSecret,
  options?: VerifyOptions,
  encoded?: boolean,
): Promise<string | object> =>
  new Promise(
    (resolve, reject): void =>
      verify(
        encoded ? decrypt(secretOrPrivate, token) : token,
        secretOrPrivate,
        options,
        (err: VerifyErrors, decoded: object | string): any => {
          if (err) {
            return reject(err);
          }
          resolve(decoded);
        },
      ),
  );

export { verifyJWT as verify };
