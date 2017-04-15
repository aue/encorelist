import React, { Component } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import common from '../styles/common'
import styles from '../styles'

export default class PillButton extends Component {
  constructor(props) {
    super(props)
  }

  onPress = () => {
    if (!this.props.disabled) {
      this.props.onPress()
    }
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.onPress}
        disabled={this.props.disabled}
      >
        <LinearGradient
          start={{x: 0, y: 0}} end={{x: 1, y: 1}}
          colors={[common.brandPrimary, common.brandSecondary]}
          style={[styles.buttonAlt, this.props.disabled && styles.disabled]}
        >
          <Text style={styles.buttonText}>{this.props.title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    )
  }
}
