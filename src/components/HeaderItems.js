import React, { Component } from 'react'
import { StatusBar, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import styles from '../styles'
import common from '../styles/common'
import Diamond from './Diamond'

export default class HeaderItems extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let content
    if (this.props.empty)
      content = (
        <View style={styles.section}>
          <Text style={[styles.title, styles.lightColor]}>Add an item and start earning points!</Text>
        </View>
      )
    else
      content = (
        <View style={styles.section}>
          <Text style={[styles.title, styles.lightColor]}>Points earned</Text>
          <View style={styles.pointsDisplay}>
            <Text style={[styles.pointsDisplayText, styles.lightColor]}>{this.props.completedPoints || 0} of {this.props.totalPoints || 0}</Text>
            <Diamond size={27} color={common.lightText} />
            <Text style={[styles.pointsDisplayText, styles.pointsDisplayBold, styles.lightColor]}>pts</Text>
          </View>
        </View>
      )

    return (
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={[common.brandPrimary, common.brandSecondary]} style={[styles.container, styles.header]}>
        <StatusBar
         backgroundColor={common.brandPrimary}
         barStyle="light-content"
        />
        {content}
      </LinearGradient>
    )
  }
}
