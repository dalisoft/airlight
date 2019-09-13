import SyncStorage from "./mobx-sync-storage.es";

class Store {
  constructor(name) {
    this.secureStorage = new SyncStorage(name, this);
    return this;
  }
}

export default Store;
