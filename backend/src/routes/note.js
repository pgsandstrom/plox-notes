import GenericError from '../util/genericError';
import { load, save } from '../controller/note';

export default (server) => {
  server.get('/api/v1/note/:noteid', (req, res, next) => {
    const id = req.params.noteid;
    load(id)
      .then((result) => {
        res.setHeader('content-type', 'application/json'); // TODO do this in a cooler way
        res.send(result);
        next();
      })
      .catch(err => next(new GenericError(err)));
  });

  server.post('/api/v1/note/:noteid', (req, res, next) => {
    const id = req.params.noteid;
    const data = JSON.parse(req.body);

    save(id, data)
      .then((result) => {
        res.send(200, result);
        next();
      })
      .catch(err => next(new GenericError(err)));
  });
};
