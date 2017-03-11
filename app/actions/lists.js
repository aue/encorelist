import database from '../database';

export const GET_USER_LIST_IDS_REQUEST = 'GET_USER_LIST_IDS_REQUEST';
export const GET_USER_LIST_IDS_SUCCESS = 'GET_USER_LIST_IDS_SUCCESS';
export const GET_USER_LIST_IDS_FAILURE = 'GET_USER_LIST_IDS_FAILURE';

export const GET_LISTS_REQUEST = 'GET_LISTS_REQUEST';
export const GET_LISTS_SUCCESS = 'GET_LISTS_SUCCESS';
export const GET_LISTS_FAILURE = 'GET_LISTS_FAILURE';
/*
export const ADD_LIST_ITEM_REQUEST = 'ADD_LIST_ITEM_REQUEST';
export const ADD_LIST_ITEM_SUCCESS = 'ADD_LIST_ITEM_SUCCESS';
export const ADD_LIST_ITEM_FAILURE = 'ADD_LIST_ITEM_FAILURE';

export const REMOVE_LIST_ITEM_REQUEST = 'REMOVE_LIST_ITEM_REQUEST';
export const REMOVE_LIST_ITEM_SUCCESS = 'REMOVE_LIST_ITEM_SUCCESS';
export const REMOVE_LIST_ITEM_FAILURE = 'REMOVE_LIST_ITEM_FAILURE';

export const CHANGE_ITEM_REQUEST = 'CHANGE_ITEM_REQUEST';
export const CHANGE_ITEM_SUCCESS = 'CHANGE_ITEM_SUCCESS';
export const CHANGE_ITEM_FAILURE = 'CHANGE_ITEM_FAILURE';*/

/*
* Fetch lists ids in user's account
*/
export function getUserListIds(userId) {
  return dispatch => {
    dispatch({ type: GET_USER_LIST_IDS_REQUEST, userId })

    return database.ref(`/users/${userId}/lists`).once('value', snapshot => {
      let data = snapshot.val()
      let listIds = Object.keys(data)
      dispatch({ type: GET_USER_LIST_IDS_SUCCESS, userId, listIds })
    })
    .catch(error => {
      dispatch({ type: GET_USER_LIST_IDS_FAILURE, userId, error })
      throw error
    })
  }
}

/*
* Fetch lists from ids
*/
export function getLists(listIds) {
  return dispatch => {
    dispatch({ type: GET_LISTS_REQUEST, listIds })

    let promises = listIds.map(listId => {
      return database.ref('/lists/').child(listId).once('value')
    });

    return Promise.all(promises).then(snapshots => {
      let lists = snapshots
        .map(snapshot => snapshot.val())
        .filter(value => value !== null)
      dispatch({ type: GET_LISTS_SUCCESS, listIds, lists })
    })
    .catch(error => {
      dispatch({ type: GET_LISTS_FAILURE, listIds, error })
      throw error
    })
  }
}

/*
* Fetch all lists in a given user's account
*/
export function getUserLists(userId) {
  return (dispatch, getState) => {
    return dispatch(getUserListIds(userId)).then(() => {
      const listIds = getState().lists.listIds
      return dispatch(getLists(listIds))
    })
  }
}

/*
* Adding an item to a list
*
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
*
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
 *
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
}*/
