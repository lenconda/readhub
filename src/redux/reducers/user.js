import * as TYPES from '../actions/types'

const initialState = {
  isLoggedIn: false,
  user: {},
  status: null,
}

export default function user(state=initialState, action) {
  switch (action.type) {
    case TYPES.LOGGED_IN:
      return {
        ...state,
        isLoggedIn: true,
        user: action.user,
        status: 'done',
      }
    case TYPES.LOGGED_OUT:
      return {
        ...state,
        isLoggedIn: false,
        user: {},
        status: null,
      }
    default:
      return state
  }
}