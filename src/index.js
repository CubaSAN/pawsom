import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import { Provider } from 'react-redux'
import { LocalesContainer } from './shared/components/Locales'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'

ReactDOM.render(
  <Provider store={store}>
    <LocalesContainer>
      <App />
    </LocalesContainer>
  </Provider>,
  document.getElementById('root')
)
