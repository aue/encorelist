import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'

export default class RewardsContainer extends Component {
  constructor(props) {
    super(props)
  }

  static navigationOptions = {
    title: 'Account'
  }

  navigateToListings() {
    const { navigate } = this.props.navigation
    navigate('ListsTab')
  }

  render() {
    return (
      <View>
        <Text>Welcome Screen</Text>
        <Button
          title="Done"
          onPress={this.navigateToListings.bind(this)}
        />
      </View>
    )
  }
}
