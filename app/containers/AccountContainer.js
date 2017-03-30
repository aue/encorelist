import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { NavigationActions } from 'react-navigation'

export default class RewardsContainer extends Component {
  constructor(props) {
    super(props)
  }

  static navigationOptions = {
    title: 'Account'
  }

  logout() {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Welcome' })
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }

  render() {
    return (
      <View>
        <Text>My account here Coming Soon</Text>
        <Button
          title="Logout"
          onPress={() => this.logout()}
        />
      </View>
    )
  }
}
