import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'

import { auth } from '../firebase'

import * as AccountActions from '../actions/account'
import AccountForm from '../components/AccountForm'

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
    if (auth.currentUser)
      return (
        <AccountForm
          displayName={auth.currentUser.displayName}
          email={auth.currentUser.email}
          { ...this.props }
          logout={this.logout.bind(this)}
        />
      )
    else
      return null
  }
}

const mapStateToProps = (state) => {
  return {
    points: state.account.points,
    redeemedPoints: state.account.redeemedPoints,
    error: state.account.error,
    user: state.account.user,
    waitingForResponse: state.account.waitingForResponse
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(AccountActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer)
