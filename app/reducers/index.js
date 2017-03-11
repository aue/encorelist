import { combineReducers } from 'redux'
import items from './items'
import lists from './lists'

export default combineReducers({
  items,
  lists
})
