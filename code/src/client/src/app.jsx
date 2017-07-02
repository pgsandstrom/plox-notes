import React from 'react';
import { Route } from 'react-router';
import { Provider } from 'react-redux';
import { Switch } from 'react-router-dom';

// Load global css rules before our Main component, so we can overwrite them in our components
import '../css/reset.scss';
import '../css/global.scss';
import '../css/_util_global.scss';
import '../css/styles.scss';

import Welcome from './welcome';
import Main from './main';
import store from './store';


const MyRouter = () =>
  <Switch>
    <Route exact path="/" component={Welcome} />
    <Route path="/:noteid" component={Main} />
  </Switch>;

const App = () =>
  <Provider store={store}>
    <MyRouter />
  </Provider>;

export default App;
