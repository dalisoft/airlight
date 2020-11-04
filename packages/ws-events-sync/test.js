const test = require('ava');
const { Server, Client } = require('.');

const http = require('http');
const Websocket = require('ws');
const W3CWebSocket = require('websocket');

const createServer = () =>
  http.createServer((req, res) => {
    res.write('server test');
    res.end();
  });

test('WebSocket.Server test', (t) =>
  new Promise((resolve) => {
    t.timeout(150);
    t.plan(3);

    const server = createServer();
    const ws = new Websocket.Server({
      server,
      path: '/ws'
    });

    ws.on('connection', (ws) => {
      const wsWrapper = new Server(ws);

      wsWrapper.m;

      t.pass('Connection passed');

      wsWrapper.on('message', (data) => {
        t.is(
          data,
          'client_message',
          'Message did not match to text from client'
        );
      });
      ws.on('close', () => {
        t.pass('Close passed');

        server.close();
        resolve();
      });

      wsWrapper.send('sent to client');
    });

    server.listen(11115, () => {
      const { port } = server.address();

      const client = new W3CWebSocket.w3cwebsocket(`ws://localhost:${port}/ws`);

      client.onopen = () => {
        client.send('client_message');
      };

      setTimeout(() => {
        client.close();
      }, 100);
    });
  }));

test('WebSocket.Client test', (t) =>
  new Promise((resolve) => {
    t.timeout(150);
    t.plan(3);

    const server = createServer();
    const ws = new Websocket.Server({
      server,
      path: '/ws'
    });

    ws.on('connection', (ws) => {
      ws.send('server_message');
    });

    server.listen(11156, () => {
      const { port } = server.address();

      const client = new W3CWebSocket.w3cwebsocket(`ws://localhost:${port}/ws`);
      const wsClient = new Client(client);

      wsClient.on('open', () => {
        t.pass('Connection passed');
        client.send('client_message');
      });

      wsClient.on('message', (message) => {
        t.is(
          message,
          'server_message',
          'Message did not match to text from server'
        );
      });

      wsClient.on('close', () => {
        t.pass('Close passed');
        server.close();
        resolve();
      });

      setTimeout(() => {
        ws.close();
      }, 100);
    });
  }));
