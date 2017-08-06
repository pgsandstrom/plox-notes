import React from 'react';
import { Route } from 'react-router';
import { Provider } from 'react-redux';
import { Switch } from 'react-router-dom';

// Load global css rules before our Main component, so we can overwrite them in our components
import './css/reset.scss';
import './css/global.scss';
import './css/_util_global.scss';
import './css/styles.scss';

import Welcome from './welcome';
import Main from './main';
import store from './store';


const MyRouter = props =>
  (<Switch>
    <Route exact path="/" component={props2 => <Welcome {...props} {...props2} />} />
    <Route path="/:noteid" component={props2 => <Main {...props} {...props2} />} />
  </Switch>);

const App = props =>
  (<Provider store={store}>
    <MyRouter {...props} />
  </Provider>);

export default App;
