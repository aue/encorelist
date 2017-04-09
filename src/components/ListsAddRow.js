import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import PointCircle from './PointCircle'

export default class ListsAddRow extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.row}
        onPress={() => this.props.gotoAddList()}
      >
        <View style={styles.circle}>
          <PointCircle />
        </View>
        <View style={styles.text}>
          <Text style={styles.title}>Create list</Text>
        </View>
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
  circle: {
    margin: 8,
    padding: 8
  },
  text: {
    flex: 1,
    margin: 8,
    padding: 8,
    marginLeft: 0,
    paddingLeft: 0,
  },
  title: {
    fontSize: 20,
  },
  items: {
    paddingTop: 4,
    fontSize: 15,
    fontWeight: 'bold'
  }
})
