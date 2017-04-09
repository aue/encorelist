import { combineReducers } from 'redux'
import account from './account'
import items from './items'
import lists from './lists'
import rewards from './rewards'

export default combineReducers({
  account,
  items,
  lists,
  rewards
})
