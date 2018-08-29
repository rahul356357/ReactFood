import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import createStore from './store/createStore';
import Router from './router/Router';

const store = createStore();

ReactDOM.render(
  <Provider store={store} key="test_key" >
    <HashRouter>
      <Router />
    </HashRouter>
  </Provider>,
  document.getElementById('test_root'),
);
