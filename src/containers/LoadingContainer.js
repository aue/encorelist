import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { auth } from '../firebase'

export default class LoadingContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    auth.onAuthStateChanged((user) => {
      if (user) Actions.app()
      else Actions.onboarding()
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#777'
  }
})
