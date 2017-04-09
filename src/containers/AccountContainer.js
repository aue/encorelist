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
      const resetAction = NavigationActions.reset({
        index: 0,
        key: 'Init',
        actions: [
          NavigationActions.navigate({ routeName: 'Onboarding' })
        ]
      })
      this.props.navigation.dispatch(resetAction)
    })
  }

  render() {
    return (
      <View>
        <Text>Profile</Text>
        <Text>Name</Text>
        <Text>Number of points</Text>
        <Text>Notifications</Text>
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
