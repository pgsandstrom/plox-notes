import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import store from './store';
import Main from './main';

// Load global css rules before our Main component, so we can overwrite them in our components
import '../css/global.scss';
import '../css/_util_global.scss';
import '../css/styles.scss';


const content = document.getElementById('content');

const MyRouter = () => (
  <Router history={browserHistory}>
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
