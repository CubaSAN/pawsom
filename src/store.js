import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import rootReducer from './reducers'
import { getLocale, getLanguages, getUser } from './utils'
import { promiseMiddleware } from './enhancers'

export const history = createHistory()

const user = getUser();

const initialState = {
  locales: {
    locale: getLocale(),
    languages: getLanguages()
  },
  auth: {
    isAuthenticated: !!user,
    user
  }
}

const enhancers = [
  applyMiddleware(promiseMiddleware)
]

const middleware = [
  thunk,
  routerMiddleware(history),
  createLogger()
]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
)

export default store
