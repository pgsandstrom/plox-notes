import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import 'font-awesome/scss/font-awesome.scss';
import { BrowserRouter } from 'react-router-dom';

import App from './app';
import store from './store';


const content = document.getElementById('content');

ReactDOM.hydrate(
  <AppContainer>
    <BrowserRouter>
      <App />
    </BrowserRouter>
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
        <BrowserRouter>
          <UpdatedApp />
        </BrowserRouter>
      </AppContainer>,
      content,
    );
  });
}
