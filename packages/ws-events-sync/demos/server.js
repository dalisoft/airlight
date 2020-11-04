const Server = require('../node_modules/ws/lib/websocket-server');
const { Server: WSServerWrap } = require('../ws-events-sync');

const wsServer = new Server({ host: '0.0.0.0', port: 3001 });

let userId = 0;
wsServer.on('connection', (client) => {
  userId++;
  const clientWrapped = new WSServerWrap(client);

  clientWrapped.emit('connected', userId);

  clientWrapped.on('verified', (userId) => {
    console.log('User ID ', userId, ' was verified');
    clientWrapped.emit('user-data', { userId, time: new Date().toUTCString() });
  });
  clientWrapped.on('message', (data) => {
    console.log('Message got from client', '[', data, ']');
  });

  clientWrapped.on('close', () => {
    console.log('User ID ', userId, ' was closed');
    userId--;
  });
});
