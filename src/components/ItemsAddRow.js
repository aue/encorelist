import React, { Component } from 'react'
import { Dimensions, Animated, PanResponder, StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import CheckCircle from './CheckCircle'
import Diamond from './Diamond'

export default class ItemsAddRow extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <TouchableOpacity style={styles.row} onPress={() => this.props.addItem()}>
        <Text style={styles.title}>Add Item</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  check: {
    margin: 8,
    padding: 8,
    position: 'absolute',
    left: 0,
    zIndex: 1
  },
  text: {
    flex: 1,
    margin: 8,
    padding: 8,
    paddingRight: 16,
    marginLeft: 16 + 40 + 8,
    marginRight: 0
  },
  title: {
    fontSize: 20,
  },
  points: {
    paddingTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 4,
    marginTop: -2
  },
  diamond: {
  },
})
