import { ADD_USER } from '../actions'

const defaultState = {
  user: null
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        user: action.user
      }
    default:
      return state
  }
}
