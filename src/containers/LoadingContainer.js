import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { auth } from '../firebase'

export default class LoadingContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    auth.onAuthStateChanged((user) => {
      let resetAction

      if (user) {
        resetAction = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Container' })
          ]
        })
      }
      else {
        resetAction = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Onboarding' })
          ]
        })
      }

      this.props.navigation.dispatch(resetAction)
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
