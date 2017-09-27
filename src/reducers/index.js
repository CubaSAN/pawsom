import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import localesReducer from './locales'

export default combineReducers({
  routing: routerReducer,
  locales: localesReducer
})
