# JWT

JWT Helper for Auth building from scratch

Note: _Minimum `Node.js` version is `v10.5` for working properly_

## Features

- Fast
- Almost zero-config
- Auto-refresh token
- Auto-normalisation of period/expiration
- Types declaration for IDE/Editor
- Well tested

## Import

```js
// ES6
import {
  sign,
  verify,
  decode,
  generateToken,
  refreshToken
} from '@dalisoft/jwt';

// or

// CommonJS
const JWT = require('@dalisoft/jwt');
```

## Example

```ts
const { sign, verify, decode, generateToken, refreshToken } = JWT;

const token = await sign(payload: object, secret: string | any, options: object, isSecure: boolean): string;
```

For more info see tests.

## Methods

### `#sign(payload: object, secret: string | any, options: object, isSecure: boolean): string`

Returns value of signed (+ maybe secured) token

### `#verify(token: string, secret: string | any, options: object): object | null`

Returns value of signed (+ maybe secured) token

### `#decode(token: string, secret: string | any, options: object): object | null`

Decodes value of signed (+ maybe secured) token without needing verifying signature

### `#generateToken(payload: string | object, secretOrPrivate: string | any, options?: object, secure?: boolean, salt?: string)`

Generates token and returns `accessToken` and `refreshToken`

### `#refreshToken({ accessToken, publicKey, salt refreshToken, privateKey,}: OKS)`

Generates new token by refreshing token and returns `accessToken` and `refreshToken`

## License

MIT
