import { save } from './controller/note';

const activeSockets = {};

export default (io) => {
  // TODO really using the rest interface to update data should trigger all websockets to send out new data... but you know...
  io.sockets.on('connection', (socket) => {
    activeSockets[socket.id] = { noteId: '', socket };
    // socket.emit('news', { hello: 'world' });
    socket.on('setId', (noteId) => {
      activeSockets[socket.id].noteId = noteId;
    });
    socket.on('post', (data, fn) => {
      const { id, notes } = data;
      save(id, notes);
      Object.keys(activeSockets)
        .filter(socketId => socketId !== socket.id) // Remove own socket
        .filter(socketId => activeSockets[socketId].noteId === id) // Remove users in other notes
        .map(socketId => activeSockets[socketId].socket)
        .forEach(otherSocket => otherSocket.emit('load', { id, notes }));
      fn('ok');
    });
    socket.on('disconnect', () => {
      delete activeSockets[socket.id];
    });
  });
};
