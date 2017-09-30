export const GET_GEOLOCATION = 'GET_GEOLOCATION'

export const getLocation = () => {
  const geolocation = navigator.geolocation

  const location = new Promise((resolve, reject) => {
    if (!geolocation) {
      reject(new Error('Not Supported'))
    }

    geolocation.getCurrentPosition((position) => {
      resolve(position)
    }, () => {
      reject(new Error('Permission denied'))
    })
  })

  return {
    type: GET_GEOLOCATION,
    payload: location
  }
}
