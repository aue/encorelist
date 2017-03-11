import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'
import { StackNavigator, TabNavigator } from 'react-navigation'

import configureStore from './store/configureStore'

import ItemsContainer from './containers/ItemsContainer'
import ListsContainer from './containers/ListsContainer'
import RewardsContainer from './containers/RewardsContainer'

const AppNavigator = StackNavigator({
  Lists: { screen: ListsContainer, navigationOptions: { title: 'Encore List' } },
  Items: { screen: ItemsContainer },
  Rewards: { screen: RewardsContainer }
}, {
  initialRouteName: 'Lists',
  cardStyle: { backgroundColor: '#fff' }
});

const store = configureStore()

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    )
  }
}

AppRegistry.registerComponent('encorelist', () => App)
