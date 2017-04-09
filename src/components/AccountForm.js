import React, { Component } from 'react'
import { Button, ScrollView, StyleSheet, Text } from 'react-native'

export default class AccountForm extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>{this.props.displayName}</Text>
        <Text>{this.props.email}</Text>
        <Text>Name</Text>
        <Text>Number of points</Text>
        <Text>Notifications</Text>
        <Button
          title="Logout"
          onPress={() => this.props.logout()}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16
  }
})
