import { CHANGE_COORDS } from '../actions'

const defaultState = {
  lat: null,
  lon: null
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_COORDS:
      return {
        ...state,
        lat: action.coords.lat,
        lon: action.coords.lon
      }
    default:
      return state
  }
}
