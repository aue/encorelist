import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'

export default class OnboardingContainer extends Component {
  constructor(props) {
    super(props)
  }

  static navigationOptions = {
    title: 'Welcome to Encore List'
  }

  render() {
    const { navigate } = this.props.navigation

    return (
      <View style={styles.container}>
        <View style={styles.image}>
          <Text style={styles.tagline}>Turn to-do lists into reality.</Text>
        </View>

        <TouchableOpacity onPress={() => navigate('FormScreen', {mode: 'signup'})}>
          <View style={styles.signup}>
            <Text style={styles.signuptext}>Sign Up</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.signin}>
          <Text>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigate('FormScreen', {mode: 'login'})}>
            <Text style={styles.login}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  image: {
    flex: 1
  },
  tagline: {
    textAlign: 'center'
  },
  signup: {
    backgroundColor: '#A21B35',
    padding: 16,
    borderRadius: 40
  },
  signuptext: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff'
  },
  signin: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 8
  },
  login: {
    fontWeight: 'bold',
    color: '#A21B35',
    padding: 8
  }
})
