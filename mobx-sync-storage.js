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
        "Module requires working Envoriment with Session and Local Storage"
      );
    }

    if (typeof mobx === "undefined" || typeof window.mobx === "undefined") {
      throw new Error("MobX is not loaded, please install MobX first");
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
    this.autorun = window.mobx.autorun(this.onRun);
    window.addEventListener("storage", this.onRun);
  }
  onRun(argument) {
    const { name, store, storage, initialized } = this;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isStorageChanged = argument.key === name;
    const storeState = window.mobx.toJS(store);
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
    this.secureStorage = new SyncStorage(name, this);
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
