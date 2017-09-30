import { CHANGE_SEARCH_RADIUS } from '../actions'

const defaultState = {
  radius: 15
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_SEARCH_RADIUS:
    debugger;
      return {
        ...state,
        radius: action.payload.radius
      }
    default:
      return state
  }
}
