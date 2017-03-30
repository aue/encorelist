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
import OnboardingContainer from './containers/OnboardingContainer'
import OnboardingFormContainer from './containers/OnboardingFormContainer'

const AppStack = StackNavigator({
  Onboarding: {
    screen:
      StackNavigator({
        WelcomeScreen: { screen: OnboardingContainer },
        FormContainer: { screen: OnboardingFormContainer }
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
        },

        OnboardingTab: {
          screen: StackNavigator({
            WelcomeScreen: { screen: OnboardingContainer }
          }),
          navigationOptions: { tabBar: { label: 'Onboarding' } }
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
  initialRouteName: 'Onboarding',
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
