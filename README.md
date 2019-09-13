# mobx-sync-storage

[![Greenkeeper badge](https://badges.greenkeeper.io/dalisoft/mobx-sync-storage.svg)](https://greenkeeper.io/)

Sync persist storage between Local/Session Storage and MobX

## Features

- Available both LocalStorage and SessionStorage
- Performant
- Good browsers support
- Easy

## Note

- Available only for Browsers
- Available only for ES6/Class supported browsers

## Installation

We recommend install via `npm` because of it's cache and flat node modules tree

```bash
npm i mobx-sync-storage
```

then you able to import to Node.js/Browser easily

```js
// Node.js
const SyncStore = require("mobx-sync-storage");

// Browser
// window.SyncStore OR SyncStore

// ES6
import SyncStore from "mobx-sync-storage";
```

## Usage

```ts
class Store extends SyncStore {
  @action myKey: string = "works?";
  constructor() {
    super("StoreName");
  }
}

const store = new Store();
store.myKey = "or no??";
```

## Known Bugs

### Webpack workaround

```js
// attach-mobx.ts
import { toJS, autorun } from 'mobx';

// These functions are needed for working properly
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).mobx = { toJS, autorun };
```

and then load created file. Should work as works for me too!

## Caveats

- `null` not work or converting not working properly
- Only Primite values works properly
- When you changing something in current tab, things will change into `current tab`, on other all tabs are Synced only when you visit to that tab

## License

MIT
