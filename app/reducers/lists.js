import {
  GET_USER_LIST_IDS_REQUEST,
  GET_USER_LIST_IDS_SUCCESS,
  GET_USER_LIST_IDS_FAILURE,

  GET_LISTS_REQUEST,
  GET_LISTS_SUCCESS,
  GET_LISTS_FAILURE
} from '../actions/lists'

const initialState = {
  listIds: [],
  lists: [],
  loadingListIds: false,
  loadingLists: false,
  error: false
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_LIST_IDS_REQUEST:
      return {
        ...state,
        loadingListIds: true
      }
    case GET_USER_LIST_IDS_SUCCESS:
      return {
        ...state,
        listIds: action.listIds,
        loadingListIds: false
      }
    case GET_USER_LIST_IDS_FAILURE:
      return {
        ...state,
        loadingListIds: false,
        error: true
      }

    case GET_LISTS_REQUEST:
      return {
        ...state,
        loadingLists: true
      }
    case GET_LISTS_SUCCESS:
      return {
        ...state,
        lists: action.lists,
        loadingLists: false
      }
    case GET_LISTS_FAILURE:
      return {
        ...state,
        loadingLists: false,
        error: true
      }

    default:
      return state
  }
}
