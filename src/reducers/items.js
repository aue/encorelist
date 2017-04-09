import {
  GET_LIST_ITEM_IDS_REQUEST,
  GET_LIST_ITEM_IDS_SUCCESS,
  GET_LIST_ITEM_IDS_FAILURE,
  LOAD_ITEMS_REQUEST,
  LOAD_ITEMS_SUCCESS,
  LOAD_ITEMS_FAILURE,
  GET_LIST_ITEMS_REQUEST,
  ADD_LIST_ITEM_REQUEST,
  ADD_LIST_ITEM_SUCCESS,
  ADD_LIST_ITEM_FAILURE,
  REMOVE_LIST_ITEM_REQUEST,
  REMOVE_LIST_ITEM_SUCCESS,
  REMOVE_LIST_ITEM_FAILURE,
  CHANGE_LIST_ITEM_REQUEST,
  CHANGE_LIST_ITEM_SUCCESS,
  CHANGE_LIST_ITEM_FAILURE
} from '../actions/items'

import {
  REMOVE_LIST_SUCCESS
} from '../actions/lists'

const initialState = {
  activeListId: null,
  items: {},
  loadingItemIds: false,
  loadingItems: false,
  error: false,
  addingItem: false,
  removingItem: false,
  changingItem: false
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_ITEM_IDS_REQUEST:
      return {
        ...state,
        loadingItemIds: true
      }
    case GET_LIST_ITEM_IDS_SUCCESS:
      return {
        ...state,
        loadingItemIds: false
      }
    case GET_LIST_ITEM_IDS_FAILURE:
      return {
        ...state,
        loadingItemIds: false,
        error: action.error
      }

    case LOAD_ITEMS_REQUEST:
      return {
        ...state,
        loadingItems: true
      }
    case LOAD_ITEMS_SUCCESS:
      return {
        ...state,
        items: {
          ...state.items,
          ...action.items
        },
        loadingItems: false
      }
    case LOAD_ITEMS_FAILURE:
      return {
        ...state,
        loadingItems: false,
        error: action.error
      }

    case GET_LIST_ITEMS_REQUEST:
      return {
        ...state,
        activeListId: action.listId
      }

    case ADD_LIST_ITEM_REQUEST:
      return {
        ...state,
        addingItem: true
      }
    case ADD_LIST_ITEM_SUCCESS: {
      let items = { ...state.items }
      items[action.itemId] = action.item

      return {
        ...state,
        items,
        addingItem: false
      }
    }
    case ADD_LIST_ITEM_FAILURE:
      return {
        ...state,
        addingItem: false,
        error: action.error
      }

    case REMOVE_LIST_ITEM_REQUEST:
      return {
        ...state,
        removingItem: true
      }
    case REMOVE_LIST_ITEM_SUCCESS: {
      let items = { ...state.items }
      delete items[action.itemId]

      return {
        ...state,
        items,
        removingItem: false
      }
    }
    case REMOVE_LIST_ITEM_FAILURE:
      return {
        ...state,
        removingItem: false,
        error: action.error
      }

    case CHANGE_LIST_ITEM_REQUEST:
      return {
        ...state,
        changingItem: true
      }
    case CHANGE_LIST_ITEM_SUCCESS: {
      let items = { ...state.items }
      items[action.itemId] = {
        ...items[action.itemId],
        ...action.data
      }

      return {
        ...state,
        items,
        changingItem: false
      }
    }
    case CHANGE_LIST_ITEM_FAILURE:
      return {
        ...state,
        changingItem: false
      }

    case REMOVE_LIST_SUCCESS: {
      let items = { ...state.items }
      for (let itemId of action.itemIds) {
        delete items[itemId]
      }

      return {
        ...state,
        items
      }
    }

    default:
      return state
  }
}
