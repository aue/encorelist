import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  UPDATE_POINTS_IN_USER_REQUEST,
  UPDATE_POINTS_IN_USER_SUCCESS,
  UPDATE_POINTS_IN_USER_FAILURE
} from '../actions/account'

const initialState = {
  name: '',
  points: 0,
  redeemedPoints: 0,
  error: null,
  user: null,
  waitingForResponse: false
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        waitingForResponse: true,
        error: null
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        waitingForResponse: false,
        error: null
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        waitingForResponse: false,
        error: action.error
      }

    case LOGOUT_REQUEST:
      return {
        ...state,
        waitingForResponse: true,
        error: null
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        waitingForResponse: false,
        error: null
      }
    case LOGOUT_FAILURE:
      return {
        ...state,
        waitingForResponse: false,
        error: action.error
      }

    case SIGNUP_REQUEST:
      return {
        ...state,
        waitingForResponse: true,
        error: null
      }
    case SIGNUP_SUCCESS:
      return {
        ...state,
        user: action.user,
        waitingForResponse: false,
        error: null
      }
    case SIGNUP_FAILURE:
      return {
        ...state,
        waitingForResponse: false,
        error: action.error
      }

    case UPDATE_POINTS_IN_USER_REQUEST: {
      return {
        ...state
      }
    }
    case UPDATE_POINTS_IN_USER_SUCCESS: {
      return {
        ...state,
        points: action.points,
        redeemedPoints: action.redeemedPoints
      }
    }
    case UPDATE_POINTS_IN_USER_FAILURE: {
      return {
        ...state,
        error: action.error
      }
    }

    default:
      return state
  }
}
