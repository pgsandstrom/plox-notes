import note from './note';

export default (server) => {
  note(server);

  server.get('/api/v1', (req, res, next) => {
    // TODO get version from package.json somehow. pm2 seems to have support for npm start... http://stackoverflow.com/questions/31579509/can-pm2-run-an-npm-start-script
    res.send('1.0.0');
    next();
  });
};
