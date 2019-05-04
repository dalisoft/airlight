import test from "ava";
import { Server } from "./ws-events-sync";
import Events from "@dalisoft/events";

class fakeWsServer extends Events {
  constructor() {
    super();

    setTimeout(() => {
      this.emit("connection");
    }, 100);
  }
  get readyState() {
    return "OPEN";
  }
  get OPEN() {
    return "OPEN";
  }
  get clients() {
    return new Array(5).fill(null).map(() => new Events());
  }
  send(data) {
    this.clients.forEach(client => {
      client.ws.onmessage(data);
    });
  }
  close() {
    this.emit("close");
  }
}

test("Server API test - Basic features", t =>
  new Promise(resolve => {
    t.timeout(1000);
    t.plan(4);

    const wsWrapper = new Server(new fakeWsServer());

    wsWrapper.on("connection", () => t.pass());
    wsWrapper.on("message", () => t.pass());
    wsWrapper.on("registered-callback", () => t.pass());
    wsWrapper.on("close", () => t.pass());

    wsWrapper.emit("registered-callback");
    wsWrapper.emit("message");

    setTimeout(() => {
      wsWrapper.close();
      resolve();
    }, 500);
  }));
