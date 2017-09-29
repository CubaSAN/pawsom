export const AUTHENTICATE = 'AUTHENTICATE'
export const ADD_USER = 'ADD_USER'

export const authenticate = isAuthenticated => ({
  type: AUTHENTICATE,
  isAuthenticated
})

export const addUser = user => ({
  type: ADD_USER,
  user
})
