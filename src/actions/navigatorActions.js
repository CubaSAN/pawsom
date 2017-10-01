export const GET_GEOLOCATION = 'GET_GEOLOCATION'

export const getLocation = () => {
  const geolocation = navigator.geolocation

  const location = new Promise((resolve, reject) => {
    if (!geolocation) {
      resolve({
        coords: {
          latitude: null,
          longitude: null
        },
        err: new Error('Not Supported')
      })
    }

    geolocation.getCurrentPosition((position) => {
      resolve(position)
    }, (err) => {
      const errMsg = [
        'Permision Denied',
        'Position Unavailable',
        'Timeout Error'
      ]

      resolve({
        coords: {
          latitude: null,
          longitude: null
        },
        err: new Error(errMsg[err.code - 1])
      })
    })
  })

  return {
    type: GET_GEOLOCATION,
    payload: location
  }
}
