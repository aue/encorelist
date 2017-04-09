import React from 'react'
import { AppRegistry, Navigator, StyleSheet, Text } from 'react-native'
import { Provider } from 'react-redux'
import { Actions, Scene, Router } from 'react-native-router-flux'

import Reactotron from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'
Reactotron
  .configure()
  .use(reactotronRedux())
  .connect()

import LoadingContainer from './containers/LoadingContainer'
import ListsContainer from './containers/ListsContainer'
import ListDetailsContainer from './containers/ListDetailsContainer'
import ItemsContainer from './containers/ItemsContainer'
import ItemDetailsContainer from './containers/ItemDetailsContainer'
import RewardsContainer from './containers/RewardsContainer'
import RewardDetailsContainer from './containers/RewardDetailsContainer'
import AccountContainer from './containers/AccountContainer'
import OnboardingContainer from './containers/OnboardingContainer'
import OnboardingFormContainer from './containers/OnboardingFormContainer'

import configureStore from './store/configureStore'
const store = configureStore()

class TabIcon extends React.Component {
  render() {
    return (
      <Text style={{color: this.props.selected ? 'red' :'black'}}>{this.props.title}</Text>
    )
  }
}

const styles = StyleSheet.create({
  scene: {
    paddingTop: Navigator.NavigationBar.Styles.General.NavBarHeight
  }
})

const scenes = Actions.create(
  <Scene key="root" >
    <Scene key="launch" component={LoadingContainer} hideNavBar={true} initial={true} />
    <Scene key="onboarding" type="replace">
      <Scene key="welcome" component={OnboardingContainer} title="Welcome to Encore List" sceneStyle={styles.scene} initial={true} />
      <Scene key="form" component={OnboardingFormContainer} sceneStyle={styles.scene} />
    </Scene>
    <Scene key="app" tabs={true} type="replace">
      <Scene key="listsTab" title="Lists" icon={TabIcon} initial={true}>
        <Scene key="lists" component={ListsContainer} title="Lists" sceneStyle={styles.scene} />
        <Scene key="listDetails" component={ListDetailsContainer} sceneStyle={styles.scene} hideTabBar={true} />
        <Scene key="items" component={ItemsContainer} sceneStyle={styles.scene} />
        <Scene key="itemDetails" component={ItemDetailsContainer} sceneStyle={styles.scene} hideTabBar={true} />
      </Scene>
      <Scene key="rewardsTab" title="Rewards" icon={TabIcon}>
        <Scene key="rewards" component={RewardsContainer} title="Rewards" sceneStyle={styles.scene} />
        <Scene key="rewardDetails" component={RewardDetailsContainer} sceneStyle={styles.scene} hideTabBar={true} />
      </Scene>
      <Scene key="accountTab" component={AccountContainer} title="Account" icon={TabIcon} sceneStyle={styles.scene} />
    </Scene>
  </Scene>
)

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router scenes={scenes} />
      </Provider>
    )
  }
}

AppRegistry.registerComponent('encorelist', () => App)
