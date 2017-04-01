import {
  GET_USER_LIST_IDS_REQUEST,
  GET_USER_LIST_IDS_SUCCESS,
  GET_USER_LIST_IDS_FAILURE,
  GET_LISTS_REQUEST,
  GET_LISTS_SUCCESS,
  GET_LISTS_FAILURE,
  ADD_LIST_REQUEST,
  ADD_LIST_SUCCESS,
  ADD_LIST_FAILURE
} from '../actions/lists'

const initialState = {
  listIds: [],
  lists: [],
  loadingListIds: false,
  loadingLists: false,
  error: null,
  adding: false,
  changing: false
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

    case ADD_LIST_REQUEST:
      return {
        ...state,
        error: null,
        adding: true,
      }
    case ADD_LIST_SUCCESS: {
      let listIds = state.listIds.concat([action.listId])
      let lists = state.lists.concat([action.list])

      return {
        ...state,
        error: null,
        listIds: listIds,
        lists: lists,
        adding: false
      }
    }
    case ADD_LIST_FAILURE:
      return {
        ...state,
        error: action.error,
        adding: false
      }

    default:
      return state
  }
}
