import offline from 'react-native-simple-store'
import { itemsRef } from '../firebase'
import database from '../database';

export const GET_LIST_ITEM_IDS_REQUEST = 'GET_LIST_ITEM_IDS_REQUEST';
export const GET_LIST_ITEM_IDS_SUCCESS = 'GET_LIST_ITEM_IDS_SUCCESS';
export const GET_LIST_ITEM_IDS_FAILURE = 'GET_LIST_ITEM_IDS_FAILURE';

export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILURE = 'GET_ITEMS_FAILURE';

export const ADD_LIST_ITEM_REQUEST = 'ADD_LIST_ITEM_REQUEST';
export const ADD_LIST_ITEM_SUCCESS = 'ADD_LIST_ITEM_SUCCESS';
export const ADD_LIST_ITEM_FAILURE = 'ADD_LIST_ITEM_FAILURE';

export const REMOVE_LIST_ITEM_REQUEST = 'REMOVE_LIST_ITEM_REQUEST';
export const REMOVE_LIST_ITEM_SUCCESS = 'REMOVE_LIST_ITEM_SUCCESS';
export const REMOVE_LIST_ITEM_FAILURE = 'REMOVE_LIST_ITEM_FAILURE';

export const CHANGE_ITEM_REQUEST = 'CHANGE_ITEM_REQUEST';
export const CHANGE_ITEM_SUCCESS = 'CHANGE_ITEM_SUCCESS';
export const CHANGE_ITEM_FAILURE = 'CHANGE_ITEM_FAILURE';


export const ADD_ITEM = 'ADD_ITEM'
export const ADD_ITEM_SUCCESS = 'ADD_ITEM_SUCCESS'
export const REMOVE_ITEM = 'REMOVE_ITEM'
export const REMOVE_ITEM_SUCCESS = 'REMOVE_ITEM_SUCCESS'

export const OFFLINE_ITEMS_LOADED = 'OFFLINE_ITEMS_LOADED'
export const CONNECTION_CHECKING = 'CONNECTION_CHECKING'
export const CONNECTION_CHECKED = 'CONNECTION_CHECKED'
export const CONNECTION_ONLINE = 'CONNECTION_ONLINE'
export const CONNECTION_OFFLINE = 'CONNECTION_OFFLINE'

/*
* Fetch item ids in a list
*/
export function getListItemIds(listId) {
  return dispatch => {
    dispatch({ type: GET_LIST_ITEM_IDS_REQUEST, listId })

    return database.ref(`/lists/${listId}/items`).once('value', snapshot => {
      let data = snapshot.val()
      let itemIds = Object.keys(data)
      dispatch({ type: GET_LIST_ITEM_IDS_SUCCESS, listId, itemIds })
    })
    .catch(error => {
      dispatch({ type: GET_LIST_ITEM_IDS_FAILURE, listId, error })
      throw error
    })
  }
}

/*
* Fetch items from ids
*/
export function getItems(itemIds) {
  return dispatch => {
    dispatch({ type: GET_ITEMS_REQUEST, itemIds })

    let promises = itemIds.map(itemId => {
      return database.ref('/items/').child(itemId).once('value')
    });

    return Promise.all(promises).then(snapshots => {
      let items = snapshots
        .map(snapshot => snapshot.val())
        .filter(value => value !== null)
      dispatch({ type: GET_ITEMS_SUCCESS, itemIds, items })
    })
    .catch(error => {
      dispatch({ type: GET_ITEMS_FAILURE, itemIds, error })
      throw error
    })
  }
}

/*
* Fetch all items in a given list
*/
export function getListItems(listId) {
  return (dispatch, getState) => {
    return dispatch(getListItemIds(listId)).then(() => {
      console.log(getState())
      const itemIds = getState().items.itemIds
      return dispatch(getItems(itemIds))
    })
  }
}

/*
* Adding an item to a list
*/
export function addListItem(title = '', points = 0, listId) {
  return dispatch => {
    let newItemId = database.ref().child('items').push().key
    dispatch({ type: ADD_LIST_ITEM_REQUEST, title, listId, newItemId })

    let newItem = {
      id: newItemId,
      title: title,
      points: parseInt(points, 10) || 0,
      complete: false,
      time: new Date().getTime()
    }
    let updates = {}
    updates[`/items/${newItemId}`] = newItem
    updates[`/lists/${listId}/items/${newItemId}`] = true

    return database.ref().update(updates).then(() => {
      setTimeout(() => dispatch({ type: ADD_LIST_ITEM_SUCCESS, title, listId, itemId: newItemId, item: newItem }), 2500)
    })
    .catch(error => {
      dispatch({ type: ADD_LIST_ITEM_FAILURE, title, listId, newItemId, error })
      throw error
    })
  }
}

/*
* Removing an item from a list
*/
export function removeListItem(itemId, listId) {
  return dispatch => {
    dispatch({ type: REMOVE_LIST_ITEM_REQUEST, itemId, listId })

    let updates = {}
    updates[`/items/${itemId}`] = null
    updates[`/lists/${listId}/items/${itemId}`] = null

    return database.ref().update(updates).then(() => {
      dispatch({ type: REMOVE_LIST_ITEM_SUCCESS, itemId, listId })
    })
    .catch(error => {
      dispatch({ type: REMOVE_LIST_ITEM_FAILURE, itemId, listId, error })
      throw error
    })
  }
}

/*
 * Change an item in a list
 */
export function changeItem(itemId, data) {
  return dispatch => {
    dispatch({ type: CHANGE_ITEM_REQUEST, itemId })

    return database.ref('/items/').child(itemId).update(data).then(() => {
      dispatch({ type: CHANGE_ITEM_SUCCESS, itemId, data })
    })
    .catch(error => {
      dispatch({ type: CHANGE_ITEM_FAILURE, itemId, error })
      throw error
    })
  }
}






export function addItem(title, listId) {
  let itemId = database.ref().child('items').push().key;
  let item = {
    id: itemId,
    title: title,
    points: 0,
    complete: false,
    time: new Date().getTime()
  };
  let updates = {};
  updates[`/items/${itemId}`] = item;
  updates[`/lists/${listId}/items/${itemId}`] = true;
  database.ref().update(updates);

  return {
    type: ADD_ITEM
  }
}

export const addItemSuccess = (itemData) => {
  return {
    type: ADD_ITEM_SUCCESS,
    itemData: itemData
  }
}

export const removeItem = (id) => {
  itemsRef.child(id).remove()

  return {
    type: REMOVE_ITEM,
  }
}

export const removeItemSuccess = (id) => {
  return {
    type: REMOVE_ITEM_SUCCESS,
    id: id
  }
}

const offlineItemsLoaded = (items) => {
  return {
    type: OFFLINE_ITEMS_LOADED,
    items: items
  }
}

export const loadOfflineItems = () => {
  return dispatch => {
    offline.get('items').then(items => {
      dispatch(offlineItemsLoaded(items || []))
    })
  }
}

export const checkConnection = () => {
  return dispatch => {
    dispatch({type: CONNECTION_CHECKING})
    setTimeout(() => dispatch({type: CONNECTION_CHECKED}), 5000)
  }
}

export const goOnline = () => {
  return {
    type: CONNECTION_ONLINE
  }
}

export const goOffline = () => {
  return {
    type: CONNECTION_OFFLINE
  }
}
