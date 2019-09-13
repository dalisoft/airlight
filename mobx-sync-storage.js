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
    let autorun;
    if (typeof mobx !== "undefined") {
      autorun = mobx.autorun;
    } else if (typeof window !== "undefined" && window.mobx) {
      autorun = window.mobx.autorun;
    } else if (typeof require !== "undefined" && require("mobx")) {
      autorun = require("mobx").autorun;
    }
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
    const storeState = Object.assign({}, store);
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

class Store {
  constructor(name) {
    new SyncStorage(name, this);
    return this;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Store;
} else if (typeof window !== "undefined") {
  window.SyncStore = SyncStore;
} else if (typeof exports !== "undefined") {
  exports.default = Store;
  exports.__esModule = true;
}
