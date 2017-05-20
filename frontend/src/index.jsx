import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import 'normalize.css';

import store from './store';

// Load global css rules before our Main component, so we can overwrite them in our components
import '../css/reset.scss';
import '../css/global.scss';
import '../css/_util_global.scss';
import '../css/styles.scss';

import Welcome from './welcome';
import Main from './main';

const content = document.getElementById('content');

const MyRouter = () => (
  <Router history={browserHistory}>
    <Route path="/" component={Welcome} />
    <Route path="/:noteid" component={Main} />
  </Router>
);

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <MyRouter />
    </Provider>
  </AppContainer>,
  content,
);

window.addEventListener('beforeunload', (e) => {
  if (store.getState().ongoingSaves > 0) {
    const confirmationMessage = 'Maybe everything is not saved ;_;';
    (e || window.event).returnValue = confirmationMessage;
    return confirmationMessage;
  } else {
    return null;
  }
});

// Hotswap in changes:
if (module.hot) {
  module.hot.accept('./main', () => {
    const UpdatedApp = require('./main').default; // eslint-disable-line global-require
    ReactDOM.render(
      <AppContainer>
        <Provider store={store}>
          <UpdatedApp />
        </Provider>
      </AppContainer>,
      content,
    );
  });
}
