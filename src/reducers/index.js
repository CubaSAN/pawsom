import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import localesReducer from './locales'
import authReducer from './auth'
import navigatorReducer from './navigator'

export default combineReducers({
  routing: routerReducer,
  locales: localesReducer,
  auth: authReducer,
  navigator: navigatorReducer
})
