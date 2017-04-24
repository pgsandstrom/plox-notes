import socketio from 'socket.io-client';

import { getServerUrl } from './backend';

let websocket;

export const createWebsocket = (setId, setNotes, setError) => {
  const socket = socketio(getServerUrl());
  socket.on('connect', () => {
    // eslint-disable-next-line no-console
    console.log('connected to server');
    setError('');
  });
  socket.on('load', (data) => {
    setId(data.id);
    setNotes(data.notes);
  });
  socket.on('disconnect', () => {
    setError('Websocket disconnected');
  });
  websocket = socket;
};

export const getWebsocket = () => websocket;

export const sendEvent = (event, content) => {
  websocket.emit(event, content, () => {
  });
};
