import {
  GET_USER_LIST_IDS_REQUEST,
  GET_USER_LIST_IDS_SUCCESS,
  GET_USER_LIST_IDS_FAILURE,
  GET_LISTS_REQUEST,
  GET_LISTS_SUCCESS,
  GET_LISTS_FAILURE,
  ADD_LIST_REQUEST,
  ADD_LIST_SUCCESS,
  ADD_LIST_FAILURE,
  REMOVE_LIST_REQUEST,
  REMOVE_LIST_SUCCESS,
  REMOVE_LIST_FAILURE,
  UPDATE_POINTS_IN_LIST_REQUEST,
  UPDATE_POINTS_IN_LIST_FAILURE,
  UPDATE_POINTS_IN_LIST_SUCCESS
} from '../actions/lists'

import {
  ADD_LIST_ITEM_SUCCESS,
  REMOVE_LIST_ITEM_SUCCESS,
  TOGGLE_LIST_ITEM_SUCCESS
} from '../actions/items'

const initialState = {
  listIds: {},
  lists: {},
  loadingListIds: false,
  loadingLists: false,
  error: null,
  adding: false,
  changing: false,
  init: false
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
        listIds: {
          ...state.listIds,
          ...action.listIds
        },
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
        lists: {
          ...state.lists,
          ...action.lists
        },
        init: true,
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
      let listIds = { ...state.listIds }
      listIds[action.listId] = true

      let lists = { ...state.lists }
      lists[action.listId] = action.list

      return {
        ...state,
        error: null,
        listIds,
        lists,
        adding: false
      }
    }
    case ADD_LIST_FAILURE:
      return {
        ...state,
        error: action.error,
        adding: false
      }

    case REMOVE_LIST_REQUEST: {
      return {
        ...state
      }
    }
    case REMOVE_LIST_SUCCESS: {
      let listIds = { ...state.listIds }
      delete listIds[action.listId]

      let lists = { ...state.lists }
      delete lists[action.listId]

      return {
        ...state,
        error: null,
        listIds,
        lists
      }
    }
    case REMOVE_LIST_FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }

    case UPDATE_POINTS_IN_LIST_REQUEST: {
      return {
        ...state
      }
    }
    case UPDATE_POINTS_IN_LIST_SUCCESS: {
      let lists = { ...state.lists }
      lists[action.listId].totalPoints = action.totalPoints
      lists[action.listId].completedPoints = action.completedPoints

      return {
        ...state,
        lists
      }
    }
    case UPDATE_POINTS_IN_LIST_FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }

    case ADD_LIST_ITEM_SUCCESS: {
      let lists = { ...state.lists }
      lists[action.listId].items[action.itemId] = true

      return {
        ...state,
        lists
      }
    }
    case REMOVE_LIST_ITEM_SUCCESS: {
      let lists = { ...state.lists }
      delete lists[action.listId].items[action.itemId]

      return {
        ...state,
        lists
      }
    }
    case TOGGLE_LIST_ITEM_SUCCESS: {
      let lists = { ...state.lists }
      lists[action.listId].items[action.itemId] = true

      return {
        ...state,
        lists
      }
    }

    default:
      return state
  }
}
