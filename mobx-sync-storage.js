import { toJS, autorun } from "mobx";

class SyncStorage {
  constructor(name, store, storage = "sessionStorage") {
    this.name = name;
    this.store = store;

    this.initialized = false;

    if (
      typeof sessionStorage === "undefined" ||
      typeof localStorage === "undefined"
    ) {
      throw new Error(
        "Module requires Browser with Session and Local Storage support"
      );
    }

    this.storage = storage === "sessionStorage" ? sessionStorage : localStorage;

    this.onRun = this.onRun.bind(this);

    this.attachAutoRun();

    return this;
  }
  onDetach() {
    if (this.autorun) {
      this.autorun();
    }
    window.removeEventListener("storage", this.onRun);
  }
  attachAutoRun() {
    if (autorun) {
      this.autorun = autorun(this.onRun);
    } else {
      console.error(
        "[MobX-Sync-Storage]: MobX was not loaded at Window-level, so please load first to be working properly"
      );
    }

    window.addEventListener("storage", this.onRun);
  }
  onRun(argument) {
    const { name, store, storage, initialized } = this;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isStorageChanged = argument.key === name;
    const storeState = toJS(store);
    let mixedState = null;
    let session = storage.getItem(name)
      ? JSON.parse(storage.getItem(name))
      : null;

    mixedState = session
      ? initialized && !isStorageChanged
        ? Object.assign(session, storeState)
        : Object.assign(storeState, session)
      : storeState;

    if (mixedState) {
      storage.setItem(name, JSON.stringify(mixedState));
      Object.assign(store, mixedState);
    }
    if (!initialized) {
      this.initialized = true;
    }
  }
}

export default class Store {
  constructor(name) {
    new SyncStorage(name, this);
    return this;
  }
}
