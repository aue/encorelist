import { auth, database, TIMESTAMP } from '../firebase'

export const GET_USER_LIST_IDS_REQUEST = 'GET_USER_LIST_IDS_REQUEST'
export const GET_USER_LIST_IDS_SUCCESS = 'GET_USER_LIST_IDS_SUCCESS'
export const GET_USER_LIST_IDS_FAILURE = 'GET_USER_LIST_IDS_FAILURE'

export const GET_LISTS_REQUEST = 'GET_LISTS_REQUEST'
export const GET_LISTS_SUCCESS = 'GET_LISTS_SUCCESS'
export const GET_LISTS_FAILURE = 'GET_LISTS_FAILURE'

export const ADD_LIST_REQUEST = 'ADD_LIST_REQUEST'
export const ADD_LIST_SUCCESS = 'ADD_LIST_SUCCESS'
export const ADD_LIST_FAILURE = 'ADD_LIST_FAILURE'

export const REMOVE_LIST_REQUEST = 'REMOVE_LIST_REQUEST'
export const REMOVE_LIST_SUCCESS = 'REMOVE_LIST_SUCCESS'
export const REMOVE_LIST_FAILURE = 'REMOVE_LIST_FAILURE'

/*
* Fetch lists ids in user's account
*/
export function getUserListIds(userId) {
  return dispatch => {
    dispatch({ type: GET_USER_LIST_IDS_REQUEST, userId })

    return database.ref(`/users/${userId}/lists`).once('value', snapshot => {
      let listIds = snapshot.val()
      if (listIds == null) listIds = {}

      dispatch({ type: GET_USER_LIST_IDS_SUCCESS, userId, listIds })
    })
    .catch(error => {
      dispatch({ type: GET_USER_LIST_IDS_FAILURE, userId, error: error.message })
      if (__DEV__) throw error
    })
  }
}

/*
* Fetch lists from ids
*/
export function getLists(listIds) {
  if (listIds.length <= 0) return

  return dispatch => {
    dispatch({ type: GET_LISTS_REQUEST, listIds })

    let promises = listIds.map(listId => {
      return database.ref('/lists/').child(listId).once('value')
    })

    return Promise.all(promises).then(snapshots => {
      snapshots = snapshots
        .map(snapshot => snapshot.val())
        .filter(value => value !== null)

      let lists = {}
      for (let list of snapshots) {
        let listTemplate = {
          id: '',
          title: '',
          time: 0,
          totalPoints: 0,
          completedPoints: 0,
          userId: '',
          items: {}
        }

        lists[list.id] = {
          ...listTemplate,
          ...list
        }
      }

      dispatch({ type: GET_LISTS_SUCCESS, listIds, lists })
    })
    .catch(error => {
      dispatch({ type: GET_LISTS_FAILURE, listIds, error: error.message })
      if (__DEV__) throw error
    })
  }
}

/*
* Fetch all lists in a given user's account
*/
export function getUserLists(userId) {
  return (dispatch, getState) => {
    return dispatch(getUserListIds(userId)).then(() => {
      const listIds = Object.keys(getState().lists.listIds)
      if (listIds.length > 0)
        return dispatch(getLists(listIds))
      else
        return
    })
  }
}

/*
* Adding a list
*/
export function addList(data) {
  return dispatch => {
    let newListId = database.ref().child('lists').push().key
    const userId = auth.currentUser.uid
    let newList = {
      id: newListId,
      title: data.title || '',
      time: TIMESTAMP,
      totalPoints: 0,
      completedPoints: 0,
      userId: userId,
      items: {}
    }
    let updates = {}
    updates[`/lists/${newListId}`] = newList
    updates[`/users/${userId}/lists/${newListId}`] = true

    dispatch({ type: ADD_LIST_REQUEST, updates })

    return database.ref().update(updates).then(() => {
      dispatch({ type: ADD_LIST_SUCCESS, listId: newListId, list: newList })
    })
    .catch(error => {
      dispatch({ type: ADD_LIST_FAILURE, error: error.message })
    })
  }
}

/*
* Removing a list
*/
export function removeList(listId) {
  return (dispatch, getState) => {
    dispatch({ type: REMOVE_LIST_REQUEST, listId })

    let updates = {}
    updates[`/lists/${listId}`] = null // remove from lists
    updates[`/users/${auth.currentUser.uid}/lists/${listId}`] = null // remove from user account

    // remove every item in list
    let itemIds = Object.keys(getState().lists.lists[listId].items)
    for (let itemId of itemIds) {
      updates[`/items/${itemId}`] = null
    }

    return database.ref().update(updates).then(() => {
      dispatch({ type: REMOVE_LIST_SUCCESS, listId, itemIds })
    })
    .catch(error => {
      dispatch({ type: REMOVE_LIST_FAILURE, listId, error: error.message })
      if (__DEV__) throw error
    })
  }
}
