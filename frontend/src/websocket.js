/* eslint-disable no-console */
import socketio from 'socket.io-client';

import { getServerUrl } from './backend';

let websocket;

export const createWebsocket = (setId, setNotes, setError) => {
  const socket = socketio(getServerUrl());
  socket.on('connect', () => {
    console.log('connected to server');
    setError('');
  });
  socket.on('load', (data) => {
    setId(data.id);
    setNotes(data.notes);
  });
  // socket.on('connect_error', () => {
  // });
  socket.on('disconnect', () => {
    setError('Websocket disconnected');
  });
  socket.on('error', (errorObj) => {
    setError('Unknown websocket error');
    console.log(JSON.stringify(errorObj));
  });
  websocket = socket;
};

export const getWebsocket = () => websocket;

export const sendEvent = (event, content, cb) => {
  websocket.emit(event, content, cb);
};
