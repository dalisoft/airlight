import { decode } from 'jsonwebtoken';
import { decrypt } from './utils';

const decodeJWT = (
  token: string,
  secretOrPrivate?: string | null,
  options?: object,
  encoded?: boolean,
) =>
  decode(
    encoded && secretOrPrivate ? decrypt(secretOrPrivate, token) : token,
    options,
  );

export { decodeJWT as decode };
