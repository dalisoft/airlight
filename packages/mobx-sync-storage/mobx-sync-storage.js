const mobx = require('mobx');

function diff(tree, compare) {
  if (typeof tree !== 'object') {
    return tree !== compare;
  }
  if (Array.isArray(tree)) {
    return tree.some((item, index) => diff(item, compare[index]));
  }
  let different = false;
  for (let property in tree) {
    if (!different) {
      different = diff(tree[property], compare[property]);
    } else {
      break;
    }
  }
  return different;
}

class SyncStorage {
  constructor(name, store, storage) {
    this.name = name;
    this.store = store;

    this.initialized = false;

    if (
      typeof sessionStorage === 'undefined' ||
      typeof localStorage === 'undefined'
    ) {
      throw new Error(
        'Module requires Browser with Session and Local Storage support'
      );
    }

    this.storage = storage === 'localStorage' ? localStorage : sessionStorage;

    this.onRun = this.onRun.bind(this);

    this.attachAutoRun();

    return this;
  }
  onDetach() {
    if (this.autorun) {
      this.autorun();
    }
    window.removeEventListener('storage', this.onRun);
  }
  attachAutoRun() {
    if (mobx && mobx.autorun) {
      this.autorun = mobx.autorun(this.onRun);
    } else {
      console.error(
        '[MobX-Sync-Storage]: MobX was not loaded at Window-level, so please load first to be working properly'
      );
    }

    window.addEventListener('storage', this.onRun);
  }
  onRun(argument) {
    const { name, store, storage, initialized } = this;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isStorageChanged = argument.key === name;
    const storeState = mobx.toJS(store);
    let mixedState = null;
    let session = storage.getItem(name)
      ? store.deserialize
        ? store.deserialize(storage.getItem(name))
        : JSON.parse(storage.getItem(name))
      : null;

    if (session && store.onSessionRestore) {
      store.onSessionRestore(session);
    }

    if (session && !diff(session, storeState)) {
      if (store.onSessionUnchanged) {
        store.onSessionUnchanged(storeState);
      }
    } else {
      mixedState = session
        ? initialized && !isStorageChanged
          ? Object.assign(session, storeState)
          : Object.assign(storeState, session)
        : storeState;
    }

    if (mixedState) {
      storage.setItem(
        name,
        store.serialize
          ? store.serialize(mixedState)
          : JSON.stringify(mixedState)
      );

      if (store.onSessionSaved) {
        store.onSessionSaved(mixedState, storeState, session);
      }

      Object.assign(store, mixedState);
    }
    if (!initialized) {
      this.initialized = true;
    }
  }
}

class Store {
  constructor(name, type) {
    new SyncStorage(name, this, type);
    return this;
  }
}

module.exports = Store;

// For Using as ES6 Module
exports.default = Store;
exports.__esModule = true;
