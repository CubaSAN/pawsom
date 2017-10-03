import { GET_GEOLOCATION } from '../actions'

const defaultState = {
  lat: null,
  lng: null,
  err: false
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_GEOLOCATION:
      return {
        ...state,
        lat: action.payload.coords.latitude,
        lng: action.payload.coords.longitude,
        err: !!action.payload.err,
      }
    default:
      return state
  }
}
