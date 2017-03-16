import {
  GET_LIST_ITEM_IDS_REQUEST,
  GET_LIST_ITEM_IDS_SUCCESS,
  GET_LIST_ITEM_IDS_FAILURE,
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILURE,
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

const initialState = {
  listId: '',
  itemIds: [],
  items: [],
  loadingItemIds: false,
  loadingItems: false,
  error: false,
  addingItem: false,
  removingItem: false,
  changingItem: false
}

export default function reducer(state = initialState, action) {
  console.log(action)

  switch (action.type) {
    case GET_LIST_ITEM_IDS_REQUEST:
      return {
        ...state,
        listId: action.listId,
        loadingItemIds: true
      }
    case GET_LIST_ITEM_IDS_SUCCESS:
      return {
        ...state,
        itemIds: action.itemIds,
        loadingItemIds: false
      }
    case GET_LIST_ITEM_IDS_FAILURE:
      return {
        ...state,
        loadingItemIds: false,
        error: true
      }

    case GET_ITEMS_REQUEST:
      return {
        ...state,
        loadingItems: true
      }
    case GET_ITEMS_SUCCESS:
      return {
        ...state,
        items: action.items,
        loadingItems: false
      }
    case GET_ITEMS_FAILURE:
      return {
        ...state,
        loadingItems: false,
        error: true
      }

    case ADD_LIST_ITEM_REQUEST:
      return {
        ...state,
        addingItem: true
      }
    case ADD_LIST_ITEM_SUCCESS: {
      let itemIds = state.itemIds.concat([action.itemId])
      let items = state.items.concat([action.item])

      return {
        ...state,
        addingItem: false,
        itemIds: itemIds,
        items: items
      }
    }
    case ADD_LIST_ITEM_FAILURE:
      return {
        ...state,
        addingItem: false,
        error: true
      }

    case REMOVE_LIST_ITEM_REQUEST:
      return {
        ...state,
        removingItem: true
      }
    case REMOVE_LIST_ITEM_SUCCESS: {
      let itemIds = state.itemIds.slice()
      let items = state.items.slice()
      const index = itemIds.indexOf(action.itemId)
      itemIds.splice(index, 1)
      items.splice(index, 1)

      return {
        ...state,
        removingItem: false,
        itemIds: itemIds,
        items: items
      }
    }
    case REMOVE_LIST_ITEM_FAILURE:
      return {
        ...state,
        removingItem: false,
        error: true
      }

    case CHANGE_LIST_ITEM_REQUEST:
      return {
        ...state,
        changingItem: true
      }
    case CHANGE_LIST_ITEM_SUCCESS: {
      const index = state.itemIds.indexOf(action.itemId)
      let items = state.items.slice()
      items[index] = {
        ...items[index],
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

    default:
      return state
  }
}
