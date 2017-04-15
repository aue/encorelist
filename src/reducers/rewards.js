import {
  GET_USER_REWARD_IDS_REQUEST,
  GET_USER_REWARD_IDS_SUCCESS,
  GET_USER_REWARD_IDS_FAILURE,
  GET_REWARDS_REQUEST,
  GET_REWARDS_SUCCESS,
  GET_REWARDS_FAILURE,
  ADD_REWARD_REQUEST,
  ADD_REWARD_SUCCESS,
  ADD_REWARD_FAILURE,
  REMOVE_REWARD_REQUEST,
  REMOVE_REWARD_SUCCESS,
  REMOVE_REWARD_FAILURE,
  CHANGE_REWARD_REQUEST,
  CHANGE_REWARD_SUCCESS,
  CHANGE_REWARD_FAILURE,
} from '../actions/rewards'

const initialState = {
  rewardIds: {},
  rewards: {},
  loadingRewardIds: false,
  loadingRewards: false,
  error: null,
  adding: false,
  changing: false,
  init: false
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_REWARD_IDS_REQUEST:
      return {
        ...state,
        loadingRewardIds: true
      }
    case GET_USER_REWARD_IDS_SUCCESS:
      return {
        ...state,
        rewardIds: {
          ...state.rewardIds,
          ...action.rewardIds
        },
        loadingRewardIds: false
      }
    case GET_USER_REWARD_IDS_FAILURE:
      return {
        ...state,
        loadingRewardIds: false,
        error: true
      }

    case GET_REWARDS_REQUEST:
      return {
        ...state,
        loadingRewards: true
      }
    case GET_REWARDS_SUCCESS:
      return {
        ...state,
        rewards: {
          ...state.rewards,
          ...action.rewards
        },
        loadingRewards: false,
        init: true
      }
    case GET_REWARDS_FAILURE:
      return {
        ...state,
        loadingRewards: false,
        error: true
      }

    case ADD_REWARD_REQUEST:
      return {
        ...state,
        error: null,
        adding: true,
      }
    case ADD_REWARD_SUCCESS: {
      let rewardIds = { ...state.rewardIds }
      rewardIds[action.rewardId] = true

      let rewards = { ...state.rewards }
      rewards[action.rewardId] = action.reward

      return {
        ...state,
        error: null,
        rewardIds,
        rewards,
        adding: false
      }
    }
    case ADD_REWARD_FAILURE:
      return {
        ...state,
        error: action.error,
        adding: false
      }

    case REMOVE_REWARD_REQUEST: {
      return {
        ...state
      }
    }
    case REMOVE_REWARD_SUCCESS: {
      let rewardIds = { ...state.rewardIds }
      delete rewardIds[action.rewardId]

      let rewards = { ...state.rewards }
      delete rewards[action.rewardId]

      return {
        ...state,
        error: null,
        rewardIds,
        rewards
      }
    }
    case REMOVE_REWARD_FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }

    case CHANGE_REWARD_REQUEST:
      return {
        ...state,
        changing: true
      }
    case CHANGE_REWARD_SUCCESS: {
      let rewards = { ...state.rewards }
      rewards[action.rewardId] = {
        ...rewards[action.rewardId],
        ...action.data
      }

      return {
        ...state,
        rewards,
        changing: false
      }
    }
    case CHANGE_REWARD_FAILURE:
      return {
        ...state,
        changing: false
      }

    default:
      return state
  }
}
