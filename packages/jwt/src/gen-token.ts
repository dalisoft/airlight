import randToken from 'rand-token';
import { GetPublicKeyOrSecret, Secret, SignOptions } from 'jsonwebtoken';
import { sign } from './sign';
import { decode } from './decode';
import { encrypt, decrypt } from './utils';

declare module 'rand-token' {
  export function uid(size: number): string;
}

interface SecureMapInterface {
  [key: string]: any;
}
const secureMap: SecureMapInterface = {
  S128: true,
  S96: false
};
const secureVal = (v: boolean | undefined): string =>
  v ? 'S128' : v === false ? 'S96' : 'S32';

async function generateToken(
  payload: string | object,
  secretOrPrivate: Secret,
  options?: SignOptions,
  secure?: boolean,
  salt?: string
) {
  const accessToken = await sign(payload, secretOrPrivate, options, secure);
  const head = (await sign(payload, secretOrPrivate, options)).split('.')[0];

  const refreshToken = secure
    ? `${head}.${encrypt(
        secretOrPrivate,
        randToken.uid(64) as string
      )}.${secureVal(secure)}`
    : `${head}.${randToken.uid(64) as string}.${secureVal(secure)}`;

  return {
    accessToken,
    refreshToken,
    publicKey: salt
      ? encrypt(`${refreshToken}.${salt}`, secretOrPrivate as any)
      : null
  };
}

interface OKS {
  [key: string]: string;
}

async function refreshToken({
  accessToken,
  publicKey,
  salt,
  refreshToken,
  privateKey: privateKeyManual
}: OKS) {
  if (!salt && publicKey) {
    return null;
  }

  const secureCheck = refreshToken.split('.').pop() as unknown;
  const isSecure = secureMap[secureCheck as any];
  let privateKey: GetPublicKeyOrSecret =
    publicKey && (decrypt(`${refreshToken}.${salt}`, publicKey) as any);
  const decoded: any = decode(
    accessToken,
    privateKey,
    { complete: true },
    isSecure
  );
  let payloadPeriod = decoded.payload.exp - decoded.payload.iat;

  if (payloadPeriod <= 0) {
    console.error(
      '@dalisoft/jwt [RefreshToken]: The old JWT token period is negative' +
        ' or zero, we normalize it is to good value, at least is 100'
    );
    payloadPeriod = 100;
  }

  delete decoded.payload.exp;
  delete decoded.payload.iat;

  if (!privateKey) {
    privateKey = privateKeyManual as any;
  }

  return generateToken(
    decoded.payload,
    privateKey as any,
    {
      expiresIn: payloadPeriod
    },
    isSecure,
    salt
  );
}

export { generateToken, refreshToken };
