import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import common from '../styles/common'

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
        <Text style={styles.icon}>+</Text>
        <Text style={styles.text}>Add {this.props.object}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16
  },
  icon: {
    fontSize: 20,
    fontWeight: '500',
    width: 60,
    marginRight: 16,
    textAlign: 'center',
    color: common.darkText
  },
  text: {
    fontSize: 16,
    color: common.darkText
  }
})
