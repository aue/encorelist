import React, { Component } from 'react'
import { Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import styles from '../styles'
import common from '../styles/common'
import Diamond from './Diamond'

export default class HeaderLists extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let content
    if (this.props.empty)
      content = (
        <View style={styles.section}>
          <Text style={[styles.title]}>Add an {this.props.object} and start earning points!</Text>
        </View>
      )

    return (
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={[common.altPrimary, common.altSecondary]} style={[styles.container, styles.header]}>
        <View style={styles.section}>
          <Text style={[styles.title]}>At a glance</Text>
          <View style={styles.pointsDisplay}>
            <Text style={[styles.pointsDisplayText]}>{this.props.points || 0}</Text>
            <Diamond size={27} />
            <Text style={[styles.pointsDisplayText, styles.pointsDisplayBold]}>pts</Text>
          </View>
        </View>
        {content}
      </LinearGradient>
    )
  }
}
