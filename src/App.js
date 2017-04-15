import React from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'
import { Actions, Scene, Router } from 'react-native-router-flux'

import Reactotron from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'
Reactotron
  .configure()
  .use(reactotronRedux())
  .connect()

import styles from './styles'

import LoadingContainer from './containers/LoadingContainer'
import ListsContainer from './containers/ListsContainer'
import ListDetailsContainer from './containers/ListDetailsContainer'
import ItemsContainer from './containers/ItemsContainer'
import ItemDetailsContainer from './containers/ItemDetailsContainer'
import RewardsContainer from './containers/RewardsContainer'
import RewardDetailsContainer from './containers/RewardDetailsContainer'
import RewardRedeemContainer from './containers/RewardRedeemContainer'
import AccountContainer from './containers/AccountContainer'
import OnboardingContainer from './containers/OnboardingContainer'
import OnboardingFormContainer from './containers/OnboardingFormContainer'

import TabButton from './components/TabButton'

import configureStore from './store/configureStore'
const store = configureStore()

const scenes = Actions.create(
  <Scene key="root" navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle}>
    <Scene key="launch" component={LoadingContainer} hideNavBar={true} initial={true} />
    <Scene key="onboarding" type="replace">
      <Scene key="welcome" component={OnboardingContainer} title="Welcome to Encore List" sceneStyle={styles.scene} initial={true} />
      <Scene key="form" component={OnboardingFormContainer} sceneStyle={styles.scene} />
    </Scene>
    <Scene key="app" tabs={true} type="replace" tabBarStyle={styles.tabs}>
      <Scene key="listsTab" title="Lists" icon={TabButton} initial={true}>
        <Scene key="lists" component={ListsContainer} title="Lists" sceneStyle={styles.sceneTabs} />
        <Scene key="listDetails" component={ListDetailsContainer} sceneStyle={styles.scene} hideTabBar={true} />
        <Scene key="items" component={ItemsContainer} sceneStyle={styles.sceneTabs} />
        <Scene key="itemDetails" component={ItemDetailsContainer} sceneStyle={styles.scene} hideTabBar={true} />
      </Scene>
      <Scene key="rewardsTab" title="Rewards" icon={TabButton}>
        <Scene key="rewards" component={RewardsContainer} title="Rewards" sceneStyle={styles.sceneTabs} />
        <Scene key="rewardDetails" component={RewardDetailsContainer} sceneStyle={styles.scene} hideTabBar={true} />
        <Scene key="rewardRedeem" component={RewardRedeemContainer} sceneStyle={styles.scene} hideTabBar={true} />
      </Scene>
      <Scene key="accountTab" component={AccountContainer} title="Account" icon={TabButton} sceneStyle={styles.sceneTabs} />
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
