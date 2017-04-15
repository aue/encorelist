import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import { Actions } from 'react-native-router-flux'

import Diamond from '../components/Diamond'

export default class OnboardingContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.image}>
          <Diamond style={styles.diamond} color="#A21B35" size={175} />
          <Text style={styles.tagline}>Turn to-do lists into reality.</Text>
        </View>

        <TouchableOpacity onPress={() => Actions.form({ params: { mode: 'signup' }, title: 'Sign Up'})}>
          <View style={styles.signup}>
            <Text style={styles.signuptext}>Sign Up</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.signin}>
          <Text>Already have an account?</Text>
          <TouchableOpacity onPress={() => Actions.form({ params: { mode: 'login' }, title: 'Log In'})}>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tagline: {
    paddingTop: 16
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
