import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import 'font-awesome/scss/font-awesome.scss';

import App from './app';
import store from './store';

// Load global css rules before our Main component, so we can overwrite them in our components
import '../css/reset.scss';
import '../css/global.scss';
import '../css/_util_global.scss';
import '../css/styles.scss';

const content = document.getElementById('content');

ReactDOM.render(
  <AppContainer>
    <App />
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
    const UpdatedApp = require('./app').default; // eslint-disable-line global-require
    ReactDOM.render(
      <AppContainer>
        <UpdatedApp />
      </AppContainer>,
      content,
    );
  });
}
