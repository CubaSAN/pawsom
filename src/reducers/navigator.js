import { CHANGE_COORDS } from '../actions'

const defaultState = {
  lat: 49.839683,
  lon: 24.029717
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
