import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { errorHandlerMiddleware } from './errorHandlerMiddleware';

import rootReducer from './rootReducer';

console.log('creating store'); // eslint-disable-line no-console
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
