import React, { Component } from 'react'
import { Text } from 'react-native'
import common from '../styles/common'

export default class TabButton extends Component {
  render() {
    return (
      <Text style={{color: this.props.selected ? common.brandPrimary : common.mediumGrey }}>{this.props.title}</Text>
    )
  }
}
