import * as TYPES from './types'

let testUser = {
  name: 'test',
  age: 24,
  avatar: 'https://avatars1.githubusercontent.com/u/1439939?v=3&s=460',
}

let skipUser = {
  'name': 'guest',
  'age': 20,
  'avatar': 'https://avatars1.githubusercontent.com/u/1439939?v=3&s=460',
}

export function login(options) {
  return dispatch => {
    console.log('options============')
    console.log(options)
    dispatch({ type: TYPES.LOGGED_IN, user: testUser, })
  }
}

export function skipLogin() {
  return {
    type: TYPES.LOGGED_IN,
    user: skipUser,
  }
}

export function logout() {
  return {
    type: TYPES.LOGGED_OUT,
  }
}