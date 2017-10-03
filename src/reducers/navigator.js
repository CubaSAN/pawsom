import { GET_GEOLOCATION } from '../actions'

const defaultState = {
  lat: null,
  lng: null
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_GEOLOCATION:
      return {
        ...state,
        lat: action.payload.latitude,
        lng: action.payload.longitude
      }
    default:
      return state
  }
}
