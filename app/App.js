import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'
import View from './containers/View'
import configureStore from './store/configureStore'

const store = configureStore()

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View />
      </Provider>
    )
  }
}

AppRegistry.registerComponent('encorelist', () => App)
