import { AUTHENTICATE, ADD_USER } from '../actions'

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
    case ADD_USER:
      return {
        ...state,
        user: action.user
      }
    default:
      return state
  }
}
