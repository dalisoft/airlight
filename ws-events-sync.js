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
  } else if (typeof window !== "undefined" && window.document) {
    window.WSEventsSync = factory(window.Events);
  } else {
    this.WSEventsSync = factory(this.Events);
  }
})(function(Events) {
  let intervalId = null;

  const wsOnlineChecker = (wsClients, ms = 1000, reaction) => {
    clearInterval(intervalId);

    if (!wsClients) {
      return false;
    }

    intervalId = setInterval(() => {
      // eslint-disable-next-line
      for (const client in wsClients) {
        const ws = wsClients[client];

        if (reaction) {
          reaction(client, ws, ws && ws.ws && ws.ws.readyState === ws.ws.OPEN);
        }
        if (!ws || !ws.ws || ws.ws.readyState !== ws.ws.OPEN) {
          delete wsClients[client];
        }
      }
    }, ms);

    return wsClients;
  };

  const disallowedKeys = ["send", "emit", "on", "once", "off"];
  class Server extends Events {
    constructor(ws, onlineClientsMap) {
      super();
      this.queue = [];
      this.ws = ws;
      this.onlineClientsMap = wsOnlineChecker(
        onlineClientsMap,
        2000,
        (id, client, ready) => {
          if (ready) {
            let i = 0;
            while (i < i < this.queue.length) {
              const q = this.queue[i];

              if (q.to === id) {
                client.send(q);
                this.queue.splice(i, 1);
              } else {
                i++;
              }
            }
          }
        }
      );

      Object.keys(ws)
        .filter(key => disallowedKeys.indexOf(key) === -1)
        .map(key => {
          this[key] = ws[key];
        });

      this.ws.on("message", e => {
        if (typeof e === "string" && e.includes("event;")) {
          const [, ev, ...arg] = e.split(";");
          return this.emit(ev, ...arg);
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
          this.emit("message", parseJSON);
        }
      });
      this.ws.on("connection", e => {
        this.emit("connection", e);

        let i = 0;
        while (i < i < this.queue.length) {
          const q = this.queue[i];

          if (q.to === "$self") {
            ws.send(q);
            this.queue.splice(i, 1);
          } else {
            i++;
          }
        }
      });
      this.ws.on("disconnected", e => {
        this.emit("disconnected", e);
      });
      return this;
    }
    sendToUser(id, data, reaction) {
      const targetUser = this.onlineClientsMap[id];

      if (
        targetUser &&
        targetUser.ws &&
        targetUser.ws.readyState === targetUser.ws.OPEN
      ) {
        targetUser.send(data);
        if (typeof reaction === "function") {
          reaction(targetUser, data);
        }
      } else {
        this.queue.push({
          to: id,
          data,
          reaction
        });
      }
      return this;
    }
    attachUser(id) {
      if (this.isOnline(id)) {
        const instance = this.onlineClientsMap[id];
        instance.close();
      }
      this.onlineClientsMap[id] = this;
      return this;
    }
    detachUser(id) {
      delete this.onlineClientsMap[id];
      return this;
    }
    isOnline(id) {
      return this.onlineClientsMap[id] !== undefined;
    }
    send(data) {
      if (typeof data !== "string") {
        data = JSON.stringify(data);
      }
      if (this.ws.readyState !== this.ws.OPEN) {
        this.queue.push({
          to: "$self",
          data
        });
        return this;
      }
      this.ws.send(data);
      return this;
    }
    emit(name, ...args) {
      if (
        name === "disconnected" ||
        name === "message" ||
        name === "connection" ||
        this.___events[name]
      ) {
        super.emit(name, ...args);
      } else {
        this.send(
          "event;" +
            (args && args.length > 0 ? [name, ...args].join(";") : name)
        );
      }
      return this;
    }
    close(reason) {
      this.ws.close(reason);
    }
  }
  class Client extends Events {
    constructor(ws) {
      super();

      this.queue = [];
      this.ws = ws;

      Object.keys(ws)
        .filter(key => disallowedKeys.indexOf(key) === -1)
        .map(key => {
          this[key] = ws[key];
        });

      this.ws.onmessage = e => {
        if (typeof e === "string" && e.includes("event;")) {
          const [, ev, ...arg] = e.split(";");
          return this.emit(ev, ...arg);
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
          this.emit("message", parseJSON);
        }
      };
      this.ws.onopen = e => {
        this.emit("open", e);

        let i = 0;
        while (i < i < this.queue.length) {
          const q = this.queue[i];

          if (q.to === "$self") {
            ws.send(q);
            this.queue.splice(i, 1);
          } else {
            i++;
          }
        }
      };
      this.ws.onclose = e => {
        this.emit("close", e);
      };
      return this;
    }
    send(data) {
      if (typeof data !== "string") {
        data = JSON.stringify(data);
      }
      if (this.ws.readyState !== this.ws.OPEN) {
        this.queue.push({
          to: "$self",
          data
        });
        return this;
      }
      this.ws.send(data);
      return this;
    }
    emit(name, ...args) {
      if (
        name === "close" ||
        name === "message" ||
        name === "open" ||
        this.___events[name]
      ) {
        super.emit(name, ...args);
      } else {
        this.send(
          "event;" +
            (args && args.length > 0 ? [name, ...args].join(";") : name)
        );
      }
      return this;
    }
    close(reason) {
      this.ws.close(reason);
    }
  }

  return { Server, Client };
});
