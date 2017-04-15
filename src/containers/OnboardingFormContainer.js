import React, { Component } from 'react'
import { TextInput, Text, View, ScrollView } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'

import * as AccountActions from '../actions/account'

import common from '../styles/common'
import styles from '../styles'
import PillButton from '../components/PillButton'

class OnboardingFormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: this.props.params.mode || 'login',
      email: 'test@example.com',
      password: 'testing'
    }
  }

  validateFormCheck = () => {
    if (this.state.email.length === 0
      || !this.state.email.trim()
      || this.state.password.length === 0
      || !this.state.password.trim()
    ) return false
    return true
  }

  submit = () => {
    if (!this.validateFormCheck() || this.props.waitingForResponse) return

    if (this.state.mode === 'login') {
      this.props.login(this.state.email, this.state.password).then(() => {
        if (this.props.user && !this.props.error) Actions.app()
      })
    }
    else if (this.state.mode === 'signup') {
      this.props.signup(this.state.email, this.state.password).then(() => {
        if (this.props.user && !this.props.error) Actions.app()
      })
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.props.error &&
          <Text style={styles.section}>{this.props.error}</Text>
        }

        <View style={styles.section}>
          <TextInput
            style={styles.formInput}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
            underlineColorAndroid={common.brandPrimary}
            value={this.state.email}
            disabled={this.props.waitingForResponse}
            onChangeText={(email) => this.setState({email})}
            onSubmitEditing={() => this.refs.password.focus()}
          />
          <TextInput
            style={styles.formInput}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid={common.brandPrimary}
            ref='password'
            value={this.state.password}
            disabled={this.props.waitingForResponse}
            onChangeText={(password) => this.setState({password})}
            onSubmitEditing={this.submit}
          />
        </View>

        <View style={styles.section}>
          <PillButton
            onPress={this.submit}
            title={(this.state.mode === 'login')? 'Log In' : 'Sign Up'}
            disabled={!this.validateFormCheck() || this.props.waitingForResponse}
          />
        </View>
      </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingFormContainer)
