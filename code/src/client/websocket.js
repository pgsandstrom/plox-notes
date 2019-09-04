/* eslint-disable no-console */
import socketio from 'socket.io-client';

import { getServerUrl } from './backend';

let websocket;

export const createWebsocket = (setIdNoParams, setNotes, setError) => {
  const socket = socketio(getServerUrl());
  socket.on('connect', () => {
    console.log('connected to server');
    setError('');
    setIdNoParams()
  });
  socket.on('connect_error', () => {
    setError('Connect error');
  });
  socket.on('connect_timeout', () => {
    setError('Connect timeout');
  });
  socket.on('load', (data) => {
    setNotes(data.notes);
  });
  // socket.on('connect_error', () => {
  // });
  socket.on('disconnect', () => {
    setError('Disconnected');
  });
  socket.on('error', (errorObj) => {
    setError('Connect error');
    console.log(JSON.stringify(errorObj));
  });
  socket.on('reconnect_error', (errorObj) => {
    setError('Reconnect error');
  });
  socket.on('reconnect_failed', (errorObj) => {
    setError('Reconnect failed');
  });
  websocket = socket;
};

export const getWebsocket = () => websocket;

export const sendEvent = (event, content, cb) => {
  websocket.emit(event, content, cb);
};
