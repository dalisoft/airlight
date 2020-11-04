# cookie

Cookie utility for everyone

Note: _Requires Node.js framework Response and Request instance for some methods_

## Features

- Compatible with almost any Node.js framework
- Clean code
- Performant
- Easy
- UMD compatible

## Installation

We recommend install via `npm` because of it's cache and flat node modules tree

```bash
npm i @dalisoft/cookie
```

then you able to import to Node.js/Browser easily

```js
// Node.js
const Cookie = require('@dalisoft/cookie');

// Browser
// window.Cookie OR Cookie

// ES6
import Cookie from '@dalisoft/cookie';
```

## Methods

- _parse_ `(str: string): object` - Converts cookie string into object
- _stringify_ `(str: object): string` - Converts cookie object into string
- _getFromHeaders_ `(headers: Req.Headers): object` - Get cookie from header cokie field
- _set_ `(res: Response, key: string, value: any, options?: object): void` - Sets cookie
- remove `(res: Response, key: string, options?: object): void` - Remove cookie

## Usage

```js
app.get('/delete_cookie', (req, res) => {
  Cookie.set(res, 'deleted', true);
  Cookie.remove(res, 'public_cookie');
});
```

## License

MIT
