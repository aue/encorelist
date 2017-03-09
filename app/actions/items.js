import offline from 'react-native-simple-store'
import { itemsRef } from '../firebase'
import database from '../database';

export const GET_LIST_ITEM_IDS_REQUESTED = 'GET_LIST_ITEM_IDS_REQUESTED';
export const GET_LIST_ITEM_IDS_SUCCESS = 'GET_LIST_ITEM_IDS_SUCCESS';
export const GET_LIST_ITEM_IDS_ERROR = 'GET_LIST_ITEM_IDS_ERROR';

export const GET_ITEMS_REQUESTED = 'GET_ITEMS_REQUESTED';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_ERROR = 'GET_ITEMS_ERROR';

export const ADD_ITEM = 'ADD_ITEM'
export const ADD_ITEM_SUCCESS = 'ADD_ITEM_SUCCESS'
export const REMOVE_ITEM = 'REMOVE_ITEM'
export const REMOVE_ITEM_SUCCESS = 'REMOVE_ITEM_SUCCESS'

export const CHANGE_ITEM_REQUESTED = 'CHANGE_ITEM_REQUESTED';
export const CHANGE_ITEM_SUCCESS = 'CHANGE_ITEM_SUCCESS';
export const CHANGE_ITEM_ERROR = 'CHANGE_ITEM_ERROR';

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
    dispatch(getListItemIdsRequested());
    return database.ref(`/lists/${listId}/items`).once('value', snapshot => {
      let data = snapshot.val();
      let itemIds = Object.keys(data);
      console.log(itemIds);
      dispatch(getListItemIdsSuccess(itemIds))
    })
    .catch(error => {
      console.log(error);
      dispatch(getListItemIdsError());
    });
  };
}

function getListItemIdsRequested() {
  return {
    type: GET_LIST_ITEM_IDS_REQUESTED
  };
}

function getListItemIdsSuccess(itemIds) {
  return {
    type: GET_LIST_ITEM_IDS_SUCCESS,
    itemIds
  };
}

function getListItemIdsError() {
  return {
    type: GET_LIST_ITEM_IDS_ERROR
  };
}

/*
 * Fetch items from ids
 */
export function getItems(itemIds) {
  return dispatch => {
    dispatch(getItemsRequested());

    let promises = itemIds.map(itemId => {
      return database.ref('/items/').child(itemId).once('value');
    });

    Promise.all(promises).then(snapshots => {
      let items = snapshots
        .map(snapshot => snapshot.val())
        .filter(value => value !== null);

      console.log(items);
      dispatch(getItemsSuccess(items));
    })
    .catch(error => {
      console.log(error);
      dispatch(getItemsError());
    });
  };
}

function getItemsRequested() {
  return {
    type: GET_ITEMS_REQUESTED
  };
}

function getItemsSuccess(items) {
  return {
    type: GET_ITEMS_SUCCESS,
    items
  };
}

function getItemsError() {
  return {
    type: GET_ITEMS_ERROR
  };
}

/*
 * Adding an item to a list
 */
export function addItem(title, listId = 1) {
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

  /*const id = Math.random().toString(36).substring(7)
  const itemRef = itemsRef.child(id)

  itemRef.set({
    id,
    title: title,
    points: 0,
    complete: false,
    time: new Date().getTime()
  })*/

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

/*
 * Remove an item from a list
 */
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

/*
 * Change an item in a list
 */
export function changeItem(itemId, data) {
  return dispatch => {
    dispatch(changeItemRequested(itemId));
    return database.ref('/items/').child(itemId).update(data).then(() => {
      dispatch(changeItemSuccess(itemId));
    })
    .catch(error => {
      console.log(error);
      dispatch(changeItemError());
    });
  };
}

function changeItemRequested(itemId) {
  return {
    type: CHANGE_ITEM_REQUESTED,
    itemId
  };
}

function changeItemSuccess(itemId) {
  return {
    type: CHANGE_ITEM_SUCCESS,
    itemId
  };
}

function changeItemError() {
  return {
    type: CHANGE_ITEM_ERROR
  };
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
