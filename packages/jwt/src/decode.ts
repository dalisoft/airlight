import { decode, DecodeOptions, GetPublicKeyOrSecret } from 'jsonwebtoken';
import { decrypt } from './utils';

const decodeJWT = (
  token: string,
  secretOrPrivate: GetPublicKeyOrSecret,
  options?: DecodeOptions | undefined,
  encoded?: boolean
): object | string | null =>
  decode(
    encoded && secretOrPrivate ? decrypt(secretOrPrivate, token) : token,
    options
  );

export { decodeJWT as decode };
