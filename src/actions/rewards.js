import { auth, database, TIMESTAMP } from '../firebase'

export const GET_USER_REWARD_IDS_REQUEST = 'GET_USER_REWARD_IDS_REQUEST'
export const GET_USER_REWARD_IDS_SUCCESS = 'GET_USER_REWARD_IDS_SUCCESS'
export const GET_USER_REWARD_IDS_FAILURE = 'GET_USER_REWARD_IDS_FAILURE'

export const GET_REWARDS_REQUEST = 'GET_REWARDS_REQUEST'
export const GET_REWARDS_SUCCESS = 'GET_REWARDS_SUCCESS'
export const GET_REWARDS_FAILURE = 'GET_REWARDS_FAILURE'

export const ADD_REWARD_REQUEST = 'ADD_REWARD_REQUEST'
export const ADD_REWARD_SUCCESS = 'ADD_REWARD_SUCCESS'
export const ADD_REWARD_FAILURE = 'ADD_REWARD_FAILURE'

export const REMOVE_REWARD_REQUEST = 'REMOVE_REWARD_REQUEST'
export const REMOVE_REWARD_SUCCESS = 'REMOVE_REWARD_SUCCESS'
export const REMOVE_REWARD_FAILURE = 'REMOVE_REWARD_FAILURE'

/*
* Fetch rewards ids in user's account
*/
export function getUserRewardIds(userId) {
  return dispatch => {
    dispatch({ type: GET_USER_REWARD_IDS_REQUEST, userId })

    return database.ref(`/users/${userId}/rewards`).once('value', snapshot => {
      let rewardIds = snapshot.val()
      if (rewardIds == null) rewardIds = {}

      dispatch({ type: GET_USER_REWARD_IDS_SUCCESS, userId, rewardIds })
    })
    .catch(error => {
      dispatch({ type: GET_USER_REWARD_IDS_FAILURE, userId, error: error.message })
      if (__DEV__) throw error
    })
  }
}

/*
* Fetch lists from ids
*/
export function getRewards(rewardIds) {
  if (rewardIds.length < 1) return

  return dispatch => {
    dispatch({ type: GET_REWARDS_REQUEST, rewardIds })

    let promises = rewardIds.map(rewardId => {
      return database.ref('/rewards/').child(rewardId).once('value')
    })

    return Promise.all(promises).then(snapshots => {
      snapshots = snapshots
        .map(snapshot => snapshot.val())
        .filter(value => value !== null)

      let rewards = {}
      for (let reward of snapshots) {
        let rewardTemplate = {
          id: '',
          title: '',
          time: 0,
          pointCost: 0,
          userId: ''
        }

        rewards[reward.id] = {
          ...rewardTemplate,
          ...reward
        }
      }

      dispatch({ type: GET_REWARDS_SUCCESS, rewardIds, rewards })
    })
    .catch(error => {
      dispatch({ type: GET_REWARDS_FAILURE, rewardIds, error: error.message })
      if (__DEV__) throw error
    })
  }
}

/*
* Fetch all rewards in a given user's account
*/
export function getUserRewards(userId) {
  return (dispatch, getState) => {
    return dispatch(getUserRewardIds(userId)).then(() => {
      const rewardIds = Object.keys(getState().rewards.rewardIds)
      if (rewardIds.length > 0)
        return dispatch(getRewards(rewardIds))
      else
        return
    })
  }
}

/*
* Adding a reward
*/
export function addReward(data) {
  return dispatch => {
    let newReward = {
      id: database.ref().child('lists').push().key,
      title: data.title || '',
      time: TIMESTAMP,
      pointCost: data.pointCost,
      userId: auth.currentUser.uid
    }

    let updates = {}
    updates[`/rewards/${newReward.id}`] = newReward
    updates[`/users/${newReward.userId}/rewards/${newReward.id}`] = true

    dispatch({ type: ADD_REWARD_REQUEST, updates })

    return database.ref().update(updates).then(() => {
      dispatch({ type: ADD_REWARD_SUCCESS, rewardId: newReward.id, reward: newReward })
    })
    .catch(error => {
      dispatch({ type: ADD_REWARD_FAILURE, error: error.message })
      if (__DEV__) throw error
    })
  }
}

/*
* Removing a reward
*/
export function removeReward(rewardId) {
  return dispatch => {
    dispatch({ type: REMOVE_REWARD_REQUEST, rewardId })

    let updates = {}
    updates[`/rewards/${rewardId}`] = null // remove from rewards
    updates[`/users/${auth.currentUser.uid}/rewards/${rewardId}`] = null // remove from user account

    return database.ref().update(updates).then(() => {
      dispatch({ type: REMOVE_REWARD_SUCCESS, rewardId })
    })
    .catch(error => {
      dispatch({ type: REMOVE_REWARD_FAILURE, rewardId, error: error.message })
      if (__DEV__) throw error
    })
  }
}
