import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

export default class PointRowAdd extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.row}
        onPress={() => this.props.onPress()}
      >
        <Text style={styles.text}>Add {this.props.object}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    padding: 16
  },
  text: {
    marginLeft: 75,
    fontSize: 20
  }
})
