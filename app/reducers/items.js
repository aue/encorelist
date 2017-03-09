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
  CHANGE_ITEM_REQUEST,
  CHANGE_ITEM_SUCCESS,
  CHANGE_ITEM_FAILURE,

  ADD_ITEM_SUCCESS,
  REMOVE_ITEM_SUCCESS,
  OFFLINE_ITEMS_LOADED,
  CONNECTION_CHECKING,
  CONNECTION_CHECKED,
  CONNECTION_ONLINE,
  CONNECTION_OFFLINE
} from '../actions/items'

const initialState = {
  onlineList: [],
  offlineList: [],
  connectionChecked: false,
  itemIds: [],
  items: [],
  loadingItemIds: false,
  loadingItems: false,
  error: false,
  changingItem: false
}

export default function reducer(state = initialState, action) {
  let list
  console.log(action)

  switch (action.type) {
    case GET_LIST_ITEM_IDS_REQUEST:
      return {
        ...state,
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

    case ADD_LIST_ITEM_REQUEST: {
      return {
        ...state,
        addingItem: true
      }
    }
    case ADD_LIST_ITEM_SUCCESS: {
      let items = state.items.concat([action.item])

      return {
        ...state,
        addingItem: false,
        items: items
      }
    }
    case ADD_LIST_ITEM_FAILURE: {
      return {
        ...state,
        addingItem: false,
        error: true
      }
    }

    case REMOVE_LIST_ITEM_REQUEST: {
      return {
        ...state,
        removingItem: true
      }
    }
    case REMOVE_LIST_ITEM_SUCCESS: {
      let items = state.items.slice(0)
      const index = items.map(i => i.id).indexOf(action.itemId)
      items.splice(index, 1)

      return {
        ...state,
        removingItem: false,
        items: items
      }
    }
    case REMOVE_LIST_ITEM_FAILURE: {
      return {
        ...state,
        removingItem: false,
        error: true
      }
    }

    case CHANGE_ITEM_REQUEST: {
      return {
        ...state,
        changingItem: true
      }
    }
    case CHANGE_ITEM_SUCCESS: {
      /*list = state.onlineList.slice(0)
      const index = list.map(i => i.id).indexOf(action.id)
      list[index] = action.itemData*/

      return {
        ...state,
        changingItem: false
      }
    }
    case CHANGE_ITEM_FAILURE: {
      return {
        ...state,
        changingItem: false
      }
    }

    case ADD_ITEM_SUCCESS:
      list = state.onlineList.concat([action.itemData]).sort((a, b) => b.time - a.time)

      return {
        ...state,
        onlineList: list,
        offlineList: list
      }
    case REMOVE_ITEM_SUCCESS:
      list = state.onlineList.slice(0)
      const index = list.map(i => i.id).indexOf(action.id)
      list.splice(index, 1)

      return {
        ...state,
        onlineList: list,
        offlineList: list
      }


    case OFFLINE_ITEMS_LOADED:
      return {
        ...state,
        offlineList: action.items,
        offlineLoaded: true
      }
    case CONNECTION_CHECKING:
      return {
        ...state,
        connectionChecked: false
      }
    case CONNECTION_CHECKED:
      return {
        ...state,
        connectionChecked: true
      }
    case CONNECTION_ONLINE:
      return {
        ...state,
        connectionChecked: true,
        connected: true
      }
    case CONNECTION_OFFLINE:
      return {
        ...state,
        connectionChecked: true,
        connected: false
      }
    default:
      return state
  }
}
