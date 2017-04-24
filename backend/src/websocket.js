import { save } from './controller/note';

const activeSockets = {};

export default (io) => {
  // TODO really using the rest interface to update data should trigger all websockets to send out new data... but you know...
  io.sockets.on('connection', (socket) => {
    activeSockets[socket.id] = socket;
    // socket.emit('news', { hello: 'world' });
    socket.on('post', (data) => {
      const { id, notes } = data;
      save(id, notes);
      Object.keys(activeSockets)
        .filter(socketId => socketId !== socket.id)
        .map(socketId => activeSockets[socketId])
        .forEach(otherSocket => otherSocket.emit('load', { id, notes }));
    });
    socket.on('disconnect', () => {
      delete activeSockets[socket.id];
    });
  });
};
