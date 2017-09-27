const defaultState = 'en-US'

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'CHANGE_LOCALE':
      return action.locale
    default:
     return state
  }
}
