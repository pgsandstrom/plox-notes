import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { errorHandlerMiddleware } from '../src/errorHandlerMiddleware';

import rootReducer from './rootReducer';

console.log('creating store');
const storeArguments = [rootReducer];
if (typeof window !== 'undefined') {
  storeArguments.push(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // eslint-disable-line no-underscore-dangle
  );
}
storeArguments.push(
  applyMiddleware(thunk, promiseMiddleware(), errorHandlerMiddleware),
);
export default createStore(...storeArguments);
