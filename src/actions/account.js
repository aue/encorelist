import { auth, database } from '../firebase'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'

export const GET_USER_DATA_REQUEST = 'GET_USER_DATA_REQUEST'
export const GET_USER_DATA_SUCCESS = 'GET_USER_DATA_SUCCESS'
export const GET_USER_DATA_FAILURE = 'GET_USER_DATA_FAILURE'

export const UPDATE_POINTS_IN_USER_REQUEST = 'UPDATE_POINTS_IN_USER_REQUEST'
export const UPDATE_POINTS_IN_USER_SUCCESS = 'UPDATE_POINTS_IN_USER_SUCCESS'
export const UPDATE_POINTS_IN_USER_FAILURE = 'UPDATE_POINTS_IN_USER_FAILURE'

/*
* Login user
*/
export function login(email, password) {
  return dispatch => {
    dispatch({ type: LOGIN_REQUEST })

    return auth.signInWithEmailAndPassword(email, password).then(user => {
      dispatch({ type: LOGIN_SUCCESS, user })
    })
    .catch(error => {
      dispatch({ type: LOGIN_FAILURE, error: error.message })
      if (__DEV__) throw error
    })
  }
}

/*
* Logout user
*/
export function logout() {
  return dispatch => {
    dispatch({ type: LOGOUT_REQUEST })

    return auth.signOut().then(user => {
      dispatch({ type: LOGOUT_SUCCESS, user })
    })
    .catch(error => {
      dispatch({ type: LOGOUT_FAILURE, error: error.message })
      if (__DEV__) throw error
    })
  }
}

/*
* Signup user
*/
export function signup(email, password) {
  return dispatch => {
    dispatch({ type: SIGNUP_REQUEST })

    return auth.createUserWithEmailAndPassword(email, password).then(user => {
      dispatch({ type: SIGNUP_SUCCESS, user })
    })
    .catch(error => {
      dispatch({ type: SIGNUP_FAILURE, error: error.message })
      if (__DEV__) throw error
    })
  }
}

/*
* Get info from user's account
*/
export function getUserData() {
  return dispatch => {
    dispatch({ type: GET_USER_DATA_REQUEST })

    return database.ref(`/users/${auth.currentUser.uid}`).once('value', snapshot => {
      let user = {
        name: auth.currentUser.displayName || 'Listmaker',
        email: auth.currentUser.email || '',
        points: 0,
        redeemedPoints: 0,
        ...snapshot.val()
      }
      dispatch({ type: GET_USER_DATA_SUCCESS, user })
    })
    .catch(error => {
      dispatch({ type: GET_USER_DATA_FAILURE, error: error.message })
      if (__DEV__) throw error
    })
  }
}

/*
* Update points for user
*/
export function updatePointsInUser(points = 0, redeemedPoints = 0) {
  return dispatch => {
    dispatch({ type: UPDATE_POINTS_IN_USER_REQUEST, points, redeemedPoints })

    database.ref(`/users/${auth.currentUser.uid}`).transaction((user) => {
      if (user) {
        if (user.points == null) user.points = 0
        if (user.redeemedPoints == null) user.redeemedPoints = 0

        user.points += points
        user.redeemedPoints += redeemedPoints

        if (user.points < 0) user.points = 0
        if (user.redeemedPoints < 0) user.redeemedPoints = 0
      }
      return user
    }, (error, success, result) => {
      if (error) {
        dispatch({ type: UPDATE_POINTS_IN_USER_FAILURE, error: error.message })
        if (__DEV__) throw error
      }
      else if (success) {
        const user = result.val()
        dispatch({ type: UPDATE_POINTS_IN_USER_SUCCESS, points: user.points, redeemedPoints: user.redeemedPoints })
      }
    })
  }
}
