import { CHANGE_LOCALE } from '../actions'

const defaultState = {
  locale: null,
  messages: null
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_LOCALE:
      return {
        ...state,
        locale: action.locale
      }
    default:
     return state
  }
}
