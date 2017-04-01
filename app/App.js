import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'
import { StackNavigator, TabNavigator } from 'react-navigation'

import configureStore from './store/configureStore'

import LoadingContainer from './containers/LoadingContainer'
import ListsContainer from './containers/ListsContainer'
import ListDetailsContainer from './containers/ListDetailsContainer'
import ItemsContainer from './containers/ItemsContainer'
import ItemDetailsContainer from './containers/ItemDetailsContainer'
import RewardsContainer from './containers/RewardsContainer'
import AccountContainer from './containers/AccountContainer'
import OnboardingContainer from './containers/OnboardingContainer'
import OnboardingFormContainer from './containers/OnboardingFormContainer'

const AppStack = StackNavigator({
  Loading: { screen: LoadingContainer },

  Onboarding: {
    screen:
      StackNavigator({
        WelcomeScreen: { screen: OnboardingContainer },
        FormScreen: { screen: OnboardingFormContainer }
      }, {
        initialRouteName: 'WelcomeScreen',
      })
  },

  Container: {
    screen:
      TabNavigator({
        ListsTab: {
          screen: StackNavigator({
            Lists: { screen: ListsContainer, navigationOptions: { title: 'Encore List' } },
            ListDetails: { screen: ListDetailsContainer },
            Items: { screen: ItemsContainer },
            ItemDetails: { screen: ItemDetailsContainer }
          }),
          navigationOptions: { tabBar: { label: 'Lists' } }
        },
        RewardsTab: {
          screen: StackNavigator({
            Rewards: { screen: RewardsContainer }
          }),
          navigationOptions: { tabBar: { label: 'Rewards' } }
        },
        AccountTab: {
          screen: StackNavigator({
            Account: { screen: AccountContainer }
          }),
          navigationOptions: { tabBar: { label: 'Account' } }
        }
      }, {
        initialRouteName: 'ListsTab',
        swipeEnabled: false,
        tabBarOptions: {
          style: {
            backgroundColor: '#000',
          }
        },
        tabBarPosition: 'bottom'
      })
  }
}, {
  initialRouteName: 'Loading',
  headerMode: 'none'
})

const store = configureStore()

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppStack />
      </Provider>
    )
  }
}

AppRegistry.registerComponent('encorelist', () => App)
