import React, { Component } from 'react'
import { StyleSheet, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import common from '../styles/common'
import Diamond from './Diamond'

export default class PointCircle extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={[common.brandPrimary, common.brandSecondary]} style={styles.circle}>
        <Text style={styles.text}>{this.props.value}</Text>
        <Diamond color={common.lightText} size={16} />
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  circle: {
    borderRadius: 30,
    height: 60,
    width: 60,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  text: {
    backgroundColor: 'transparent',
    color: common.lightText,
    fontSize: 20,
    fontWeight: '700',
    marginRight: 4,
  }
})
