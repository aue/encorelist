import database from '../database'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'

/*
* Login user
*/
export function login(email, password) {
  return dispatch => {
    dispatch({ type: LOGIN_REQUEST })

    return database.auth().signInWithEmailAndPassword(email, password).then(user => {
      dispatch({ type: LOGIN_SUCCESS, user })
    })
    .catch(error => {
      dispatch({ type: LOGIN_FAILURE, error })
      throw error
    })
  }
}

/*
* Logout user
*/
export function logout() {
  return dispatch => {
    dispatch({ type: LOGOUT_REQUEST })

    return database.auth().signOut().then(user => {
      dispatch({ type: LOGOUT_SUCCESS, user })
    })
    .catch(error => {
      dispatch({ type: LOGOUT_FAILURE, error })
      throw error
    })
  }
}

/*
* Signup user
*/
export function signup(email, password) {
  return dispatch => {
    dispatch({ type: SIGNUP_REQUEST })

    return database.auth().createUserWithEmailAndPassword(email, password).then(user => {
      dispatch({ type: SIGNUP_SUCCESS, user })
    })
    .catch(error => {
      dispatch({ type: SIGNUP_FAILURE, error })
      throw error
    })
  }
}
