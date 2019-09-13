import test from "ava";
import SyncStore from ".";

test("Basic test", t => {
  class Store extends SyncStore {
    constructor() {
      super("store");
    }
  }

  t.throws(
    () => {
      const store = new Store();
    },
    "Module requires working Envoriment with Session and Local Storage",
    "Function not properly initialized"
  );
});
