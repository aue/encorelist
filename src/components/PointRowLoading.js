import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import common from '../styles/common'

export default class PointRowLoading extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.row}>
        <View style={styles.check}></View>
        <View style={styles.text}>
          <View style={styles.title}></View>
          <View style={styles.points}></View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  check: {
    margin: 16,
    borderRadius: 30,
    height: 60,
    width: 60,
    backgroundColor: common.lightGrey
  },
  text: {
    flex: 1,
    padding: 16,
    paddingLeft: 0
  },
  title: {
    height: 20,
    width: 200,
    backgroundColor: common.lightGrey
  },
  points: {
    marginTop: 5,
    height: 15,
    width: 50,
    backgroundColor: common.lightGrey
  }
})
