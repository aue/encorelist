import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, TextInput, Text, View, ScrollView } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'

import * as AccountActions from '../actions/account'

class OnboardingFormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: this.props.params.mode || 'login',
      email: 'test@example.com',
      password: 'testing'
    }
  }

  formCheck() {
    if (this.state.email.length === 0
      || !this.state.email.trim()
      || this.state.password.length === 0
      || !this.state.password.trim()
    ) return true
    return false
  }

  submit() {
    if (this.state.mode === 'login') {
      this.props.login(this.state.email, this.state.password).then(() => {
        if (this.props.user) Actions.app()
      })
    }
    else if (this.state.mode === 'signup') {
      this.props.signup(this.state.email, this.state.password).then(() => {
        if (this.props.user) Actions.app()
      })
    }
  }

  render() {
    let buttonStyle = [styles.button]
    if (this.formCheck()) buttonStyle.push(styles.disabled)

    return (
      <ScrollView style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.error}>{this.props.error}</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
            underlineColorAndroid="#A21B35"
            value={this.state.email}
            disabled={this.props.waitingForResponse}
            onChangeText={(email) => this.setState({email})}
            onSubmitEditing={() => this.refs.password.focus()}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid="#A21B35"
            ref='password'
            value={this.state.password}
            disabled={this.props.waitingForResponse}
            onChangeText={(password) => this.setState({password})}
          />
        </View>

        <TouchableOpacity onPress={() => this.submit()} disabled={this.formCheck() || this.props.waitingForResponse}>
          <View style={buttonStyle}>
            <Text style={styles.buttonText}>
              {(this.state.mode === 'login')? 'Log In' : 'Sign Up'}
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  form: {
    marginBottom: 8
  },
  error: {

  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingLeft: 16,
    fontSize: 16,
    height: 40,
    marginBottom: 8
  },
  button: {
    backgroundColor: '#A21B35',
    padding: 8,
    borderRadius: 40
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  disabled: {
    opacity: 0.5
  }
})

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
