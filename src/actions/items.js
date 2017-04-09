import { auth, database, TIMESTAMP } from '../firebase'
import { getLists } from './lists'

export const GET_LIST_ITEM_IDS_REQUEST = 'GET_LIST_ITEM_IDS_REQUEST'
export const GET_LIST_ITEM_IDS_SUCCESS = 'GET_LIST_ITEM_IDS_SUCCESS'
export const GET_LIST_ITEM_IDS_FAILURE = 'GET_LIST_ITEM_IDS_FAILURE'

export const LOAD_ITEMS_REQUEST = 'GET_ITEMS_REQUEST'
export const LOAD_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS'
export const LOAD_ITEMS_FAILURE = 'GET_ITEMS_FAILURE'

export const ADD_LIST_ITEM_REQUEST = 'ADD_LIST_ITEM_REQUEST'
export const ADD_LIST_ITEM_SUCCESS = 'ADD_LIST_ITEM_SUCCESS'
export const ADD_LIST_ITEM_FAILURE = 'ADD_LIST_ITEM_FAILURE'

export const REMOVE_LIST_ITEM_REQUEST = 'REMOVE_LIST_ITEM_REQUEST'
export const REMOVE_LIST_ITEM_SUCCESS = 'REMOVE_LIST_ITEM_SUCCESS'
export const REMOVE_LIST_ITEM_FAILURE = 'REMOVE_LIST_ITEM_FAILURE'

export const CHANGE_LIST_ITEM_REQUEST = 'CHANGE_LIST_ITEM_REQUEST'
export const CHANGE_LIST_ITEM_SUCCESS = 'CHANGE_LIST_ITEM_SUCCESS'
export const CHANGE_LIST_ITEM_FAILURE = 'CHANGE_LIST_ITEM_FAILURE'

/*
* Fetch item ids in a list
*/
export function getListItemIds(listId) {
  return (dispatch, getState) => {
    dispatch({ type: GET_LIST_ITEM_IDS_REQUEST, listId })

    if (getState().lists.listIds[listId]) {
      // if list is cache in store, use that
      let itemIds = getState().lists.lists[listId].items
      dispatch({ type: GET_LIST_ITEM_IDS_SUCCESS, listId, itemIds: itemIds })
      return new Promise((resolve) => resolve()) // hacky
    }
    else {
      // else fetch list
      return dispatch(getLists([listId])).then(() => {
        if (getState().lists.listIds[listId]) {
          let itemIds = getState().lists.lists[listId].items
          dispatch({ type: GET_LIST_ITEM_IDS_SUCCESS, listId, itemIds: itemIds })
        }
        else
          dispatch({ type: GET_LIST_ITEM_IDS_FAILURE, listId, error: 'Could not fetch list items' })
      })
    }
  }
}

/*
* Load items from ids into store
*/
export function loadItems(itemIds) {
  return (dispatch, getState) => {
    dispatch({ type: LOAD_ITEMS_REQUEST, itemIds })

    let state = getState()
    let itemsToFetch = []

    for (let itemId of itemIds) {
      if (!state.items[itemId]) itemsToFetch.push(itemId)
    }

    // fetch from online if not found in store
    if (itemsToFetch.length > 0) {
      let promises = itemsToFetch.map(itemId => {
        return database.ref('/items/').child(itemId).once('value')
      })

      return Promise.all(promises).then(snapshots => {
        snapshots = snapshots
          .map(snapshot => snapshot.val())
          .filter(value => value !== null)

        let items = {}
        for (let item of snapshots) {
          items[item.id] = item
        }

        dispatch({ type: LOAD_ITEMS_SUCCESS, itemIds, items })
      })
      .catch(error => {
        dispatch({ type: LOAD_ITEMS_FAILURE, itemIds, error })
        throw error
      })
    }
    else {
      dispatch({ type: LOAD_ITEMS_SUCCESS, itemIds, items: {} })
    }
  }
}

/*
* Fetch all items in a given list
*/
export function getListItems(listId) {
  return (dispatch, getState) => {
    return dispatch(getListItemIds(listId)).then(() => {
      const itemIds = Object.keys(getState().lists.lists[listId].items)
      if (itemIds.length > 0)
        return dispatch(loadItems(itemIds))
      else
        return
    })
  }
}

/*
* Adding an item to a list
*/
export function addListItem(listId, data) {
  return dispatch => {
    let newItemId = database.ref().child('items').push().key
    dispatch({ type: ADD_LIST_ITEM_REQUEST, listId, newItemId, data })
    const userId = auth.currentUser.uid

    let newItem = {
      id: newItemId,
      userId,
      title: data.title || '',
      points: parseInt(data.points, 10) || 0,
      complete: false,
      time: TIMESTAMP
    }
    let updates = {}
    updates[`/items/${newItemId}`] = newItem
    updates[`/lists/${listId}/items/${newItemId}`] = true

    return database.ref().update(updates).then(() => {
      dispatch({ type: ADD_LIST_ITEM_SUCCESS, listId, itemId: newItemId, item: newItem })
    })
    .catch(error => {
      dispatch({ type: ADD_LIST_ITEM_FAILURE, listId, newItemId, data, error })
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
export function changeListItem(itemId, data) {
  return dispatch => {
    dispatch({ type: CHANGE_LIST_ITEM_REQUEST, itemId, data })

    return database.ref('/items/').child(itemId).update(data).then(() => {
      dispatch({ type: CHANGE_LIST_ITEM_SUCCESS, itemId, data })
    })
    .catch(error => {
      dispatch({ type: CHANGE_LIST_ITEM_FAILURE, itemId, error })
      throw error
    })
  }
}
