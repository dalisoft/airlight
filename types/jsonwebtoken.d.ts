export class JsonWebTokenError {
  constructor(message: any, error: any);
  name: any;
  message: any;
  inner: any;
}
export class NotBeforeError {
  constructor(message: any, date: any);
  name: any;
  date: any;
}
export class TokenExpiredError {
  constructor(message: any, expiredAt: any);
  name: any;
  expiredAt: any;
}
export function decode(jwt: any, options: any): any;
export function sign(payload: any, secretOrPrivateKey: any, options: any, callback: any): any;
export function verify(jwtString: any, secretOrPublicKey: any, options: any, callback: any): any;
