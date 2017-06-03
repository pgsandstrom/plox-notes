import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import 'font-awesome/scss/font-awesome.scss';
import { BrowserRouter, Switch } from 'react-router-dom';

import store from './store';

// Load global css rules before our Main component, so we can overwrite them in our components
import '../css/reset.scss';
import '../css/global.scss';
import '../css/_util_global.scss';
import '../css/styles.scss';

import Welcome from './welcome';
import Main from './main';

const content = document.getElementById('content');

const App = () =>
  <Switch>
    <Route exact path="/" component={Welcome} />
    <Route path="/:noteid" component={Main} />
  </Switch>;

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
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
