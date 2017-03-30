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

        <TouchableOpacity onPress={() => navigate('FormContainer', {mode: 'signup'})}>
          <Text style={styles.signup}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.signin}>
          <Text>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigate('FormContainer', {mode: 'login'})}>
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
    color: '#fff',
    padding: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    borderRadius: 40
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
