# ws-events-sync

## Under development and in alpha release, please don't use this in production

[![Greenkeeper badge](https://badges.greenkeeper.io/dalisoft/ws-events-sync.svg)](https://greenkeeper.io/)

Event sync between server and client in Websocket

## Features

- Node.js wrapper
- Browser wrapper
- Fast
- Performant
- Easy
- UMD compatible

## Installation

We recommend install via `npm` because of it's cache and flat node modules tree

```bash
npm i @dalisoft/ws-events-sync
```

then you able to import to Node.js/Browser easily

```js
// Node.js
const WSEventsWrapper = require("@dalisoft/ws-events-sync").Server;

// Browser
// window.WSEventsSync.Client OR WSEventsSync.Client

// ES6
import { Client /* Server */ } from "@dalisoft/ws-events-sync";
```

## Usage

```js
// Client
const ws = new Websocket("ws://{WEBSOCKET_URL}");
const wsc = new Client(ws);

wsc.emit("server-event", {
  type: "ping"
});
wsc.on("client-event", data => console.log("client event emitter", data));

// Server
const ws = new WSServer();

ws.on("connection", client => {
  const wss = new Server(client);

  wss.emit("client-event", {
    type: "pong"
  });
  wss.on("server-event", data => console.log("server event emitter", data));
});
```

## License

MIT
