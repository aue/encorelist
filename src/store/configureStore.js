import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'

import reducers from '../reducers'

export default function configureStore() {
  let store

  if (__DEV__) {
    //store = Reactotron.createStore(reducers, applyMiddleware(thunk))

    if (module.hot) {
      module.hot.accept(() => {
        const nextRootReducer = require('../reducers/index').default
        store.replaceReducer(nextRootReducer)
      })
    }
  }
  else store = createStore(reducers, applyMiddleware(thunk))

  return store
}
