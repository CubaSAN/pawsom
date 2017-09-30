import { GET_GEOLOCATION } from '../actions'

const defaultState = {
  lat: null,
  lng: null
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_GEOLOCATION:
      const { coords } = action.payload

      return {
        ...state,
        lat: coords.latitude,
        lng: coords.longitude
      }
    default:
      return state
  }
}
