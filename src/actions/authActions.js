export const AUTHENTICATE = 'AUTHENTICATE'

export const authenticate = isAuthenticated => ({
  type: AUTHENTICATE,
  isAuthenticated
})
