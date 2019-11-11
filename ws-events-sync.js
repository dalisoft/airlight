(function(factory) {
  if (typeof define === "function" && define.amd) {
    define(["@dalisoft/events"], factory);
  } else if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(require("@dalisoft/events"));
  } else if (typeof exports !== "undefined") {
    const { Server, Client } = factory(
      exports.Events || require("@dalisoft/events")
    );
    exports.Server = Server;
    exports.Client = Client;
    exports.__esModule = true;
  } else if (typeof self !== "undefined") {
    self.WSEventsSync = factory(self.Events);
    self.WSEventsSync.__esModule = true;
  } else if (typeof window !== "undefined" && window.document) {
    window.WSEventsSync = factory(window.Events);
    window.WSEventsSync.__esModule = true;
  } else {
    this.WSEventsSync = factory(this.Events);
    this.WSEventsSync.__esModule = true;
  }
})(function(Events) {
  const disallowedKeys = ["send", "emit", "on", "once", "off"];
  class Server extends Events {
    constructor(ws, enableQueue) {
      super();

      this.enableQueue = enableQueue;
      this.queue = enableQueue ? [] : null;
      this.ws = ws;

      Object.keys(ws)
        .filter(key => disallowedKeys.indexOf(key) === -1)
        .map(key => {
          this[key] = ws[key];
        });

      this.ws.on("message", e => {
        if (typeof e === "string") {
          if (e === "ping") {
            return this.pong();
          } else if (e === "pong") {
            return this.emit("pong");
          } else if (e.includes("event;")) {
            const [, ev, ...arg] = e.split(";");
            return super.emit(ev, ...arg);
          } else {
            return super.emit("message", e);
          }
        }
        let parseJSON;
        try {
          parseJSON = JSON.parse(e);
        } catch (err) {
          this.send({
            status: "error",
            data: err,
            reason: "JSON parse failed"
          });
          return;
        }
        if (parseJSON) {
          super.emit("message", parseJSON);
        }
      });

      if (enableQueue) {
        let i = 0;
        while (i < this.queue.length) {
          ws.send(this.queue[i]);
          this.queue.splice(i, 1);
        }
      }
      return this;
    }
    ping() {
      if (this.ws.readyState === this.ws.OPEN) {
        this.ws.send("ping");
      }
    }
    pong() {
      if (this.ws.readyState === this.ws.OPEN) {
        this.ws.send("pong");
      }
    }
    send(data) {
      if (typeof data !== "string") {
        data = JSON.stringify(data);
      }
      if (this.enableQueue && this.ws.readyState !== this.ws.OPEN) {
        this.queue.push(data);
        return this;
      }
      this.ws.send(data);
      return this;
    }
    emit(name, ...args) {
      this.send(
        "event;" +
          (args && args.length > 0
            ? [name, ...args.map(JSON.stringify)].join(";")
            : name)
      );
      return this;
    }
    close(reason) {
      this.ws.close();
    }
  }
  class Client extends Events {
    constructor(ws, enableQueue) {
      super();

      this.enableQueue = enableQueue;
      this.queue = enableQueue ? [] : null;
      this.ws = ws;

      Object.keys(ws)
        .filter(key => disallowedKeys.indexOf(key) === -1)
        .map(key => {
          this[key] = ws[key];
        });

      this.ws.onmessage = e => {
        if (typeof e !== "string") {
          e = e.data;
        }
        if (typeof e === "string") {
          if (e === "ping") {
            return this.pong();
          } else if (e === "pong") {
            return this.emit("pong");
          } else if (e.includes("event;")) {
            const [, ev, ...arg] = e.split(";");
            return super.emit(ev, ...arg);
          } else {
            return super.emit("message", e);
          }
        }
        let parseJSON;
        try {
          parseJSON = JSON.parse(e);
        } catch (err) {
          this.send({
            status: "error",
            data: err,
            reason: "JSON parse failed"
          });
          return;
        }
        if (parseJSON) {
          super.emit("message", parseJSON);
        }
      };
      this.ws.onopen = e => {
        super.emit("open", e);

        if (enableQueue) {
          let i = 0;
          while (i < this.queue.length) {
            ws.send(this.queue[i]);
            this.queue.splice(i, 1);
          }
        }
      };
      this.ws.onerror = e => {
        super.emit("error", e);
      };
      this.ws.onclose = e => {
        super.emit("close", e);
      };
      return this;
    }
    ping() {
      if (this.ws.readyState === this.ws.OPEN) {
        this.ws.send("ping");
      }
    }
    pong() {
      if (this.ws.readyState === this.ws.OPEN) {
        this.ws.send("pong");
      }
    }
    send(data) {
      if (typeof data !== "string") {
        data = JSON.stringify(data);
      }
      if (this.enableQueue && this.ws.readyState !== this.ws.OPEN) {
        this.queue.push(data);
        return this;
      }
      this.ws.send(data);
      return this;
    }
    emit(name, ...args) {
      this.send(
        "event;" +
          (args && args.length > 0
            ? [name, ...args.map(JSON.stringify)].join(";")
            : name)
      );
      return this;
    }
    close(reason) {
      this.ws.close(reason);
    }
  }

  return { Server, Client };
});
