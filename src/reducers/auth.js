import { AUTHENTICATE } from '../actions'

const defaultState = {
  isAuthenticated: false
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated
      }
    default:
      return state
  }
}
