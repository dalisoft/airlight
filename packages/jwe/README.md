# JWE

JWE Helper for Auth building from scratch

## Features

- Fast
- Zero-config
- Well tested
- Good security

## Import

```js
// ES6
import { sign, verify, decode } from '@dalisoft/jwe';

// or

// CommonJS
const JWE = require('@dalisoft/jwe');
```

## Example

```ts
const { sign, verify, decode } = JWE;

const token = await sign(payload: object, secret: string | any, options: object): string;
```

For more info see tests.

## Methods

### `#sign(payload: object, secret: string | any, options: object): string`

Returns value of signed (+ maybe secured) token

### `#verify(token: string, secret: string | any, options: object): object | null`

Returns value of signed (+ maybe secured) token

### `#decode(token: string, secret: string | any, options: object): object | null`

Decodes value of signed (+ maybe secured) token without needing verifying signature

## License

MIT
