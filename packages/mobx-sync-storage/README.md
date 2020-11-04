# mobx-sync-storage

Sync persist storage between Local/Session Storage and MobX

## Features

- Available both LocalStorage and SessionStorage
- Performant
- Easy

## Note

- Available only for ES6 & Class supported browsers

## Installation

We recommend install via `npm` because of it's cache and flat node modules tree

```bash
npm i mobx-sync-storage
```

then you able to import to Node.js/Browser easily

```js
// only ES6 or Browser ES6 Module loading works
import SyncStore from 'mobx-sync-storage';

// or CJS
const SyncStore = require('mobx-sync-storage');
```

## Usage

```ts
interface MyStoreInterface {
  myKey: string;
}
class Store extends SyncStore implements MyStoreInterface {
  public @observable myKey = "works?";
  constructor() {
    super("StoreName", "localStorage" /* or nothing for sessionStorage */);
  }
  public onSessionRestore(session) {
    // do something
  }
}

const store = new Store();
store.myKey = "or no??";
```

and then load created file. Should work as works for me too!

## Lifecycles

- onSessionRestore(session?: DeserializedSession)
- onSessionSaved(merged?: MergedSession, store?: StoreProperties, session?: DeserializedSession)
- onSessionUnchanged(store?: StoreProperties)

## Methods

- deserialize
- serialize

## Caveats

- `null` not work or converting not working properly
- Only Primitive values works properly
- When you changing something in current tab, things will change into `current tab`, all others tab keep their state, for `localStorage`, things will change only you visit to that tab
- When you using `localStorage` on 2+ tabs, latest changes may bypass previous change by force-pushing changes and you may lose prev-last state

## License

MIT
