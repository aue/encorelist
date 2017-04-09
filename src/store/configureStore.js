import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import Reactotron from 'reactotron-react-native'

import reducers from '../reducers'

export default function configureStore(initialState) {
  //const store = createStore(reducers, applyMiddleware(thunk), applyMiddleware(logger))
  const store = Reactotron.createStore(reducers, applyMiddleware(thunk))

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('../reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store
}
