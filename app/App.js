import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'
import { StackNavigator, TabNavigator } from 'react-navigation'

import configureStore from './store/configureStore'

import ListsContainer from './containers/ListsContainer'
import ItemsContainer from './containers/ItemsContainer'
import ItemDetailsContainer from './containers/ItemDetailsContainer'
import RewardsContainer from './containers/RewardsContainer'
import AccountContainer from './containers/AccountContainer'

const ListStack = StackNavigator({
  Lists: { screen: ListsContainer, navigationOptions: { title: 'Encore List' } },
  Items: { screen: ItemsContainer },
  ItemDetails: { screen: ItemDetailsContainer }
}, {
  cardStyle: { backgroundColor: '#fff' }
})

const RewardStack = StackNavigator({
  Rewards: { screen: RewardsContainer }
}, {
  cardStyle: { backgroundColor: '#fff' }
})

const AccountStack = StackNavigator({
  Account: { screen: AccountContainer }
}, {
  cardStyle: { backgroundColor: '#fff' }
})

const Tabs = TabNavigator({
  ListsTab: {
    screen: ListStack,
    navigationOptions: {
      tabBar: {
        label: 'Lists'
      }
    }
  },
  RewardsTab: {
    screen: RewardStack,
    navigationOptions: {
      tabBar: {
        label: 'Rewards'
      }
    }
  },
  AccountTab: {
    screen: AccountStack,
    navigationOptions: {
      tabBar: {
        label: 'Account'
      }
    }
  }
}, {
  initialRouteName: 'ListsTab',
  swipeEnabled: false,
  tabBarOptions: {
    style: {
      backgroundColor: '#000',
    }
  }
})

const store = configureStore()

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Tabs />
      </Provider>
    )
  }
}

AppRegistry.registerComponent('encorelist', () => App)
