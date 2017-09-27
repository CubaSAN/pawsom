import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import localeReducer from './localization'

export default combineReducers({
  routing: routerReducer,
  locale: localeReducer
})
