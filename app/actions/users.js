import database from '../database';

export const ADD_ITEM = 'ADD_ITEM'
export const ADD_ITEM_SUCCESS = 'ADD_ITEM_SUCCESS'
export const REMOVE_ITEM = 'REMOVE_ITEM'
export const REMOVE_ITEM_SUCCESS = 'REMOVE_ITEM_SUCCESS'
export const CHANGE_ITEM = 'CHANGE_ITEM'
export const CHANGE_ITEM_SUCCESS = 'CHANGE_ITEM_SUCCESS'
export const OFFLINE_ITEMS_LOADED = 'OFFLINE_ITEMS_LOADED'
export const CONNECTION_CHECKING = 'CONNECTION_CHECKING'
export const CONNECTION_CHECKED = 'CONNECTION_CHECKED'
export const CONNECTION_ONLINE = 'CONNECTION_ONLINE'
export const CONNECTION_OFFLINE = 'CONNECTION_OFFLINE'


function writeUserData(userId, name, email, imageUrl) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}

/*
 * Fetching all items in a list
 */
export function getListItems(listId) {
  return dispatch => {
    dispatch(getListItemsRequested());
    return database.ref('/').once('value', snap => {
      const invite = snap.val();
      dispatch(getInviteFulfilledAction(invite))
    })
    .catch(error => {
      console.log(error);
      dispatch(getListItemsError());
    });
  }
}

function getListItemsRequested() {
  return {
    type: ActionTypes.GetInviteRequested
  };
}

function getListItemsSuccess(items) {
  return {
    type: ActionTypes.GetInviteFulfilled,
    items
  };
}

function getListItemsError() {
  return {
    type: ActionTypes.GetInviteRejected
  }
}

/*
 * Adding an item to a list
 */
export const addItem = (title) => {
  const id = Math.random().toString(36).substring(7)
  const itemRef = itemsRef.child(id)

  itemRef.set({
    id,
    title: title,
    points: 0,
    complete: false,
    time: new Date().getTime()
  })

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

export const changeItem = (id, data) => {
  let updates = {}
  updates[id] = data
  itemRef.update(updates)

  return {
    type: CHANGE_ITEM,
  }
}

export const changeItemSuccess = (id) => {
  return {
    type: CHANGE_ITEM_SUCCESS,
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
