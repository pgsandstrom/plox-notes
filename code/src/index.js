import restify from 'restify';
import plugins from 'restify-plugins';
import socketio from 'socket.io';

import websocket from './websocket';
import encodeUtf8Plugin from './util/encodeUtf8Plugin';
import routes from './routes';

const server = restify.createServer();

// we need to write server.server or get exception:
// https://github.com/restify/node-restify/issues/717
const io = socketio.listen(server.server);
websocket(io);

// restify cheat sheet: https://gist.github.com/LeCoupa/0664e885fd74152d1f90
server.use(plugins.acceptParser(server.acceptable));
server.use(plugins.queryParser());
server.use(plugins.bodyParser());
server.use(plugins.gzipResponse());
server.use(encodeUtf8Plugin());

server.get('/api/echo/:name', (req, res, next) => {
  res.send(req.params);
  return next();
});

routes(server);

server.listen(8088, () => {
  console.log('%s listening at %s', server.name, server.url); // eslint-disable-line no-console
});
