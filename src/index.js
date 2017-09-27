import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { LocalesContainer } from './shared/components/Locales'
import store, { history } from './store'
import 'bootstrap/dist/css/bootstrap.css'

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <LocalesContainer>
        <App />
      </LocalesContainer>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
