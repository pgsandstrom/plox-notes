import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import Welcome from './welcome';
import Main from './main';
import store from './store';

const MyRouter = () =>
  <Router history={browserHistory}>
    <Route path="/" component={Welcome} />
    <Route path="/:noteid" component={Main} />
  </Router>;

const App = () =>
  <Provider store={store}>
    <MyRouter />
  </Provider>;

export default App;
