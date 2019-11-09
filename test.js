import test from "ava";
import { Server } from "./ws-events-sync";
import Events from "@dalisoft/events";

class fakeWsServer extends Events {
  get OPEN() {
    return "OPEN";
  }
  get CLOSED() {
    return "CLOSED";
  }
  get clients() {
    return new Array(5).fill(null).map(() => new Events()).map(ws => {
      ws.on('message', msg => console.log('sent to clients', msg))
      return ws;
    });
  }
  constructor() {
    super();

    setTimeout(() => {
      this.emit("connection");
    }, 100);

    this.readyState = this.OPEN;
  }
  send(data) {
    this.clients.forEach(client => {
      client.emit('message', data);
    });
  }
  close() {
    this.readyState = this.CLOSED;

    this.emit("close");
  }
}

test("Server API test - Basic features", t =>
  new Promise(resolve => {
    t.timeout(1000);
    t.plan(4);

    const wsWrapper = new Server(new fakeWsServer());

    wsWrapper.on("connection", () => t.pass('Connection passed'));
    wsWrapper.on("message", () => t.pass('Message passed'));
    wsWrapper.on("registered-callback", () => t.pass('Custom-callback passed'));
    wsWrapper.on("close", () => t.pass('Close passed'));

    wsWrapper.emit("registered-callback");
    wsWrapper.emit("message");

    setTimeout(() => {
      wsWrapper.close();
      resolve();
    }, 500);
  }));

test("Server API test - Should not error 'Excedding max'", t =>
  new Promise(resolve => {
    t.timeout(1000);
    t.plan(1);

    const ws = new fakeWsServer();
    const wsWrapper = new Server(ws);

    ws.on("close", () => {
      t.pass();
    })

    setTimeout(() => {
      wsWrapper.close();
      resolve();
    }, 500);
  }));
