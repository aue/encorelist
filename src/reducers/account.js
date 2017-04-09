import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE
} from '../actions/account'

const initialState = {
  error: null,
  user: {},
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
        waitingForResponse: false,
        error: null
      }
    case SIGNUP_FAILURE:
      return {
        ...state,
        waitingForResponse: false,
        error: action.error
      }
    default:
      return state
  }
}
