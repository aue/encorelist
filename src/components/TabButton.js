import React, { Component } from 'react'
import { Text } from 'react-native'
import styles from '../styles'

export default class TabButton extends Component {
  render() {
    return (
      <Text style={[styles.tabButton, this.props.selected && styles.tabButtonSelected]}>{this.props.title}</Text>
    )
  }
}
