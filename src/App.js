import React from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'
import { Actions, Scene, Router } from 'react-native-router-flux'

import styles from './styles'

import LoadingContainer from './containers/LoadingContainer'
import ListsContainer from './containers/ListsContainer'
import ListDetailsContainer from './containers/ListDetailsContainer'
import ItemsContainer from './containers/ItemsContainer'
import ItemDetailsContainer from './containers/ItemDetailsContainer'
import RewardsContainer from './containers/RewardsContainer'
import RewardDetailsContainer from './containers/RewardDetailsContainer'
import RewardRedeemContainer from './containers/RewardRedeemContainer'
import RewardRedeemSuccessContainer from './containers/RewardRedeemSuccessContainer'
import AccountContainer from './containers/AccountContainer'
import OnboardingContainer from './containers/OnboardingContainer'
import OnboardingFormContainer from './containers/OnboardingFormContainer'

import TabButton from './components/TabButton'

import configureStore from './store/configureStore'
const store = configureStore()

const scenes = Actions.create(
  <Scene key="root">
    <Scene key="launch" component={LoadingContainer} hideNavBar={true} initial={true} />
    <Scene key="onboarding" type="replace" navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} backButtonTextStyle={styles.navBarLeftButton} leftButtonIconStyle={styles.navBarLeftButtonIcon}>
      <Scene key="welcome" component={OnboardingContainer} title="Encore List" sceneStyle={styles.scene} initial={true} />
      <Scene key="form" component={OnboardingFormContainer} sceneStyle={styles.scene} />
    </Scene>
    <Scene key="app" tabs={true} type="replace" tabBarStyle={styles.tabs}>
      <Scene key="listsTab" title="Lists" icon={TabButton} initial={true} navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} backButtonTextStyle={styles.navBarLeftButton} leftButtonIconStyle={styles.navBarLeftButtonIcon}>
        <Scene key="lists" component={ListsContainer} title="Lists" sceneStyle={styles.sceneTabs} />
        <Scene key="listDetails" component={ListDetailsContainer} sceneStyle={styles.scene} hideTabBar={true} />
        <Scene key="items" component={ItemsContainer} sceneStyle={styles.sceneTabs} navigationBarStyle={styles.navBarAlt} titleStyle={styles.navBarTitleAlt} backButtonTextStyle={styles.navBarLeftButtonAlt} leftButtonIconStyle={styles.navBarLeftButtonIconAlt} />
        <Scene key="itemDetails" component={ItemDetailsContainer} sceneStyle={styles.scene} hideTabBar={true} />
      </Scene>
      <Scene key="rewardsTab" title="Rewards" icon={TabButton} navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} backButtonTextStyle={styles.navBarLeftButton} leftButtonIconStyle={styles.navBarLeftButtonIcon}>
        <Scene key="rewards" component={RewardsContainer} title="Rewards" sceneStyle={styles.sceneTabs} />
        <Scene key="rewardDetails" component={RewardDetailsContainer} sceneStyle={styles.scene} hideTabBar={true} />
        <Scene key="rewardRedeem" component={RewardRedeemContainer} sceneStyle={styles.scene} hideTabBar={true} />
        <Scene key="rewardRedeemSuccess" component={RewardRedeemSuccessContainer} sceneStyle={styles.scene} hideTabBar={true} navigationBarStyle={styles.navBarAlt} titleStyle={styles.navBarTitleAlt} backButtonTextStyle={styles.navBarLeftButtonAlt} leftButtonIconStyle={styles.navBarLeftButtonIconAlt} />
      </Scene>
      <Scene key="accountTab" component={AccountContainer} title="Account" icon={TabButton} sceneStyle={styles.sceneTabs} navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} backButtonTextStyle={styles.navBarLeftButton} leftButtonIconStyle={styles.navBarLeftButtonIcon} />
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
