# ws-events-sync

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
const WSEventsWrapper = require('@dalisoft/ws-events-sync').Server;

// Browser
// window.WSEventsSync.Client OR WSEventsSync.Client

// ES6
import { Client /* Server */ } from '@dalisoft/ws-events-sync';
```

## Usage

```js
// Client
const ws = new Websocket('ws://{WEBSOCKET_URL}');
const wsc = new Client(ws);

wsc.emit('server-event', {
  type: 'ping'
});
wsc.on('client-event', (data) => console.log('client event emitter', data));

// Server
const ws = new WSServer();

ws.on('connection', (client) => {
  const wss = new Server(client);

  wss.emit('client-event', {
    type: 'pong'
  });
  wss.on('server-event', (data) => console.log('server event emitter', data));
});
```

## Browser snippet

Add this script into your before script and after body to be this library working out-of-the-box.

Thanks to jsDelivr!

```html
<script src="https://cdn.jsdelivr.net/combine/npm/@dalisoft/args,npm/@dalisoft/events,npm/@dalisoft/ws-events-sync"></script>
```

## License

MIT
