import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { auth } from '../firebase'
import { NavigationActions } from 'react-navigation'

export default class LoadingContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    auth.onAuthStateChanged((user) => {
      let navigateAction

      if (user) {
        //navigateAction = NavigationActions.navigate({ routeName: 'Container' })

        const resetAction = NavigationActions.reset({
          index: 0,
          key: 'Init',
          actions: [
            NavigationActions.navigate({ routeName: 'Container' })
          ]
        })
        this.props.navigation.dispatch(resetAction)
      }
      else {
        navigateAction = NavigationActions.navigate({ routeName: 'Onboarding' })
      }

      //this.props.navigation.dispatch(navigateAction)
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
