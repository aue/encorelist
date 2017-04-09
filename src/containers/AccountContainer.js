import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'

import * as AccountActions from '../actions/account'

class AccountContainer extends Component {
  constructor(props) {
    super(props)
  }

  logout() {
    this.props.logout().then(() => {
      Actions.onboarding()
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
