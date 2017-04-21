import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { errorHandlerMiddleware } from '../src/errorHandlerMiddleware';

import rootReducer from './rootReducer';

export default createStore(rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // eslint-disable-line no-underscore-dangle
  applyMiddleware(thunk, promiseMiddleware(), errorHandlerMiddleware));
