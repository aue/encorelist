import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, TextInput, Text, View, ScrollView } from 'react-native'

export default class OnboardingFormContainer extends Component {
  constructor(props) {
    super(props)
    const { state } = this.props.navigation
    this.state = {
      mode: state.params.mode || 'login',
      email: '',
      password: ''
    }
  }

  static navigationOptions = {
    title: ({ state }) => {
      return (state.params.mode === 'login')? 'Log In' : 'Sign Up'
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

  signup() {

  }

  login() {

  }

  render() {
    let buttonStyle = [styles.button]
    if (this.formCheck()) buttonStyle.push(styles.disabled)

    return (
      <ScrollView style={styles.container}>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            returnKeyType="next"
            underlineColorAndroid="#A21B35"
            onChangeText={(email) => this.setState({email})}
            onSubmitEditing={() => this.refs.password.focus()}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid="#A21B35"
            ref='password'
            onChangeText={(password) => this.setState({password})}
          />
        </View>

        <TouchableOpacity onPress={() => this.login()} disabled={this.formCheck()}>
          <Text style={buttonStyle}>
            { (this.state.mode === 'login')? 'Log In' : 'Sign Up' }
          </Text>
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
  input: {
    height: 40,
    marginBottom: 8
  },
  button: {
    backgroundColor: '#A21B35',
    color: '#fff',
    padding: 8,
    textAlign: 'center',
    fontWeight: 'bold',
    borderRadius: 40
  },
  disabled: {
    opacity: 0.5
  }
})
