import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import * as AccountActions from '../actions/account'

class AccountContainer extends Component {
  constructor(props) {
    super(props)
  }

  static navigationOptions = {
    title: 'Account'
  }

  logout() {
    this.props.logout().then(() => {
      const navigateAction = NavigationActions.navigate({
        routeName: 'Onboarding',
        action: NavigationActions.navigate({ routeName: 'WelcomeScreen' })
      })
      this.props.navigation.dispatch(navigateAction)
    })

    /*const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Welcome' })
      ]
    })
    this.props.navigation.dispatch(resetAction)*/
  }

  render() {
    return (
      <View>
        <Text>My account here Coming Soon</Text>
        <Button
          title="Logout"
          onPress={() => this.logout()}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.account.error,
    user: state.account.user,
    waitingForResponse: state.account.waitingForResponse
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(AccountActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer)
